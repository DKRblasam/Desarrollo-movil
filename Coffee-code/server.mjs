import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const INITIAL_PORT = Number(process.env.PORT) || 8000;
const HOST = process.env.HOST || "localhost";

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

function getFilePath(requestUrl) {
  const pathname = decodeURIComponent(
    new URL(requestUrl, `http://${HOST}`).pathname,
  );
  const requestedPath = pathname === "/" ? "/index.html" : pathname;
  const filePath = path.resolve(ROOT, `.${requestedPath}`);

  if (filePath !== ROOT && !filePath.startsWith(`${ROOT}${path.sep}`)) {
    return null;
  }

  return filePath;
}

async function serve(request, response) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end("Method Not Allowed");
    return;
  }

  let filePath;
  try {
    filePath = getFilePath(request.url);
  } catch {
    response.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Bad Request");
    return;
  }

  if (!filePath) {
    response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Forbidden");
    return;
  }

  try {
    const fileInfo = await stat(filePath);
    if (!fileInfo.isFile()) throw new Error("Not a file");

    const contentType =
      MIME_TYPES[path.extname(filePath).toLowerCase()] ||
      "application/octet-stream";
    response.writeHead(200, {
      "Content-Type": contentType,
      "Content-Length": fileInfo.size,
      "Cache-Control": "no-cache",
    });

    if (request.method === "HEAD") {
      response.end();
      return;
    }

    response.end(await readFile(filePath));
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not Found");
  }
}

const server = createServer((request, response) => {
  serve(request, response).catch(() => {
    if (!response.headersSent) response.writeHead(500);
    response.end("Internal Server Error");
  });
});

function iniciarServidor(port) {
  const manejarEscucha = () => {
    console.log(`Servidor activo en http://${HOST}:${port}/`);
    console.log("Presiona Ctrl+C para detenerlo.");
  };

  const manejarError = (error) => {
    if (error.code === "EADDRINUSE" && !process.env.PORT) {
      server.off("listening", manejarEscucha);
      server.off("error", manejarError);
      console.warn(`El puerto ${port} está ocupado. Probando ${port + 1}...`);
      iniciarServidor(port + 1);
      return;
    }

    if (error.code === "EADDRINUSE") {
      console.error(
        `El puerto ${port} está ocupado. Cierra el proceso que lo usa o ejecuta con otro puerto, por ejemplo:`,
      );
      console.error("PORT=8080 pnpm start");
    } else {
      console.error("No se pudo iniciar el servidor:", error.message);
    }
    process.exitCode = 1;
  };

  server.once("listening", manejarEscucha);
  server.once("error", manejarError);
  server.listen(port, HOST);
}

iniciarServidor(INITIAL_PORT);

function shutdown() {
  server.close(() => process.exit(0));
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
