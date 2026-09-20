// productos.mjs

                    // ===================================================
                    //   Módulo de DATOS/LÓGICA: gestión de productos
                    //   (no toca el DOM; cocina.mjs y cliente.mjs lo usan)
                    // ===================================================

// Existencias de la tienda, organizadas por categoría
export const existencias = [
  { category: "Bebidas", prods: [] },
  { category: "Alimentos", prods: [] },
  { category: "Souvenirs", prods: [] },
];

let contadorId = 1;

// Clase Producto
export class Producto {
  constructor(id, name, price, stock, category, tipo) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.category = category;
    this.tipo = tipo;
  }
}

              // ===================================================
              //        Funciones de gestión de productos
              // ===================================================

// =============== Manipulación de productos ===============

// Agregar un producto nuevo a las existencias
export function agregarProducto(name, price, stock, category, tipo) {
  const categoria = existencias.find((cat) => cat.category === category);

  if (!categoria) {
    console.log(`La categoría "${category}" no existe.`);
    return null;
  }

  if (buscarProducto(name)) {
    console.log(`El producto "${name}" ya existe.`);
    return null;
  }

  const nuevoProducto = new Producto(contadorId++, name, price, stock, category, tipo);
  categoria.prods.push(nuevoProducto);

  return nuevoProducto;
}

// Editar el contenido de un producto existente (por id)
export function editarProducto(id, nuevosDatos) {
  const producto = buscarProductoPorId(id);

  if (!producto) {
    console.log(`El producto con id "${id}" no existe.`);
    return null;
  }

  for (const [key, value] of Object.entries(nuevosDatos)) {
    if (key in producto && key !== "id") {
      producto[key] = value;
    }
  }

  return producto;
}

// Eliminar un producto de las existencias (por id)
export function eliminarProducto(id) {
  for (const categoria of existencias) {
    const indice = categoria.prods.findIndex((producto) => producto.id === id);

    if (indice !== -1) {
      return categoria.prods.splice(indice, 1)[0];
    }
  }

  console.log(`El producto con id "${id}" no existe.`);
  return null;
}

// =============== Búsqueda/listado de productos ===============

// Buscar un producto por nombre (sin distinguir mayúsculas/minúsculas)
export function buscarProducto(name) {
  if (!name) {
    console.log("El nombre del producto no puede estar vacío.");
    return null;
  }

  for (const categoria of existencias) {
    const producto = categoria.prods.find(
      (prod) => prod.name.toLowerCase() === name.toLowerCase()
    );

    if (producto) return producto;
  }

  return null;
}

// Buscar un producto por id
export function buscarProductoPorId(id) {
  for (const categoria of existencias) {
    const producto = categoria.prods.find((prod) => prod.id === id);
    if (producto) return producto;
  }
  return null;
}

// Obtener productos por categoría
export function productosCategoria(category) {
  const categoria = existencias.find((cat) => cat.category === category);
  return categoria ? categoria.prods : [];
}

// Mostrar todos los productos registrados (uso en consola/pruebas)
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
          `Tipo: ${producto.tipo}`
      );
    }
  }

  return existencias;
}

// =============== Datos de arranque ===============
// Para que la tienda tenga algo que mostrar apenas se abre la página.
agregarProducto("Café americano", 35, 20, "Bebidas", "caliente");
agregarProducto("Té helado", 30, 15, "Bebidas", "frío");
agregarProducto("Sandwich club", 65, 10, "Alimentos", "salado");
agregarProducto("Muffin de arándano", 28, 12, "Alimentos", "dulce");
agregarProducto("Taza souvenir", 90, 8, "Souvenirs", "cerámica");
