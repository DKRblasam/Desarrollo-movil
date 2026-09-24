// Index.mjs
// ===================================================
//   Punto de entrada: determina qué módulo ejecutar
// ===================================================
// Cada pantalla (cliente.html, cocina.html, caja.html) declara
// data-page="..." en su <body>. Este archivo lee ese valor y
// carga solo el módulo de interfaz que corresponde.

async function iniciar() {
  const pagina = document.body?.dataset.page;

  if (!pagina) return;

  switch (pagina) {
    case "cliente": {
      const { inicializarCliente } =
        await import("./Codigo-Exteno/Funcionalidad/Cliente.mjs");
      inicializarCliente();
      break;
    }
    case "cocina": {
      const { inicializarCocina } = await import("./Concina.mjs");
      inicializarCocina();
      break;
    }
    case "caja": {
      const { inicializarCaja } =
        await import("./Codigo-Exteno/Ashley/Caja.mjs");
      inicializarCaja();
      break;
    }
    default:
      console.log("Index.mjs: no se reconoce la página actual (data-page).");
  }
}

iniciar();
