// Caja.mjs
// ==========================================
// Caja: revisar y cobrar pedidos
// ==========================================

import {
    cargarPedidos,
    listarPedidos,
    cerrarPedido
} from "../Funcionalidad/Pedidos.mjs";


// Calcula el subtotal de un pedido
function calcularSubtotal(pedido) {

    const subtotal = pedido.items.reduce((total, item) => {

        const { producto, cantidad } = item;

        return total + (producto.price * cantidad);

    }, 0);

    return subtotal;
}


// Muestra los pedidos en la pantalla
function mostrarPedidos() {

    const lista = document.getElementById("listaPedidosCaja");
    const totalGeneral = document.getElementById("totalGeneralCaja");

    if (!lista || !totalGeneral) return;

    lista.innerHTML = "";

    const pedidos = listarPedidos();

    if (pedidos.length === 0) {

        lista.innerHTML = "<p>No hay pedidos registrados todavía.</p>";
        totalGeneral.textContent = "Total acumulado: $0 MXN";

        return;
    }

    let totalAcumulado = 0;

    pedidos.forEach((pedido) => {

        // Calculamos el subtotal
        const subtotal = calcularSubtotal(pedido);

        // Calculamos el IVA
        const iva = subtotal * 0.16;

        // Calculamos el total
        const total = subtotal + iva;

        totalAcumulado += total;


        // Obtenemos los productos del pedido
        const productos = pedido.items.map((item) => {

            const { producto, cantidad } = item;

            return `${producto.name} x${cantidad}`;

        }).join(", ");


        // Creamos la información del pedido
        const pedidoDiv = document.createElement("div");

        pedidoDiv.className = "pedido-caja";

        pedidoDiv.innerHTML = `
            <p><strong>Pedido #${pedido.id}</strong></p>

            <p>Productos: ${productos}</p>

            <p>Subtotal: $${subtotal.toFixed(2)} MXN</p>

            <p>IVA: $${iva.toFixed(2)} MXN</p>

            <p>Total: $${total.toFixed(2)} MXN</p>

            <p>Estado: ${pedido.estado}</p>

            ${
                pedido.estado === "abierto"
                ? `
                    <button
                        type="button"
                        data-accion="listo"
                        data-id="${pedido.id}">
                        Pedido listo
                    </button>

                    <button
                        type="button"
                        data-accion="cancelar"
                        data-id="${pedido.id}">
                        Cancelar pedido
                    </button>
                  `
                : ""
            }
        `;

        lista.appendChild(pedidoDiv);
    });


    totalGeneral.textContent =
        `Total acumulado: $${totalAcumulado.toFixed(2)} MXN`;
}


// Detecta cuando se presiona un botón
function actualizarPedido(evento, notificarCliente) {

    const boton = evento.target.closest("button");

    if (!boton) return;

    const id = Number(boton.dataset.id);
    const accion = boton.dataset.accion;

    let nuevoEstado;


    // Cambiamos el estado dependiendo del botón
    if (accion === "listo") {

        nuevoEstado = "listo";

    } else if (accion === "cancelar") {

        nuevoEstado = "cancelado";

    } else {

        return;
    }


    // Cerramos el pedido
    cerrarPedido(id);


    // Notificamos al Cliente usando el callback
    if (notificarCliente) {
        notificarCliente(id, nuevoEstado);
    }


    // Actualizamos la pantalla
    mostrarPedidos();
}


// Inicia la pantalla de Caja
export function iniciarCaja(notificarCliente) {

    cargarPedidos();

    mostrarPedidos();

    const lista = document.getElementById("listaPedidosCaja");

    if (lista) {

        lista.addEventListener("click", function(evento) {

            actualizarPedido(evento, notificarCliente);

        });

    }
}



iniciarCaja(function(id, estado) {

    console.log(
        `El pedido #${id} ahora está ${estado}`
    );

});


notificarCliente(id, "listo");

notificarCliente(id, "cancelado");
