// Productos.mjs
// ===================================================
//        Clase y variables de gestión de productos
// ===================================================


// =============== Existencias =============== 

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


// =============== Clase Producto =============== 

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


// =============== Búsqueda de productos =============== 

// Buscar un producto por nombre
export function buscarProducto(name) {

    if (!name) {
        console.log("El nombre del producto no puede estar vacío.");
        return null;
    }

    for (const categoria of existencias) {

        const producto = categoria.prods.find(
            (prod) => prod.name === name
        );

        if (producto) {
            return producto;
        }
    }

    return null;
}


// Obtener todos los productos de todas las categorías
export function obtenerProductos() {
    return existencias.flatMap((cat) => cat.prods);
}


// Obtener todos los productos de una categoría
export function productosCategoria(category) {

    const categoria = existencias.find(
        (cat) => cat.category === category
    );

    return categoria ? categoria.prods : [];
}


//  Obtener los productos de un tipo específico
export function productosPorTipo(tipo) {
    return existencias.flatMap((cat) =>
        cat.prods.filter((prod) => prod.tipo === tipo)
    );
}