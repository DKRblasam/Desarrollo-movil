// Caja.mjs

import {
  Producto,
  Pedido,
  agregarProducto
} from "../../Productos.mjs";


// Lista de pedidos
export const pedidos = [];


// Total acumulado
export let totalAcumulado = 0;


// Función para agregar un pedido
export function agregarPedido(producto) {

  const nuevoPedido = new Pedido(pedidos.length + 1);

  nuevoPedido.agregarProducto(producto);

  pedidos.push(nuevoPedido);

  totalAcumulado += producto.price;

  return nuevoPedido;
}


// Productos de ejemplo

const matcha = agregarProducto(
  1,
  "Matcha Latte Helado",
  100,
  10,
  "Bebidas",
  "Bebida fría"
);

const frappuccino = agregarProducto(
  2,
  "Caramel Frappuccino",
  95,
  10,
  "Bebidas",
  "Bebida fría"
);

const cheesecake = agregarProducto(
  3,
  "Cheesecake de Fresa",
  85,
  10,
  "Alimentos",
  "Postre"
);


// Crear pedidos
agregarPedido(matcha);
agregarPedido(frappuccino);
agregarPedido(cheesecake);


// Mostrar pedidos en HTML
const lista = document.getElementById("listaPedidos");
const total = document.getElementById("total");


// Limpiar lista
lista.innerHTML = "";


// Mostrar pedidos
pedidos.forEach((pedido) => {

  pedido.prods.forEach((producto) => {

    const elemento = document.createElement("p");

    elemento.textContent =
      `${producto.name} - $${producto.price}`;

    lista.appendChild(elemento);

  });

});


// Mostrar total
total.textContent =
  `Total acumulado: $${totalAcumulado}`;