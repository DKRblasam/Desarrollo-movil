// Productos.mjs

// Existencias de la tienda
export const existencias = [
  {
    category: "Bebidas",
    prods: []
  },
  {
    category: "Alimentos",
    prods: []
  },
  {
    category: "Souvenirs",
    prods: []
  }
];


// Clase Producto
export class Producto {

  constructor(
    id = 0,
    name = "",
    price = 0.0,
    stock = 0,
    category = "",
    tipo = ""
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.category = category;
    this.tipo = tipo;
  }

}


// Función para agregar un producto a las existencias
export function agregarProducto(
  id,
  name,
  price,
  stock,
  category,
  tipo
) {

  const nuevoProducto = new Producto(
    id,
    name,
    price,
    stock,
    category,
    tipo
  );

  const categoria = existencias.find(
    (cat) => cat.category === category
  );

  if (!categoria) {
    console.log(`La categoría "${category}" no existe.`);
    return null;
  }

  categoria.prods.push(nuevoProducto);

  return nuevoProducto;
}


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
