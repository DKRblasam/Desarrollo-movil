// Productos.mjs



                    // ===================================================
                    //        Clases y Variables de gestión de productos
                    // ===================================================


// Existencias de la tienda
export const existencias = [
  {
    category: "Bebidas",
    prods: [],
  },
  {
    category: "Alimentos",
    prods: [],
  },
  {
    category: "Souvenirs",
    prods: [],
  },
];

// Clase Pedido
export class Pedido {
  constructor(id = 1) {
    this.id = id;
    this.prods = [];
    this.s_Price = 0.0;
    this.t_price = 0.0;
  }

  agregarProducto(producto) {
    this.prods.push(producto);

    this.s_Price += producto.price;

    this.t_price = this.s_Price;
  }
}


// Clase Producto
export class Producto {
  constructor(
    id = 0,
    name = "",
    price = 0.0,
    stock = 0,
    category = "",
    tipo = "",
  ) {
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

// Función para agregar un producto a las existencias
export function agregarProducto(id, name, price, stock, category, tipo) {
  const nuevoProducto = new Producto(id, name, price, stock, category, tipo);

  const categoria = existencias.find((cat) => cat.category === category);

  if (!categoria) {
    console.log(`La categoría "${category}" no existe.`);
    return null;
  }

  categoria.prods.push(nuevoProducto);

  return nuevoProducto;
}


// Función para Editar el contenido de un producto
export function editarProducto(name, nuevosDatos) {

  const producto = buscarProducto(String(name)); // Buscar el producto por nombre

  if (!producto) {
    console.log(`El producto "${name}" no existe.`);
    return null;
  }

  // Actualizar los datos del producto
  for (const [key, value] of Object.entries(nuevosDatos)) {
    producto[key] = value;
  }

  return producto;
}



// =============== Busqueda/listeo de productos =============== 



// Buscar un produccto en las existencias
export function buscarProducto(name) {
  if (!name) {
    console.log("El nombre del producto no puede estar vacío.");
    return null;
  }
  for (const categoria of existencias) {
    const producto = categoria.prods.find((prod) => prod.name === name);

    if (producto) {
      return producto;
    }
  }
  return null;
}

// Función para obtener productos por categoría
export function productosCategoria(category) {
  const categoria = existencias.find((cat) => cat.category === category);
  return categoria ? categoria.prods : [];
}