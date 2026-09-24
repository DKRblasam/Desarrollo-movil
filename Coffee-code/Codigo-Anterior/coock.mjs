import {existencias} from './Productos.mjs';

export const existencias = [
  {
    category: "Bebidas",
    prods: [
      {
        id: "#",
        tipo: "",
        coffee: "",
        price: 0.0,
      }
    ]
  },
  {
    category: "Alimentos",
    prods: [
      {
        id: "#",
        tipo: "",
        food: "",
        price: 0.0,
      }
    ]
  },
  {
    category: "Souvenirs",
    prods: [
      {
        id: "#",
        tipo: "",
        elem: "",
        price: 0.0,
      }
    ]
  },
];

export class Productos {

  

  static make_Producto (id = 0, name = "", price = 0.0, stock = 0, category = "", tipo = "") {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.category = category;
    this.tipo = tipo;

    existencias.forEach((cat) => {
      if (cat.category === category) {
        cat.prods.push({
          id: this.id,
          tipo: this.tipo,
          name: this.name,
          price: this.price,
        });
      }
    });
  }
}

export class Pedido {

  id = '#####01';
  prods = [];
  s_Price = 0.0;
  t_price = 0.0;

  Prdido (Producto = {}) {
    this.prods.push(Producto)
  }

}
