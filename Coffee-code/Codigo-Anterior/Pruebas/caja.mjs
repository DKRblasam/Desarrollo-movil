// caja.mjs

              // ===================================================
              //   Módulo de INTERFAZ: acciones de Caja (DOM)
              // ===================================================

import { existencias, buscarProductoPorId } from "./productos.mjs";
import {
  crearPedido,
  agregarProductoPedido,
  quitarProductoPedido,
  guardarPedido,
  pedidos,
  totalAcumulado,
} from "./pedidos.mjs";

// Pedido que Caja está recibiendo/armando en este momento
let pedidoActual = crearPedido();

// Se llama una sola vez, al cargar la página
export function initCaja() {
  document
    .getElementById("caja-agregar-btn")
    .addEventListener("click", handleAgregarProducto);

  document
    .getElementById("caja-guardar-btn")
    .addEventListener("click", handleGuardarPedido);
}

// Se llama cada vez que se muestra la pestaña de Caja
export function renderCaja() {
  poblarSelectorProductos();
  renderPedidoActivo();
  renderHistorial();
}

// =============== Selector de productos ===============

function poblarSelectorProductos() {
  const selector = document.getElementById("caja-selector-producto");
  selector.innerHTML = "";

  for (const categoria of existencias) {
    for (const producto of categoria.prods) {
      const opcion = document.createElement("option");
      opcion.value = producto.id;
      opcion.textContent = `${producto.name} — $${producto.price.toFixed(2)} (${categoria.category})`;
      selector.appendChild(opcion);
    }
  }
}

function handleAgregarProducto() {
  const selector = document.getElementById("caja-selector-producto");
  const cantidadInput = document.getElementById("caja-cantidad");

  const id = Number(selector.value);
  const cantidad = Number(cantidadInput.value) || 1;
  const producto = buscarProductoPorId(id);

  if (!producto) {
    alert("Selecciona un producto válido.");
    return;
  }

  if (cantidad > producto.stock) {
    alert(`Solo hay ${producto.stock} unidades de "${producto.name}" disponibles.`);
    return;
  }

  agregarProductoPedido(pedidoActual, producto, cantidad);
  renderPedidoActivo();
}

// =============== Pedido que se está recibiendo ===============

function renderPedidoActivo() {
  const contenedor = document.getElementById("caja-pedido-activo");
  contenedor.innerHTML = "";

  if (pedidoActual.items.length === 0) {
    contenedor.innerHTML = `<p class="vacio">El pedido está vacío.</p>`;
  } else {
    const lista = document.createElement("ul");
    lista.className = "lista-items";

    for (const item of pedidoActual.items) {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${item.cantidad} x ${item.producto.name} — $${item.subtotal.toFixed(2)}</span>
        <button class="btn-quitar" data-id="${item.producto.id}">✕</button>
      `;
      lista.appendChild(li);
    }

    contenedor.appendChild(lista);

    contenedor.querySelectorAll(".btn-quitar").forEach((btn) => {
      btn.addEventListener("click", (evento) => {
        quitarProductoPedido(pedidoActual, Number(evento.target.dataset.id));
        renderPedidoActivo();
      });
    });
  }

  document.getElementById("caja-total-actual").textContent =
    `Total del pedido: $${pedidoActual.total.toFixed(2)}`;
}

function handleGuardarPedido() {
  if (pedidoActual.items.length === 0) {
    alert("No hay productos en el pedido.");
    return;
  }

  guardarPedido(pedidoActual);
  pedidoActual = crearPedido();

  renderPedidoActivo();
  renderHistorial();
}

// =============== Historial y total acumulado ===============

function renderHistorial() {
  const contenedor = document.getElementById("caja-historial");
  contenedor.innerHTML = "";

  if (pedidos.length === 0) {
    contenedor.innerHTML = `<p class="vacio">Aún no se han guardado pedidos.</p>`;
  } else {
    for (const pedido of pedidos) {
      const tarjeta = document.createElement("div");
      tarjeta.className = "pedido-card";

      const detalle = pedido.items
        .map((item) => `${item.cantidad} x ${item.producto.name}`)
        .join(", ");

      tarjeta.innerHTML = `
        <strong>Pedido #${pedido.id}</strong>
        <p>${detalle}</p>
        <span>Total: $${pedido.total.toFixed(2)}</span>
      `;

      contenedor.appendChild(tarjeta);
    }
  }

  document.getElementById("caja-total-acumulado").textContent =
    `Total acumulado: $${totalAcumulado().toFixed(2)}`;
}
