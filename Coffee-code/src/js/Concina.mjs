// cocina.mjs

// ===================================================
//   Módulo de INTERFAZ: acciones de Cocina (DOM)
// ===================================================
// Cocina.mjs
// ===================================================
//   Cocina: administración de productos (lógica + interfaz)
// ===================================================

import {
  existencias,
  Producto,
  buscarProducto,
  guardarProductos,
  cargarProductos,
  sembrarCatalogoInicial,
  buscarProductosBaratos,
  buscarProductosCaros,
  obtenerBebidas,
  obtenerPostres,
} from "./Productos.mjs";

// =============== Agregar producto ===============

// Agregar un nuevo producto a las existencias
export function agregarProducto(id, name, price, stock, category, tipo) {
  // Verificar que la categoría exista
  const categoria = existencias.find((cat) => cat.category === category);

  if (!categoria) {
    console.log(`La categoría "${category}" no existe.`);
    return null;
  }

  // Verificar que el producto no exista
  const productoExistente = buscarProducto(name);

  if (productoExistente) {
    console.log(`El producto "${name}" ya existe.`);
    return null;
  }

  // Crear el producto
  const nuevoProducto = new Producto(id, name, price, stock, category, tipo);

  // Agregarlo a su categoría
  categoria.prods.push(nuevoProducto);
  guardarProductos();

  return nuevoProducto;
}

// =============== Editar producto ===============

// Editar las propiedades de un producto existente
export function editarProducto(name, nuevosDatos) {
  const producto = buscarProducto(name);

  if (!producto) {
    console.log(`El producto "${name}" no existe.`);
    return null;
  }

  // Actualizar únicamente propiedades existentes
  for (const [key, value] of Object.entries(nuevosDatos)) {
    if (key in producto) {
      producto[key] = value;
    }
  }

  guardarProductos();
  return producto;
}

// =============== Eliminar producto ===============

// Eliminar un producto por nombre
export function eliminarProducto(name) {
  if (!name || typeof name !== "string") {
    console.log("El nombre del producto no es válido.");
    return null;
  }

  for (const categoria of existencias) {
    const indice = categoria.prods.findIndex(
      (producto) => producto.name === name,
    );

    if (indice !== -1) {
      const productoEliminado = categoria.prods.splice(indice, 1)[0];

      guardarProductos();
      return productoEliminado;
    }
  }

  console.log(`El producto "${name}" no existe.`);

  return null;
}

// =============== Listar productos ===============

// Mostrar todos los productos registrados
export function listarProductos() {
  for (const categoria of existencias) {
    console.log(`\n=== ${categoria.category} ===`);

    if (categoria.prods.length === 0) {
      console.log("No hay productos.");
      continue;
    }

    for (const producto of categoria.prods) {
      console.log(
        `ID: ${producto.id} | ` +
          `Nombre: ${producto.name} | ` +
          `Precio: $${producto.price} | ` +
          `Stock: ${producto.stock} | ` +
          `Tipo: ${producto.tipo}`,
      );
    }
  }

  return existencias;
}

// ===================================================
//        Interfaz de Cocina (manipulación del DOM)
// ===================================================

let siguienteIdProducto = 1;

function calcularSiguienteId() {
  const todos = existencias.flatMap((cat) => cat.prods);
  const maxId = todos.reduce((max, p) => Math.max(max, Number(p.id) || 0), 0);
  siguienteIdProducto = maxId + 1;
}

function renderizarTablaProductos() {
  const contenedor = document.getElementById("listaProductosCocina");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  for (const categoria of existencias) {
    for (const producto of categoria.prods) {
      const fila = document.createElement("div");
      fila.className = "producto-cocina";

      fila.innerHTML = `
                <div class="producto-cocina-info">
                    <strong>${producto.name}</strong>
                    <span>${categoria.category} · ${producto.tipo}</span>
                    <span>$${producto.price} MXN · Stock: ${producto.stock}</span>
                </div>
                <div class="producto-cocina-acciones">
                    <button type="button" data-accion="editar" data-nombre="${producto.name}">Editar</button>
                    <button type="button" data-accion="eliminar" data-nombre="${producto.name}">Eliminar</button>
                </div>
            `;

      contenedor.appendChild(fila);
    }
  }
}

function renderizarProductosFiltrados(productos) {
  const contenedor = document.getElementById("listaProductosCocina");
  if (!contenedor) return;

  contenedor.innerHTML = "";
  if (productos.length === 0) {
    contenedor.innerHTML = "<p>No se encontraron productos que coincidan.</p>";
    return;
  }

  productos.forEach((producto) => {
    const fila = document.createElement("div");
    fila.className = "producto-cocina";
    fila.innerHTML = `
      <div class="producto-cocina-info">
        <strong>${producto.name}</strong>
        <span>${producto.category} · ${producto.tipo}</span>
        <span>$${producto.price} MXN · Stock: ${producto.stock}</span>
      </div>
      <div class="producto-cocina-acciones">
        <button type="button" data-accion="editar" data-nombre="${producto.name}">Editar</button>
        <button type="button" data-accion="eliminar" data-nombre="${producto.name}">Eliminar</button>
      </div>
    `;
    contenedor.appendChild(fila);
  });
}

function conectarFiltros() {
  const filtros = {
    btnFiltrarBaratos: buscarProductosBaratos,
    btnFiltrarCaros: buscarProductosCaros,
    btnFiltrarBebidas: obtenerBebidas,
    btnFiltrarPostres: obtenerPostres,
  };

  Object.entries(filtros).forEach(([id, obtenerProductosFiltrados]) => {
    const boton = document.getElementById(id);
    if (boton) {
      boton.addEventListener("click", () =>
        renderizarProductosFiltrados(obtenerProductosFiltrados()),
      );
    }
  });

  const mostrarTodos = document.getElementById("btnMostrarTodos");
  if (mostrarTodos)
    mostrarTodos.addEventListener("click", renderizarTablaProductos);

  const busqueda = document.getElementById("inputBuscarProducto");
  if (busqueda) {
    busqueda.addEventListener("input", (evento) => {
      const termino = evento.target.value.trim();
      renderizarProductosFiltrados(
        termino
          ? [buscarProducto(termino)].filter(Boolean)
          : obtenerProductos(),
      );
    });
  }
}

function manejarEnvioFormulario(evento) {
  evento.preventDefault();

  const form = evento.target;
  const name = form.nombre.value.trim();
  const price = Number(form.precio.value);
  const stock = Number(form.stock.value);
  const category = form.categoria.value;
  const tipo = form.tipo.value.trim();

  if (!name || !price || !category) {
    alert("Completa al menos nombre, precio y categoría.");
    return;
  }

  const resultado = agregarProducto(
    siguienteIdProducto,
    name,
    price,
    stock,
    category,
    tipo,
  );

  if (resultado) {
    siguienteIdProducto++;
    form.reset();
    renderizarTablaProductos();
  } else {
    alert("No se pudo agregar el producto (revisa la consola).");
  }
}

function manejarClicEnLista(evento) {
  const boton = evento.target.closest("button[data-accion]");
  if (!boton) return;

  const { accion, nombre } = boton.dataset;

  if (accion === "eliminar") {
    const confirmado = confirm(`¿Eliminar "${nombre}"?`);
    if (confirmado) {
      eliminarProducto(nombre);
      renderizarTablaProductos();
    }
  }

  if (accion === "editar") {
    const nuevoPrecio = prompt("Nuevo precio:");
    if (nuevoPrecio !== null && !Number.isNaN(Number(nuevoPrecio))) {
      editarProducto(nombre, { price: Number(nuevoPrecio) });
      renderizarTablaProductos();
    }
  }
}

// Punto de entrada para la pantalla cocina.html
export function inicializarCocina() {
  cargarProductos();
  sembrarCatalogoInicial();
  calcularSiguienteId();
  renderizarTablaProductos();
  conectarFiltros();

  const form = document.getElementById("formNuevoProducto");
  const lista = document.getElementById("listaProductosCocina");

  if (form) form.addEventListener("submit", manejarEnvioFormulario);
  if (lista) lista.addEventListener("click", manejarClicEnLista);
}
