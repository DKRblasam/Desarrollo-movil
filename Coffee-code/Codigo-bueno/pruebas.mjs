import {
    agregarProducto,
    editarProducto,
    eliminarProducto,
    listarProductos,
    buscarProducto,
    obtenerProductos,
    productosCategoria,
    productosPorTipo
} from "./index.mjs";


// ===================================================
//                  Agregar productos
// ===================================================

agregarProducto(
    1,
    "Café americano",
    35,
    20,
    "Bebidas",
    "Caliente"
);

agregarProducto(
    2,
    "Té de manzanilla",
    30,
    15,
    "Bebidas",
    "Caliente"
);

agregarProducto(
    3,
    "Hamburguesa",
    85,
    10,
    "Alimentos",
    "Comida"
);

agregarProducto(
    4,
    "Taza institucional",
    120,
    5,
    "Souvenirs",
    "Accesorio"
);


// ===================================================
//                  Listar productos
// ===================================================

console.log("\n--- TODOS LOS PRODUCTOS ---");

listarProductos();


// ===================================================
//                  Buscar producto
// ===================================================

console.log("\n--- BUSCAR PRODUCTO ---");

const producto = buscarProducto("Café americano");

console.log(producto);


// ===================================================
//                  Obtener productos
// ===================================================

console.log("\n--- OBTENER PRODUCTOS ---");

console.log(obtenerProductos());


// ===================================================
//              Productos por categoría
// ===================================================

console.log("\n--- PRODUCTOS DE BEBIDAS ---");

console.log(
    productosCategoria("Bebidas")
);


// ===================================================
//                 Productos por tipo
// ===================================================

console.log("\n--- PRODUCTOS CALIENTES ---");

console.log(
    productosPorTipo("Caliente")
);


// ===================================================
//                  Editar producto
// ===================================================

console.log("\n--- EDITAR PRODUCTO ---");

editarProducto(
    "Café americano",
    {
        price: 40,
        stock: 25
    }
);

console.log(
    buscarProducto("Café americano")
);


// ===================================================
//                 Eliminar producto
// ===================================================

console.log("\n--- ELIMINAR PRODUCTO ---");

eliminarProducto("Té de manzanilla");


// ===================================================
//              Mostrar resultado final
// ===================================================

console.log("\n--- PRODUCTOS FINALES ---");

listarProductos();