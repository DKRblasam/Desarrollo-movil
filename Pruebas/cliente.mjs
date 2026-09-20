// cliente.mjs

              // ===================================================
              //   Módulo de INTERFAZ: acciones del Cliente (DOM)
              // ===================================================

import { existencias, buscarProductoPorId } from "./productos.mjs";
import {
  crearPedido,
  agregarProductoPedido,
  quitarProductoPedido,
  guardarPedido,
  pedidos,
} from "./pedidos.mjs";

// El pedido que el cliente está armando en este momento
let pedidoActual = crearPedido();

// Se llama una sola vez, al cargar la página
export function initCliente() {
  document
    .getElementById("cliente-guardar")
    .addEventListener("click", handleGuardarPedido);
}

// Se llama cada vez que se muestra la pestaña del Cliente
export function renderCliente() {
  renderMenu();
  renderPedidoActual();
  renderListaPedidos();
}

// =============== Menú de productos ===============

function renderMenu() {
  const contenedor = document.getElementById("cliente-menu");
  contenedor.innerHTML = "";

  for (const categoria of existencias) {
    const bloque = document.createElement("div");
    bloque.className = "categoria-bloque";

    const titulo = document.createElement("h3");
    titulo.textContent = categoria.category;
    bloque.appendChild(titulo);

    if (categoria.prods.length === 0) {
      const vacio = document.createElement("p");
      vacio.className = "vacio";
      vacio.textContent = "Sin productos disponibles todavía.";
      bloque.appendChild(vacio);
    }

    for (const producto of categoria.prods) {
      bloque.appendChild(crearTarjetaProducto(producto));
    }

    contenedor.appendChild(bloque);
  }

  contenedor.querySelectorAll(".btn-agregar").forEach((btn) => {
    btn.addEventListener("click", handleAgregarAlPedido);
  });
}

function crearTarjetaProducto(producto) {
  const tarjeta = document.createElement("div");
  tarjeta.className = "producto-card";

  tarjeta.innerHTML = `
    <div class="producto-info">
      <span class="producto-nombre">${producto.name}</span>
      <span class="producto-precio">$${producto.price.toFixed(2)} · ${producto.tipo}</span>
    </div>
    <div class="producto-accion">
      <input type="number" min="1" value="1" class="cantidad-input" />
      <button class="btn-agregar" data-id="${producto.id}">Agregar</button>
    </div>
  `;

  return tarjeta;
}

function handleAgregarAlPedido(evento) {
  const id = Number(evento.target.dataset.id);
  const tarjeta = evento.target.closest(".producto-card");
  const cantidad = Number(tarjeta.querySelector(".cantidad-input").value) || 1;

  const producto = buscarProductoPorId(id);
  if (!producto) return;

  agregarProductoPedido(pedidoActual, producto, cantidad);
  renderPedidoActual();
}

// =============== Pedido en curso del cliente ===============

function renderPedidoActual() {
  const contenedor = document.getElementById("cliente-pedido-actual");
  contenedor.innerHTML = "";

  if (pedidoActual.items.length === 0) {
    contenedor.innerHTML = `<p class="vacio">Aún no has agregado productos.</p>`;
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
        renderPedidoActual();
      });
    });
  }

  document.getElementById("cliente-total").textContent =
    `Total: $${pedidoActual.total.toFixed(2)}`;
}

function handleGuardarPedido() {
  if (pedidoActual.items.length === 0) {
    alert("Agrega al menos un producto antes de guardar tu pedido.");
    return;
  }

  guardarPedido(pedidoActual);
  pedidoActual = crearPedido();

  renderPedidoActual();
  renderListaPedidos();
}

// =============== Historial de pedidos del cliente ===============

function renderListaPedidos() {
  const contenedor = document.getElementById("cliente-lista-pedidos");
  contenedor.innerHTML = "";

  if (pedidos.length === 0) {
    contenedor.innerHTML = `<p class="vacio">Todavía no has realizado pedidos.</p>`;
    return;
  }

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
