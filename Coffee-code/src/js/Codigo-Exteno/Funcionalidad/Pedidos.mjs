// Pedidos.mjs
// ==========================================
// Gestión de pedidos
// ==========================================


// ==========================================
// Lista de pedidos
// ==========================================

export const pedidos = [];


// ==========================================
// Cargar pedidos guardados
// ==========================================

export function cargarPedidos() {

    const pedidosGuardados = localStorage.getItem("pedidos");

    if (pedidosGuardados) {

        pedidos.length = 0;

        const pedidosCargados = JSON.parse(pedidosGuardados);

        pedidosCargados.forEach((pedido) => {
            pedidos.push(pedido);
        });
    }
}


// ==========================================
// Guardar pedidos
// ==========================================

function guardarPedidos() {

    localStorage.setItem(
        "pedidos",
        JSON.stringify(pedidos)
    );
}


// ==========================================
// Buscar pedido
// ==========================================

function buscarPedido(idPedido) {

    return pedidos.find(
        (pedido) => pedido.id === Number(idPedido)
    );
}


// ==========================================
// Crear pedido
// ==========================================

export function crearPedido() {

    const nuevoId = pedidos.length > 0
        ? pedidos[pedidos.length - 1].id + 1
        : 1;

    const nuevoPedido = {
        id: nuevoId,
        items: [],
        estado: "abierto"
    };

    pedidos.push(nuevoPedido);

    guardarPedidos();

    return nuevoPedido;
}


// ==========================================
// Agregar producto
// ==========================================

export function agregarProductoAPedido(
    idPedido,
    producto,
    cantidad = 1
) {

    const pedido = buscarPedido(idPedido);

    if (!pedido) {

        console.log(
            `El pedido #${idPedido} no existe.`
        );

        return null;
    }


    const productoExistente = pedido.items.find(
        (item) => item.producto.id === producto.id
    );


    if (productoExistente) {

        productoExistente.cantidad += cantidad;

    } else {

        pedido.items.push({
            producto,
            cantidad
        });
    }


    guardarPedidos();

    return pedido;
}


// ==========================================
// Quitar producto
// ==========================================

export function quitarProductoDePedido(
    idPedido,
    idProducto
) {

    const pedido = buscarPedido(idPedido);

    if (!pedido) {

        console.log(
            `El pedido #${idPedido} no existe.`
        );

        return null;
    }


    pedido.items = pedido.items.filter(
        (item) => item.producto.id !== idProducto
    );


    guardarPedidos();

    return pedido;
}


// ==========================================
// Calcular subtotal
// ==========================================

export function calcularSubtotal(idPedido) {

    const pedido = buscarPedido(idPedido);

    if (!pedido) {
        return 0;
    }


    return pedido.items.reduce(
        (total, item) => {

            return total +
                (item.producto.price * item.cantidad);

        },
        0
    );
}


// ==========================================
// Calcular desglose
// ==========================================

export function calcularDesglose(idPedido) {

    const subtotal = calcularSubtotal(idPedido);

    const iva = subtotal * 0.16;

    const total = subtotal + iva;


    return {
        subtotal,
        iva,
        total
    };
}


// ==========================================
// Calcular total
// ==========================================

export function calcularTotal(idPedido) {

    const desglose = calcularDesglose(idPedido);

    return desglose.total;
}


// ==========================================
// Cerrar pedido
// ==========================================

export function cerrarPedido(
    idPedido,
    nuevoEstado
) {

    const pedido = buscarPedido(idPedido);

    if (!pedido) {

        console.log(
            `El pedido #${idPedido} no existe.`
        );

        return null;
    }


    pedido.estado = nuevoEstado;

    guardarPedidos();

    return pedido;
}


// ==========================================
// Mostrar pedidos
// ==========================================

export function listarPedidos() {

    return pedidos;
}


// ==========================================
// Eliminar pedido
// ==========================================

export function eliminarPedido(idPedido) {

    const indice = pedidos.findIndex(
        (pedido) => pedido.id === Number(idPedido)
    );


    if (indice === -1) {

        console.log(
            `El pedido #${idPedido} no existe.`
        );

        return null;
    }


    const eliminado = pedidos.splice(indice, 1)[0];

    guardarPedidos();

    return eliminado;
}