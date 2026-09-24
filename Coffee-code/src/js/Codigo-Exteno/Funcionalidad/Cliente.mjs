// Cliente.mjs
// ===================================================
//   Cliente: interfaz para consultar productos y pedidos
// ===================================================

import {
  existencias,
  obtenerProductos,
  cargarProductos,
  sembrarCatalogoInicial,
} from "../../Productos.mjs";
import {
  pedidos,
  cargarPedidos,
  crearPedido,
  agregarProductoAPedido,
  calcularTotal,
} from "./Pedidos.mjs";

let pedidoActual = null;

export function obtenerProductosDisponibles() {
  return obtenerProductos().filter((producto) => producto.stock > 0);
}

export function obtenerMenuDinamico() {
  return obtenerProductosDisponibles().map((producto) => ({
    id: producto.id,
    nombre: producto.name.toUpperCase(),
    categoria: producto.category,
    tipo: producto.tipo,
    precioFormateado: `$${producto.price.toFixed(2)} MXN`,
    precioOriginal: producto.price,
    stock: producto.stock,
    disponibilidadTag: producto.stock <= 5 ? "¡Últimas piezas!" : "Disponible",
  }));
}

export function obtenerPromociones() {
  return obtenerProductosDisponibles()
    .filter(
      (producto) =>
        producto.category === "Bebidas" || producto.tipo === "Dulce",
    )
    .map((producto) => {
      const precioPromocion = producto.price * 0.85;
      return {
        id: producto.id,
        nombre: producto.name,
        precioOriginal: producto.price,
        precioPromocion: Number(precioPromocion.toFixed(2)),
        ahorro: Number((producto.price - precioPromocion).toFixed(2)),
        mensajePromo: "¡15% de descuento en Bebidas y Dulces!",
      };
    });
}

// =============== Mostrar el catálogo disponible ===============

function renderizarCatalogo() {
  const contenedor = document.getElementById("catalogoCliente");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  const menu = obtenerMenuDinamico();

  existencias.forEach((categoria) => {
    const productosCategoria = menu.filter(
      (producto) => producto.categoria === categoria.category,
    );
    if (productosCategoria.length === 0) return;

    const bloque = document.createElement("div");
    bloque.className = "bloque-categoria";
    bloque.innerHTML = `<h3>${categoria.category}</h3>`;

    productosCategoria.forEach((producto) => {
      const item = document.createElement("div");
      item.className = "producto-item producto-cliente";

      item.innerHTML = `
          <h4>${producto.nombre}</h4>
          <p class="precio">${producto.precioFormateado}</p>
          <small>${producto.disponibilidadTag}</small>
                <button type="button" class="btn-comprar" data-id="${producto.id}">
                    Agregar al pedido
                </button>
            `;

      bloque.appendChild(item);
    });

    contenedor.appendChild(bloque);
  });
}

function renderizarPromociones() {
  const contenedor = document.getElementById("promocionesCliente");
  if (!contenedor) return;

  const promociones = obtenerPromociones();
  contenedor.innerHTML = "<h3>Promociones del día</h3>";

  if (promociones.length === 0) {
    contenedor.innerHTML += "<p>No hay promociones activas por el momento.</p>";
    return;
  }

  promociones.forEach((promocion) => {
    const elemento = document.createElement("div");
    elemento.className = "promo-item";
    elemento.innerHTML = `
      <strong>${promocion.nombre}</strong> - ${promocion.mensajePromo}<br>
      <span>Antes: $${promocion.precioOriginal.toFixed(2)} MXN</span>
      <strong> Ahora: $${promocion.precioPromocion.toFixed(2)} MXN</strong>
    `;
    contenedor.appendChild(elemento);
  });
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
  renderizarPromociones();
  renderizarPedidoActual();

  const catalogo = document.getElementById("catalogoCliente");
  const botonConfirmar = document.getElementById("btnConfirmarPedido");

  if (catalogo) catalogo.addEventListener("click", manejarClicCatalogo);
  if (botonConfirmar)
    botonConfirmar.addEventListener("click", manejarConfirmarPedido);
}
