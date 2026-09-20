// productos.mjs

// ===================================================
//   Módulo de DATOS/LÓGICA: gestión de productos
//   (no toca el DOM; cocina.mjs y cliente.mjs lo usan)
// ===================================================


// ===================================================
//        Clase y variables de gestión de productos
// ===================================================

const CLAVE_STORAGE = "cafe_existencias";

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

// =============== Persistencia (localStorage) ===============

// Guarda el estado actual de existencias para que otras pantallas lo lean
export function guardarProductos() {
  try {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(existencias));
  } catch (error) {
    console.log("No se pudo guardar el catálogo:", error.message);
  }
}

// Carga existencias guardadas previamente (si existen)
export function cargarProductos() {
  try {
    const datos = localStorage.getItem(CLAVE_STORAGE);
    if (!datos) return;

    const guardado = JSON.parse(datos);

    guardado.forEach((categoriaGuardada, indice) => {
      if (existencias[indice]) {
        existencias[indice].prods = categoriaGuardada.prods;
      }
    });
  } catch (error) {
    console.log("No se pudo cargar el catálogo guardado:", error.message);
  }
}

// Crea el catálogo inicial a partir de los productos del sitio, solo si aún
// no hay nada guardado en localStorage. Los precios de Bebidas/Alimentos son
// un valor supuesto (esas páginas no mostraban precio); los de Souvenirs son
// los mismos que ya aparecían en tazas.html, termos.html y vasos.html.
export function sembrarCatalogoInicial() {
  const hayProductos = existencias.some((cat) => cat.prods.length > 0);
  if (hayProductos) return;

  const catalogoBase = [
    // Bebidas calientes
    {
      name: "Espresso",
      price: 45,
      stock: 50,
      category: "Bebidas",
      tipo: "Caliente",
    },
    {
      name: "Café Americano",
      price: 48,
      stock: 50,
      category: "Bebidas",
      tipo: "Caliente",
    },
    {
      name: "Latte",
      price: 55,
      stock: 50,
      category: "Bebidas",
      tipo: "Caliente",
    },
    {
      name: "Cappuccino",
      price: 55,
      stock: 50,
      category: "Bebidas",
      tipo: "Caliente",
    },
    {
      name: "Chocolate Caliente",
      price: 58,
      stock: 40,
      category: "Bebidas",
      tipo: "Caliente",
    },
    {
      name: "Chocolate Mexicano",
      price: 60,
      stock: 40,
      category: "Bebidas",
      tipo: "Caliente",
    },
    // Bebidas frías
    {
      name: "Mango Dragonfruit Refresher",
      price: 65,
      stock: 40,
      category: "Bebidas",
      tipo: "Fría",
    },
    {
      name: "Strawberry Acaí Refresher",
      price: 65,
      stock: 40,
      category: "Bebidas",
      tipo: "Fría",
    },
    {
      name: "Pink Drink",
      price: 68,
      stock: 40,
      category: "Bebidas",
      tipo: "Fría",
    },
    {
      name: "Toasted Vanilla Shaken Espresso Helado",
      price: 70,
      stock: 30,
      category: "Bebidas",
      tipo: "Fría",
    },
    {
      name: "Brown Sugar Shaken Espresso Helado",
      price: 70,
      stock: 30,
      category: "Bebidas",
      tipo: "Fría",
    },
    // Alimentos
    {
      name: "Baguette Suprema",
      price: 75,
      stock: 25,
      category: "Alimentos",
      tipo: "Salado",
    },
    {
      name: "Ensalada César",
      price: 80,
      stock: 25,
      category: "Alimentos",
      tipo: "Salado",
    },
    {
      name: "Sándwich de Pavo y Panela",
      price: 72,
      stock: 25,
      category: "Alimentos",
      tipo: "Salado",
    },
    {
      name: "Dona de Caramelo",
      price: 38,
      stock: 30,
      category: "Alimentos",
      tipo: "Dulce",
    },
    {
      name: "Pastel de Zanahoria",
      price: 55,
      stock: 20,
      category: "Alimentos",
      tipo: "Dulce",
    },
    // Souvenirs (precios tomados de tazas.html / termos.html / vasos.html)
    {
      name: "Taza Blanca Clásica",
      price: 280,
      stock: 15,
      category: "Souvenirs",
      tipo: "Taza",
    },
    {
      name: "Taza Azul Cristal Edición Limitada",
      price: 340,
      stock: 10,
      category: "Souvenirs",
      tipo: "Taza",
    },
    {
      name: "Taza Acero Inoxidable",
      price: 390,
      stock: 10,
      category: "Souvenirs",
      tipo: "Taza",
    },
    {
      name: 'Taza España "Been There Series"',
      price: 320,
      stock: 10,
      category: "Souvenirs",
      tipo: "Taza",
    },
    {
      name: "Termo azul 600ml",
      price: 450,
      stock: 10,
      category: "Souvenirs",
      tipo: "Termo",
    },
    {
      name: 'Termo Japón "Been There Series"',
      price: 520,
      stock: 8,
      category: "Souvenirs",
      tipo: "Termo",
    },
    {
      name: "Termo New Era Collection",
      price: 490,
      stock: 8,
      category: "Souvenirs",
      tipo: "Termo",
    },
    {
      name: "Termo México 20 años",
      price: 480,
      stock: 8,
      category: "Souvenirs",
      tipo: "Termo",
    },
    {
      name: "Vaso Reutilizable",
      price: 120,
      stock: 20,
      category: "Souvenirs",
      tipo: "Vaso",
    },
    {
      name: "Vaso Transparente",
      price: 250,
      stock: 15,
      category: "Souvenirs",
      tipo: "Vaso",
    },
    {
      name: "Vaso con Gema de Esmeralda",
      price: 380,
      stock: 12,
      category: "Souvenirs",
      tipo: "Vaso",
    },
    {
      name: "Vaso Holográfico",
      price: 350,
      stock: 12,
      category: "Souvenirs",
      tipo: "Vaso",
    },
  ];

  catalogoBase.forEach((datos, indice) => {
    const categoria = existencias.find(
      (cat) => cat.category === datos.category,
    );
    if (!categoria) return;

    categoria.prods.push(
      new Producto(
        indice + 1,
        datos.name,
        datos.price,
        datos.stock,
        datos.category,
        datos.tipo,
      ),
    );
  });

  guardarProductos();
}

// =============== Búsqueda de productos ===============

// Buscar un producto por nombre
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

// Buscar un producto por id
export function buscarProductoPorId(id) {
  for (const categoria of existencias) {
    const producto = categoria.prods.find((prod) => prod.id === Number(id));
    if (producto) return producto;
  }
  return null;
}

// Obtener todos los productos de todas las categorías
export function obtenerProductos() {
  return existencias.flatMap((cat) => cat.prods);
}

// Obtener todos los productos de una categoría
export function productosCategoria(category) {
  const categoria = existencias.find((cat) => cat.category === category);

  return categoria ? categoria.prods : [];
}

//  Obtener los productos de un tipo específico
export function productosPorTipo(tipo) {
  return existencias.flatMap((cat) =>
    cat.prods.filter((prod) => prod.tipo === tipo),
  );
}
