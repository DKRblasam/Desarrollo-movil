// Cliente.mjs
// ===================================================
//   Cliente: interfaz para consultar productos y pedidos
// ===================================================

import {
  existencias,
  obtenerProductos,
  cargarProductos,
  sembrarCatalogoInicial,
  productosCategoria,
} from "../David/Productos.mjs";
import {
  pedidos,
  cargarPedidos,
  crearPedido,
  agregarProductoAPedido,
  calcularTotal,
  cerrarPedido,
  calcularDesglose,
} from "../Funcionalidad/Pedidos.mjs";

let pedidoActual = null;
const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function obtenerProductosDisponibles(){
  const todos = obtenerProductos();
  const disponibles = [];

  todos.forEach((prod) => {
    if (prod.stock > 0) {
      disponibles.push(prod);
    }
  });
  return disponibles;
}

export function obtenerMenuDinamico(){
  const disponibles = obtenerProductosDisponibles();

  return disponibles.map((prod) => {
    return {
      id: prod.id,
      nombre: prod.name.toUpperCase(),
      categoria: prod.category,
      tipo: prod.tipo,
      precioFormateado: `$${prod.price.toFixed(2)} MXN`,
      precioOriginal: prod.price,
      stock: prod.stock,
      disponibilidadTag: prod.stock <= 5 ? "¡Últimas piezas!" : "Disponible",
    };
  });
}

export function obtenerPromociones() {
  const disponibles = obtenerProductosDisponibles();

  //aplicar un 15% de descuento en categoria bebidas o postres
  return disponibles
    .filter((prod) => prod.category === "Bebidas" || prod.tipo === "Dulce")
    .map((prod) => {
      const descuento = 0.15;
      const precioConDescuento = prod.price * (1 - descuento);

      return {
        id: prod.id,
        nombre: prod.name,
        precioOriginal: prod.price,
        precioPromocion: Number(precioConDescuento.toFixed(2)),
        ahorro: Number((prod.price - precioConDescuento).toFixed(2)),
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

  existencias.forEach((categoria) =>{
    const prodsCategoria = menu.filter(
      (prod) => prod.categoria === categoria.category
    );

    if (prodsCategoria.length === 0) return;

    const bloque = document.createElement("div");
    bloque.className = "bloque-categoria";
    bloque.innerHTML = `<h3>${categoria.category}</h3>`;

    // iterar sobre cada producto y agregarlo al DOM
    prodsCategoria.forEach((producto) => {
      const item = document.createElement("div");
      item.className = "producto-item producto-cliente";

      item.innerHTML = `
        <h4>${producto.nombre}</h4>
        <p class="precio">${producto.precioFormateado}</p>
        <small class="tag-stock">${producto.disponibilidadTag}</small>
        <button type="button" class="btn-comprar" data-id="${producto.id}">
            Agregar al pedido
        </button>
      `;

      bloque.appendChild(item);
    });

    contenedor.appendChild(bloque);
  });
}

// =============== Mostrar Promociones disponibles ===============

function renderizarPromociones() {
  const contenedor = document.getElementById("promocionesCliente");
  if (!contenedor) return;

  const promociones = obtenerPromociones();
  contenedor.innerHTML = "<h3>Promociones del día</h3>";

  if (promociones.length === 0) {
    contenedor.innerHTML += "<p>No hay promociones activas por el momento.</p>";
    return;
  }

  // dibujar la lista de promociones
  promociones.forEach((promo) => {
    const promoEl = document.createElement("div");
    promoEl.className = "promo-item";
    promoEl.innerHTML = `
      <strong>${promo.nombre}</strong> - ${promo.mensajePromo}<br>
      <span class="precio-antes">Antes: $${promo.precioOriginal} MXN</span> 
      <strong class="precio-ahora">Ahora: $${promo.precioPromocion} MXN</strong>
    `;
    contenedor.appendChild(promoEl);
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
    totalEl.innerHTML = "Total: $0.00 MXN";
    return;
  }

  pedidoActual.items.forEach((item) => {
    const fila = document.createElement("p");
    const precioAplicado = item.producto.price;
    fila.textContent = `${item.producto.name} x${item.cantidad} - $${(precioAplicado * item.cantidad).toFixed(2)} MXN`;
    lista.appendChild(fila);
  });

  const { subtotal, iva, total } = calcularDesglose(pedidoActual.id, 0.16);

  totalEl.innerHTML = `
    <div class="desglose-precio">
      <span>Subtotal: $${subtotal.toFixed(2)} MXN</span><br>
      <small>+ IVA (16%): $${iva.toFixed(2)} MXN</small><br>
      <strong>Total: $${total.toFixed(2)} MXN</strong>
    </div>
  `;
}

// =============== Asincronia y UI de estados =========================

function actualizarEstadoUI(mensaje, estadoClase =""){
  let contenedorEstado = document.getElementById("estadoPedidoCliente");

  if (!contenedorEstado){
    contenedorEstado = document.createElement("div");
    contenedorEstado.id = "estadoPedidoCliente";
    contenedorEstado.className = "notificacion-estado";
    const panelPedido = document.getElementById("listaPedidoCliente");
    if(panelPedido && panelPedido.parentNode){
      panelPedido.parentNode.appendChild(contenedorEstado);
    } else{
      document.body.appendChild(contenedorEstado);
    }
  }
  contenedorEstado.className = `notificacion-estado ${estadoClase}`;
  contenedorEstado.innerHTML = `<h4>Estado del Pedido:</h4><p>${mensaje}</p>`;
}

async function seguimientoPedido(idPedido) {
  //pedido recibido
  actualizarEstadoUI(`Pedido #${idPedido} recibido. Enviando a cocina...`, "estado-recibido");
  await esperar(3000);
  //preparando pedido
  actualizarEstadoUI(`Pedido #${idPedido} en preparacion...`, "estado-preparando");
  await esperar(4000);
  //empacando pedido
  actualizarEstadoUI(`Pedido #${idPedido} siendo empacado...`, "estado-empacando");
  await esperar(3000);
  //pedido entregado
  actualizarEstadoUI(`Pedido #${idPedido} entregado! Gracias por su compra.`, "estado-entregado");
}

// =============== Eventos ===============

function manejarClicCatalogo(evento) {
  const boton = evento.target.closest("button[data-id]");
  if (!boton) return;

  const idProducto = Number(boton.dataset.id);
  const productoOriginal = obtenerProductos().find((prod) => prod.id === idProducto);

  if (!productoOriginal) return;

  const productoAAgregar = JSON.parse(JSON.stringify(productoOriginal));
  const categoria = productoAAgregar.category || productoAAgregar.categoria;
  const tipo = (productoAAgregar.tipo || "").toLowerCase();

  if (categoria === "Bebidas" || tipo === "dulce") {
    const descuento = 0.15;
    productoAAgregar.price = Number((productoAAgregar.price * (1 - descuento)).toFixed(2));
  }

  if (!pedidoActual) {
    pedidoActual = crearPedido();
  }

  agregarProductoAPedido(pedidoActual.id, productoAAgregar, 1);
  renderizarPedidoActual();
}

function manejarConfirmarPedido() {
  if (!pedidoActual || pedidoActual.items.length === 0) {
    alert("Agrega al menos un producto antes de confirmar.");
    return;
  }

  const idPedido = pedidoActual.id;
  const total = calcularTotal(idPedido);

  cerrarPedido(idPedido);
  alert(`Pedido #${idPedido} enviado a caja. Total: $${total} MXN`);

  pedidoActual = null;
  renderizarPedidoActual();

  seguimientoPedido(idPedido);
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
