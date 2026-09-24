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
// Cerrar pedido
// ==========================================

export function cerrarPedido(idPedido) {

    const pedido = buscarPedido(idPedido);

    if (!pedido) {

        console.log(
            `El pedido #${idPedido} no existe.`
        );

        return null;
    }


    pedido.estado = "pagado";

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