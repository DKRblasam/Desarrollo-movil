// Cliente.mjs
// ===================================================
//   Cliente: interfaz para consultar productos y pedidos
// ===================================================

import {
  existencias,
  cargarProductos,
  sembrarCatalogoInicial,
} from "../../Productos.mjs";
import {
  pedidos,
  cargarPedidos,
  crearPedido,
  agregarProductoAPedido,
  calcularTotal,
  cerrarPedido,
} from "./Pedidos.mjs";

let pedidoActual = null;

// =============== Mostrar el catálogo disponible ===============

function renderizarCatalogo() {
  const contenedor = document.getElementById("catalogoCliente");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  for (const categoria of existencias) {
    if (categoria.prods.length === 0) continue;

    const bloque = document.createElement("div");
    bloque.className = "bloque-categoria";
    bloque.innerHTML = `<h3>${categoria.category}</h3>`;

    for (const producto of categoria.prods) {
      const item = document.createElement("div");
      item.className = "producto-item producto-cliente";

      item.innerHTML = `
                <h4>${producto.name}</h4>
                <p class="precio">$${producto.price} MXN</p>
                <button type="button" class="btn-comprar" data-id="${producto.id}">
                    Agregar al pedido
                </button>
            `;

      bloque.appendChild(item);
    }

    contenedor.appendChild(bloque);
  }
}

// =============== Mostrar el pedido en construcción ===============

function renderizarPedidoActual() {
  const lista = document.getElementById("listaPedidoCliente");
  const totalEl = document.getElementById("totalPedidoCliente");

  if (!lista || !totalEl) return;

  lista.innerHTML = "";

  if (!pedidoActual || pedidoActual.items.length === 0) {
    lista.innerHTML = "<p>Aún no has agregado productos.</p>";
    totalEl.textContent = "Total: $0 MXN";
    return;
  }

  for (const item of pedidoActual.items) {
    const fila = document.createElement("p");
    fila.textContent = `${item.producto.name} x${item.cantidad} - $${item.producto.price * item.cantidad} MXN`;
    lista.appendChild(fila);
  }

  totalEl.textContent = `Total: $${calcularTotal(pedidoActual.id)} MXN`;
}

// =============== Eventos ===============

function manejarClicCatalogo(evento) {
  const boton = evento.target.closest("button[data-id]");
  if (!boton) return;

  const idProducto = Number(boton.dataset.id);
  const producto = existencias
    .flatMap((cat) => cat.prods)
    .find((prod) => prod.id === idProducto);

  if (!producto) return;

  if (!pedidoActual) {
    pedidoActual = crearPedido();
  }

  agregarProductoAPedido(pedidoActual.id, producto, 1);
  renderizarPedidoActual();
}

function manejarConfirmarPedido() {
  if (!pedidoActual || pedidoActual.items.length === 0) {
    alert("Agrega al menos un producto antes de confirmar.");
    return;
  }

  const total = calcularTotal(pedidoActual.id);
  const idPedido = pedidoActual.id;

  cerrarPedido(idPedido);
  alert(`Pedido #${idPedido} enviado a caja. Total: $${total} MXN`);

  pedidoActual = null;
  renderizarPedidoActual();
}

// Punto de entrada para la pantalla cliente.html
export function inicializarCliente() {
  cargarProductos();
  sembrarCatalogoInicial();
  cargarPedidos();
  pedidoActual = pedidos.find((pedido) => pedido.estado === "abierto") || null;
  renderizarCatalogo();
  renderizarPedidoActual();

  const catalogo = document.getElementById("catalogoCliente");
  const botonConfirmar = document.getElementById("btnConfirmarPedido");

  if (catalogo) catalogo.addEventListener("click", manejarClicCatalogo);
  if (botonConfirmar)
    botonConfirmar.addEventListener("click", manejarConfirmarPedido);
}
