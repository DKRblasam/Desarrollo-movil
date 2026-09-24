import {
  existencias,
  cargarProductos,
  sembrarCatalogoInicial,
} from "./Productos.mjs";
import {
  pedidos,
  cargarPedidos,
  crearPedido,
  agregarProductoAPedido,
} from "./Codigo-Exteno/Funcionalidad/Pedidos.mjs";

function obtenerNombreProducto(boton) {
  const productoItem = boton.closest(".producto-item");
  const titulo =
    productoItem?.querySelector("h3") ||
    document.querySelector(".encabezado h1");
  return titulo?.textContent.trim() || "";
}

function agregarAlPedido(boton) {
  const nombreBuscado = obtenerNombreProducto(boton).toLocaleLowerCase();
  const producto = existencias
    .flatMap((categoria) => categoria.prods)
    .find((item) => item.name.toLocaleLowerCase() === nombreBuscado);

  if (!producto) return;

  let pedido = pedidos.find((item) => item.estado === "abierto");
  if (!pedido) pedido = crearPedido();

  agregarProductoAPedido(pedido.id, producto, 1);
  window.location.href = "../../pages/pedidos/cliente.html";
}

function inicializarCompra() {
  cargarProductos();
  sembrarCatalogoInicial();
  cargarPedidos();

  document.querySelectorAll(".btn-comprar").forEach((boton) => {
    boton.addEventListener("click", () => agregarAlPedido(boton));
  });
}

inicializarCompra();
