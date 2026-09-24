onst productos = [ 
    // Bebidas Calientes 
    { id: "001", nombre: "Espresso", precio: 45.00, stock: 20, categoria: 
"Bebidas Calientes", tipo: "Bebida" }, 
    { id: "002", nombre: "Café Americano", precio: 50.00, stock: 25, 
categoria: "Bebidas Calientes", tipo: "Bebida" }, 
    { id: "003", nombre: "Latte", precio: 60.00, stock: 20, categoria: 
"Bebidas Calientes", tipo: "Bebida" }, 
    { id: "004", nombre: "Cappuccino", precio: 60.00, stock: 20, categoria: 
"Bebidas Calientes", tipo: "Bebida" }, 
 
    { id: "005", nombre: "Chocolate Caliente", precio: 65.00, stock: 15, 
categoria: "Bebidas Calientes", tipo: "Bebida" }, 
    { id: "006", nombre: "Chocolate Mexicano", precio: 70.00, stock: 15, 
categoria: "Bebidas Calientes", tipo: "Bebida" }, 
 
    // Bebidas Frías 
    { id: "007", nombre: "Mango Dragonfruit Refresher", precio: 60.00, stock: 
20, categoria: "Bebidas Frías", tipo: "Bebida" }, 
    { id: "008", nombre: "Strawberry Acai Refresher", precio: 60.00, stock: 
20, categoria: "Bebidas Frías", tipo: "Bebida" }, 
    { id: "009", nombre: "Pink Drink", precio: 65.00, stock: 15, categoria: 
"Bebidas Frías", tipo: "Bebida" }, 
    { id: "010", nombre: "Toasted Vanilla Shaken Espresso Helado", precio: 
65.00, stock: 15, categoria: "Bebidas Frías", tipo: "Bebida" }, 
    { id: "011", nombre: "Brown Sugar Shaken Espresso Helado", precio: 65.00, 
stock: 15, categoria: "Bebidas Frías", tipo: "Bebida" }, 
 
    // Alimentos 
    { id: "012", nombre: "Baguette Suprema", precio: 80.00, stock: 10, 
categoria: "Alimentos", tipo: "Alimento" }, 
    { id: "013", nombre: "Ensalada César", precio: 70.00, stock: 8, categoria: 
"Alimentos", tipo: "Alimento" }, 
    { id: "014", nombre: "Sándwich de Pavo y Panela", precio: 75.00, stock: 
14, categoria: "Alimentos", tipo: "Alimento" }, 
    { id: "015", nombre: "Dona de caramelo", precio: 30.00, stock: 25, 
categoria: "Alimentos", tipo: "Alimento" }, 
    { id: "016", nombre: "Pastel de Zanahoria", precio: 60.00, stock: 6, 
categoria: "Alimentos", tipo: "Alimento" }, 
 
    // Tazas 
    { id: "017", nombre: "Taza Blanca Clásica", precio: 280.00, stock: 15, 
categoria: "Tazas", tipo: "Souvenir" }, 
    { id: "018", nombre: "Taza Azul Cristal Edición Limitada", precio: 340.00, 
stock: 10, categoria: "Tazas", tipo: "Souvenir" }, 
    { id: "019", nombre: "Taza Acero Inoxidable", precio: 390.00, stock: 12, 
categoria: "Tazas", tipo: "Souvenir" }, 
    { id: "020", nombre: "Taza España \"Been There Series\"", precio: 320.00, 
stock: 8, categoria: "Tazas", tipo: "Souvenir" }, 
 
    // Termos 
    { id: "021", nombre: "Termo azul 600ml", precio: 450.00, stock: 10, 
categoria: "Termos", tipo: "Souvenir" }, 
 
    { id: "022", nombre: "Termo Japón \"Been There Series\"", precio: 520.00, 
stock: 5, categoria: "Termos", tipo: "Souvenir" }, 
    { id: "023", nombre: "Termo New Era Collection", precio: 490.00, stock: 7, 
categoria: "Termos", tipo: "Souvenir" }, 
    { id: "024", nombre: "Termo México 20 años", precio: 480.00, stock: 9, 
categoria: "Termos", tipo: "Souvenir" }, 
 
    // Vasos 
    { id: "025", nombre: "Vaso Reutilizable", precio: 120.00, stock: 30, 
categoria: "Vasos", tipo: "Souvenir" }, 
    { id: "026", nombre: "Vaso Transparente", precio: 250.00, stock: 18, 
categoria: "Vasos", tipo: "Souvenir" }, 
    { id: "027", nombre: "Vaso con Gema de Esmeralda", precio: 380.00, stock: 
11, categoria: "Vasos", tipo: "Souvenir" }, 
    { id: "028", nombre: "Vaso Holográfico", precio: 350.00, stock: 14, 
categoria: "Vasos", tipo: "Souvenir" } 
]; 
 
 
// Función para mostrar los productos 
function mostrarProductos() { 
 
    const lista = document.getElementById("listaProductos"); 
 
    lista.innerHTML = ""; 
 
    productos.forEach(function(producto) { 
 
        lista.innerHTML += ` 
            <p> 
                <strong>${producto.nombre}</strong> 
                - $${producto.precio} 
                - Categoría: ${producto.categoria} 
                - Stock: ${producto.stock} 
            </p> 
        `; 
 
    }); 
} 
 
 
// Mostrar los productos al cargar la página 
mostrarProductos(); 

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
