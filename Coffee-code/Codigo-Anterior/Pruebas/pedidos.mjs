// pedidos.mjs

                    // ===================================================
                    //   Módulo de DATOS/LÓGICA: gestión de pedidos
                    //   (no toca el DOM; cliente.mjs y caja.mjs lo usan)
                    // ===================================================

// Todos los pedidos ya guardados (historial de la tienda)
export const pedidos = [];

let contadorPedidoId = 1;

// Clase Pedido
export class Pedido {
  constructor() {
    this.id = null; // se asigna al guardarlo
    this.items = []; // { producto, cantidad, subtotal }
    this.total = 0;
    this.fecha = null;
    this.estado = "en curso"; // "en curso" | "guardado"
  }
}

              // ===================================================
              //         Funciones de gestión de pedidos
              // ===================================================

// Crear un pedido nuevo, vacío, listo para recibir productos
export function crearPedido() {
  return new Pedido();
}

// Agregar un producto (con cantidad) a un pedido en curso
export function agregarProductoPedido(pedido, producto, cantidad = 1) {
  if (!pedido || !producto) {
    console.log("Pedido o producto no válido.");
    return null;
  }

  if (cantidad <= 0) {
    console.log("La cantidad debe ser mayor a 0.");
    return null;
  }

  const itemExistente = pedido.items.find(
    (item) => item.producto.id === producto.id
  );

  if (itemExistente) {
    itemExistente.cantidad += cantidad;
    itemExistente.subtotal = itemExistente.cantidad * producto.price;
  } else {
    pedido.items.push({
      producto,
      cantidad,
      subtotal: cantidad * producto.price,
    });
  }

  calcularTotal(pedido);
  return pedido;
}

// Quitar un producto de un pedido en curso
export function quitarProductoPedido(pedido, productoId) {
  const indice = pedido.items.findIndex(
    (item) => item.producto.id === productoId
  );

  if (indice === -1) return null;

  const eliminado = pedido.items.splice(indice, 1)[0];
  calcularTotal(pedido);

  return eliminado;
}

// Calcular (y actualizar) el total acumulado de un pedido
export function calcularTotal(pedido) {
  pedido.total = pedido.items.reduce((acum, item) => acum + item.subtotal, 0);
  return pedido.total;
}

// Guardar un pedido ya armado en el historial de la tienda
export function guardarPedido(pedido) {
  if (!pedido || pedido.items.length === 0) {
    console.log("No se puede guardar un pedido vacío.");
    return null;
  }

  pedido.id = contadorPedidoId++;
  pedido.estado = "guardado";
  pedido.fecha = new Date();

  pedidos.push(pedido);
  return pedido;
}

// Mostrar todos los pedidos guardados (uso en consola/pruebas)
export function listarPedidos() {
  for (const pedido of pedidos) {
    console.log(`\nPedido #${pedido.id} — Total: $${pedido.total}`);
    for (const item of pedido.items) {
      console.log(`  ${item.cantidad} x ${item.producto.name} = $${item.subtotal}`);
    }
  }

  return pedidos;
}

// Total acumulado de TODOS los pedidos guardados (para Caja)
export function totalAcumulado() {
  return pedidos.reduce((acum, pedido) => acum + pedido.total, 0);
}
