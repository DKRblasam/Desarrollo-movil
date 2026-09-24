// Pedidos.mjs
// ===================================================
//           Gestión de datos de pedidos - Lógica
// ===================================================

const CLAVE_STORAGE = "cafe_pedidos";
const CLAVE_CONTADOR = "cafe_pedidos_contador";

import { buscarProductoPorId, guardarProductos } from "../../Productos.mjs";

export const pedidos = [];

let siguienteId = Number(localStorage.getItem(CLAVE_CONTADOR)) || 1;

// =============== Clase Pedido ===============

export class Pedido {
  constructor(
    id,
    items = [], // [{ producto, cantidad }]
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
    pedidos.length = 0;
    if (!datos) return;

    const guardado = JSON.parse(datos);
    if (Array.isArray(guardado)) pedidos.push(...guardado);
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

  if (!pedido || pedido.estado !== "abierto") {
    console.log(`El pedido #${idPedido} no existe.`);
    return null;
  }

  if (!producto || !Number.isInteger(cantidad) || cantidad <= 0) {
    console.log("El producto o la cantidad no son válidos.");
    return null;
  }

  const itemExistente = pedido.items.find(
    (item) => item.producto.id === producto.id,
  );

  const cantidadSolicitada = (itemExistente?.cantidad || 0) + cantidad;
  if (cantidadSolicitada > Number(producto.stock)) {
    console.log(`No hay stock suficiente de "${producto.name}".`);
    return null;
  }

  if (itemExistente) {
    itemExistente.cantidad = cantidadSolicitada;
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

  pedido.items = pedido.items.filter((item) => item.producto.id !== idProducto);

  guardarPedidos();
  return pedido;
}

// =============== Calcular desglose ===============

export function calcularDesglose(idPedido, tasaIVA = 0.16) {
  const pedido = buscarPedido(idPedido);
  if (!pedido || !pedido.items) {
    return { subtotal: 0, iva: 0, total: 0 };
  }

  const subtotal = pedido.items.reduce(
    (acumulador, { producto: { price }, cantidad }) =>
      acumulador + price * cantidad,
    0,
  );
  const iva = subtotal * tasaIVA;
  const total = subtotal + iva;

  return {
    subtotal: Number(subtotal.toFixed(2)),
    iva: Number(iva.toFixed(2)),
    total: Number(total.toFixed(2)),
  };
}

export function calcularTotal(idPedido) {
  return calcularDesglose(idPedido).total;
}

// =============== Cerrar (cobrar) pedido ===============

export function cerrarPedido(idPedido) {
  const pedido = buscarPedido(idPedido);

  if (!pedido) {
    console.log(`El pedido #${idPedido} no existe.`);
    return null;
  }

  if (pedido.estado !== "abierto") return pedido;

  for (const { producto, cantidad } of pedido.items) {
    const productoActual = buscarProductoPorId(producto.id);
    if (!productoActual || productoActual.stock < cantidad) {
      console.log(
        `No hay stock suficiente para cobrar el pedido #${idPedido}.`,
      );
      return null;
    }
  }

  for (const { producto, cantidad } of pedido.items) {
    const productoActual = buscarProductoPorId(producto.id);
    productoActual.stock -= cantidad;
  }

  pedido.estado = "pagado";
  pedido.total = calcularTotal(idPedido);
  guardarProductos();
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
