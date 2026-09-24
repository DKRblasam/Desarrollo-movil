// Pedidos.mjs
// ===================================================
//           Gestión de datos de pedidos - Lógica
// ===================================================

const CLAVE_STORAGE = "cafe_pedidos";
const CLAVE_CONTADOR = "cafe_pedidos_contador";

export const pedidos = [];

let siguienteId = Number(localStorage.getItem(CLAVE_CONTADOR)) || 1;


// =============== Clase Pedido ===============

export class Pedido {

    constructor(
        id,
        items = [],       // [{ producto, cantidad }]
        estado = "abierto", // "abierto" | "pagado"
        fecha = new Date().toISOString(),
    ) {
        this.id = id;
        this.items = items;
        this.estado = estado;
        this.fecha = fecha;
    }
}


// =============== Persistencia (localStorage) ===============

export function guardarPedidos() {
    try {
        localStorage.setItem(CLAVE_STORAGE, JSON.stringify(pedidos));
        localStorage.setItem(CLAVE_CONTADOR, String(siguienteId));
    } catch (error) {
        console.log("No se pudieron guardar los pedidos:", error.message);
    }
}

export function cargarPedidos() {
    try {
        const datos = localStorage.getItem(CLAVE_STORAGE);
        if (!datos) return;

        const guardado = JSON.parse(datos);
        pedidos.length = 0;
        pedidos.push(...guardado);
    } catch (error) {
        console.log("No se pudieron cargar los pedidos guardados:", error.message);
    }
}


// =============== Crear pedido ===============

export function crearPedido() {
    const nuevoPedido = new Pedido(siguienteId++);
    pedidos.push(nuevoPedido);
    guardarPedidos();
    return nuevoPedido;
}


// =============== Buscar pedido ===============

export function buscarPedido(id) {
    return pedidos.find((pedido) => pedido.id === Number(id)) || null;
}


// =============== Agregar / quitar productos ===============

export function agregarProductoAPedido(idPedido, producto, cantidad = 1) {
    const pedido = buscarPedido(idPedido);

    if (!pedido) {
        console.log(`El pedido #${idPedido} no existe.`);
        return null;
    }

    const itemExistente = pedido.items.find(
        (item) => item.producto.id === producto.id
    );

    if (itemExistente) {
        itemExistente.cantidad += cantidad;
    } else {
        pedido.items.push({ producto, cantidad });
    }

    guardarPedidos();
    return pedido;
}

export function quitarProductoDePedido(idPedido, idProducto) {
    const pedido = buscarPedido(idPedido);

    if (!pedido) {
        console.log(`El pedido #${idPedido} no existe.`);
        return null;
    }

    pedido.items = pedido.items.filter(
        (item) => item.producto.id !== idProducto
    );

    guardarPedidos();
    return pedido;
}


// =============== Calcular total ===============

export function calcularTotal(idPedido) {
    const pedido = buscarPedido(idPedido);
    if (!pedido) return 0;

    return pedido.items.reduce(
        (total, item) => total + item.producto.price * item.cantidad,
        0
    );
}


// =============== Cerrar (cobrar) pedido ===============

export function cerrarPedido(idPedido) {
    const pedido = buscarPedido(idPedido);

    if (!pedido) {
        console.log(`El pedido #${idPedido} no existe.`);
        return null;
    }

    pedido.estado = "pagado";
    pedido.total = calcularTotal(idPedido);
    guardarPedidos();
    return pedido;
}


// =============== Listar / eliminar ===============

export function listarPedidos() {
    return pedidos;
}

export function eliminarPedido(idPedido) {
    const indice = pedidos.findIndex((pedido) => pedido.id === Number(idPedido));

    if (indice === -1) {
        console.log(`El pedido #${idPedido} no existe.`);
        return null;
    }

    const eliminado = pedidos.splice(indice, 1)[0];
    guardarPedidos();
    return eliminado;
}
