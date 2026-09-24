# Código externo integrado

Esta carpeta contiene los módulos JavaScript que se integraron a la tienda Starbucks de `Practica2`.

## Organización

```text
Codigo-Exteno/
├── Ashley/
│   ├── Caja.js       # Ejercicio original independiente
│   ├── Caja.mjs      # Módulo integrado de caja
│   └── index.html    # HTML original de referencia
├── David/
│   ├── Concina.mjs   # Interfaz y operaciones de cocina
│   └── Productos.mjs # Productos, catálogo     y persistencia
└── Funcionalidad/
    ├── Cliente.mjs   # Interfaz del cliente
    └── Pedidos.mjs   # Lógica y persistencia de pedidos
```

## Módulos integrados

### Productos: `David/Productos.mjs`

Responsabilidades:

- Definir la clase `Producto`.
- Mantener las categorías de productos.
- Crear el catálogo inicial.
- Buscar productos por nombre o identificador.
- Guardar y cargar existencias.

Exporta, entre otras, las funciones `cargarProductos`, `guardarProductos`, `sembrarCatalogoInicial`, `buscarProducto` y `buscarProductoPorId`.

La información se guarda en `localStorage` con la clave `cafe_existencias`.

### Pedidos: `Funcionalidad/Pedidos.mjs`

Responsabilidades:

- Crear pedidos con identificador único.
- Agregar o quitar productos.
- Calcular totales.
- Guardar y cargar pedidos.
- Cambiar el estado de un pedido a `pagado`.

La información se guarda con las claves `cafe_pedidos` y `cafe_pedidos_contador`.

### Cliente: `Funcionalidad/Cliente.mjs`

Inicializa la pantalla `cliente.html`. Carga el catálogo, recupera el pedido abierto, permite agregar productos y envía el pedido a caja cuando se confirma.

La función pública de entrada es:

```javascript
inicializarCliente();
```

### Cocina: `David/Concina.mjs`

Inicializa `cocina.html` y permite administrar el catálogo desde el formulario y la lista de productos.

La función pública de entrada es:

```javascript
inicializarCocina();
```

### Caja: `Ashley/Caja.mjs`

Inicializa `caja.html`, muestra los pedidos registrados y permite marcar como pagados los pedidos que siguen abiertos.

La función pública de entrada es:

```javascript
inicializarCaja();
```

## Punto de entrada

El archivo `Practica2/index.mjs` decide qué módulo cargar según el atributo `data-page` del documento:

```html
<body data-page="cliente"></body>
```

Valores utilizados:

- `cliente` carga `Funcionalidad/Cliente.mjs`.
- `cocina` carga `David/Concina.mjs`.
- `caja` carga `Ashley/Caja.mjs`.

## Integración de botones Comprar

El archivo `Practica2/comprar-producto.mjs` conecta los botones **Comprar** de las páginas individuales de producto y de souvenirs con el sistema de pedidos.

El flujo es:

1. Cargar el catálogo y los pedidos guardados.
2. Identificar el producto por el título visible de la página.
3. Crear o reutilizar el pedido abierto.
4. Agregar una unidad del producto.
5. Guardar el pedido.
6. Redirigir a `cliente.html`.

## Relación entre módulos

```text
index.mjs
├── Cliente.mjs ──┐
├── Concina.mjs ──┼── Productos.mjs
└── Caja.mjs ─────┘
        │
        └────────── Pedidos.mjs

comprar-producto.mjs
├── Productos.mjs
└── Pedidos.mjs
```

## Archivos originales

`Ashley/Caja.js` y `Ashley/index.html` corresponden al ejercicio original de referencia. La aplicación integrada utiliza `Ashley/Caja.mjs` junto con las pantallas principales de `Practica2`.
