// Caja.mjs
// ===================================================
//   Caja: interfaz para revisar y cobrar pedidos
// ===================================================

import {
  cargarPedidos,
  listarPedidos,
  cerrarPedido,
} from "../Funcionalidad/Pedidos.mjs";

const IVA = 0.16;

function calcularSubtotal(pedido) {
  return pedido.items.reduce((subtotal, item) => {
    const { producto, cantidad } = item;
    return subtotal + producto.price * cantidad;
  }, 0);
}

function renderizarPedidos() {
  const contenedor = document.getElementById("listaPedidosCaja");
  const totalGeneralEl = document.getElementById("totalGeneralCaja");

  if (!contenedor || !totalGeneralEl) return;

  contenedor.innerHTML = "";

  const pedidos = listarPedidos();
  let totalGeneral = 0;

  if (pedidos.length === 0) {
    contenedor.innerHTML = "<p>No hay pedidos registrados todavía.</p>";
    totalGeneralEl.textContent = "Total acumulado: $0 MXN";
    return;
  }

  pedidos.forEach((pedido) => {
    const subtotal = calcularSubtotal(pedido);
    const iva = subtotal * IVA;
    const total = subtotal + iva;
    totalGeneral += total;

    const bloque = document.createElement("div");
    bloque.className = "pedido-caja";

    const items = pedido.items
      .map((item) => {
        const { producto, cantidad } = item;
        return `${producto.name} x${cantidad}`;
      })
      .join(", ");

    bloque.innerHTML = `
            <p><strong>Pedido #${pedido.id}</strong></p>
            <p>Productos: ${items || "Sin productos"}</p>
            <p>Subtotal: $${subtotal.toFixed(2)} MXN</p>
            <p>IVA: $${iva.toFixed(2)} MXN</p>
            <p>Total: $${total.toFixed(2)} MXN</p>
            <p>Estado: ${pedido.estado}</p>
            ${
              pedido.estado === "abierto"
                ? `<button type="button" data-accion="cobrar" data-id="${pedido.id}">Marcar como pagado</button>`
                : ""
            }
        `;

    contenedor.appendChild(bloque);
  });

  totalGeneralEl.textContent = `Total acumulado: $${totalGeneral.toFixed(2)} MXN`;
}

function manejarClicPedidos(evento) {
  const boton = evento.target.closest("button[data-accion='cobrar']");
  if (!boton) return;

  cerrarPedido(Number(boton.dataset.id));
  renderizarPedidos();
}

// Punto de entrada para la pantalla caja.html
export function inicializarCaja() {
  cargarPedidos();
  renderizarPedidos();

  const contenedor = document.getElementById("listaPedidosCaja");
  if (contenedor) contenedor.addEventListener("click", manejarClicPedidos);
}

export const iniciarCaja = inicializarCaja;
