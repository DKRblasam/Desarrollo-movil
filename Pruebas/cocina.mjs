// cocina.mjs

              // ===================================================
              //   Módulo de INTERFAZ: acciones de Cocina (DOM)
              // ===================================================

import {
  existencias,
  agregarProducto,
  editarProducto,
  eliminarProducto,
  buscarProductoPorId,
} from "./productos.mjs";

// id del producto que se está editando (null si se está agregando uno nuevo)
let idEnEdicion = null;

// Se llama una sola vez, al cargar la página
export function initCocina() {
  document
    .getElementById("cocina-form")
    .addEventListener("submit", handleSubmitForm);

  document
    .getElementById("cocina-cancelar-edicion")
    .addEventListener("click", cancelarEdicion);
}

// Se llama cada vez que se muestra la pestaña de Cocina
export function renderCocina() {
  const contenedor = document.getElementById("cocina-lista");
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
      vacio.textContent = "No hay productos en esta categoría.";
      bloque.appendChild(vacio);
    }

    for (const producto of categoria.prods) {
      bloque.appendChild(crearFilaProducto(producto));
    }

    contenedor.appendChild(bloque);
  }

  contenedor.querySelectorAll(".btn-editar").forEach((btn) => {
    btn.addEventListener("click", () => {
      const producto = buscarProductoPorId(Number(btn.dataset.id));
      if (producto) iniciarEdicion(producto);
    });
  });

  contenedor.querySelectorAll(".btn-eliminar").forEach((btn) => {
    btn.addEventListener("click", () => {
      const producto = buscarProductoPorId(Number(btn.dataset.id));
      if (producto) handleEliminar(producto);
    });
  });
}

function crearFilaProducto(producto) {
  const fila = document.createElement("div");
  fila.className = "producto-card";

  fila.innerHTML = `
    <div class="producto-info">
      <span class="producto-nombre">${producto.name}</span>
      <span class="producto-precio">
        $${producto.price.toFixed(2)} · stock: ${producto.stock} · ${producto.tipo}
      </span>
    </div>
    <div class="producto-accion">
      <button class="btn-editar" data-id="${producto.id}">Editar</button>
      <button class="btn-eliminar btn-peligro" data-id="${producto.id}">Eliminar</button>
    </div>
  `;

  return fila;
}

// =============== Agregar / editar (mismo formulario) ===============

function handleSubmitForm(evento) {
  evento.preventDefault();
  const form = evento.target;

  const name = form.name.value.trim();
  const price = Number(form.price.value);
  const stock = Number(form.stock.value);
  const category = form.category.value;
  const tipo = form.tipo.value.trim();

  if (!name || !tipo || price <= 0 || stock < 0) {
    alert("Revisa los datos: todos los campos son obligatorios y el precio debe ser mayor a 0.");
    return;
  }

  if (idEnEdicion !== null) {
    editarProducto(idEnEdicion, { name, price, stock, category, tipo });
    cancelarEdicion();
  } else {
    const nuevo = agregarProducto(name, price, stock, category, tipo);
    if (!nuevo) {
      alert(`Ya existe un producto llamado "${name}".`);
      return;
    }
  }

  form.reset();
  renderCocina();
}

function iniciarEdicion(producto) {
  idEnEdicion = producto.id;

  const form = document.getElementById("cocina-form");
  form.name.value = producto.name;
  form.price.value = producto.price;
  form.stock.value = producto.stock;
  form.category.value = producto.category;
  form.tipo.value = producto.tipo;

  document.getElementById("cocina-form-titulo").textContent = `Editando "${producto.name}"`;
  document.getElementById("cocina-guardar-btn").textContent = "Guardar cambios";
  document.getElementById("cocina-cancelar-edicion").hidden = false;

  form.scrollIntoView({ behavior: "smooth", block: "start" });
}

function cancelarEdicion() {
  idEnEdicion = null;

  const form = document.getElementById("cocina-form");
  form.reset();

  document.getElementById("cocina-form-titulo").textContent = "Agregar producto";
  document.getElementById("cocina-guardar-btn").textContent = "Agregar";
  document.getElementById("cocina-cancelar-edicion").hidden = true;
}

// =============== Eliminar ===============

function handleEliminar(producto) {
  const confirmado = confirm(`¿Eliminar "${producto.name}" de las existencias?`);
  if (!confirmado) return;

  eliminarProducto(producto.id);

  if (idEnEdicion === producto.id) cancelarEdicion();

  renderCocina();
}
