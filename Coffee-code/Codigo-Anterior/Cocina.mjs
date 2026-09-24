// Cocina.mjs

// ===================================================
//              Gestión de productos - Cocina
// ===================================================

import {
    existencias,
    Producto,
    buscarProducto,
} from "./Productos.mjs";


// =============== Agregar producto ===============

// Agregar un nuevo producto a las existencias
export function agregarProducto(
    id,
    name,
    price,
    stock,
    category,
    tipo
) {

    // Verificar que la categoría exista
    const categoria = existencias.find(
        (cat) => cat.category === category
    );

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
    const nuevoProducto = new Producto(
        id,
        name,
        price,
        stock,
        category,
        tipo
    );

    // Agregarlo a su categoría
    categoria.prods.push(nuevoProducto);

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
            (producto) => producto.name === name
        );

        if (indice !== -1) {

            const productoEliminado =
                categoria.prods.splice(indice, 1)[0];

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
                `Tipo: ${producto.tipo}`
            );
        }
    }

    return existencias;
}
