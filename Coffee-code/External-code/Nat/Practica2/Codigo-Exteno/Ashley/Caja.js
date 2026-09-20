let pedidos = [];
let totalAcumulado = 0;

// Agregar un pedido
function agregarPedido(producto, precio) {
    let nuevoPedido = {
        producto: producto,
        precio: precio
    };

    pedidos.push(nuevoPedido);
    totalAcumulado += precio;
}

// Agregar productos a los pedidos del cliente
agregarPedido("Matcha Latte Helado", 100);
agregarPedido("Caramel Frappuccino", 95);
agregarPedido("Cheesecake de Fresa", 85);

let lista = document.getElementById("listaPedidos");
let total = document.getElementById("total");

// Mostrar los pedidos del cliente
for (let i = 0; i < pedidos.length; i++) {
    let pedido = document.createElement("p");

    pedido.textContent =
        pedidos[i].producto + " - $" + pedidos[i].precio;

    lista.appendChild(pedido);
}

// Mostrar el total acumulado
total.textContent = "Total acumulado: $" + totalAcumulado;
