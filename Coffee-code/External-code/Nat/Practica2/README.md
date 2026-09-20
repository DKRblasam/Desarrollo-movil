# Starbucks Coffee Code

Tienda web estática para consultar productos Starbucks, crear pedidos y administrarlos desde las pantallas de cliente, cocina y caja.

## Funcionalidades

- Navegación por categorías: bebidas calientes, bebidas frías, alimentos y souvenirs.
- Consulta de detalle de cada producto.
- Botón **Comprar** en las páginas de producto.
- Carrito de pedido con cantidades y total.
- Persistencia de productos y pedidos mediante `localStorage`.
- Pantalla de cocina para agregar, editar y eliminar productos.
- Pantalla de caja para consultar pedidos y marcarlos como pagados.

## Flujo de compra

1. Abrir `index.html`.
2. Entrar en una categoría y seleccionar un producto.
3. Pulsar **Comprar**.
4. El producto se agrega al pedido abierto y se abre `cliente.html`.
5. Desde **Mi Pedido** se pueden revisar los productos y confirmar el pedido.
6. El pedido confirmado queda disponible en `caja.html`.

Los botones de compra de las páginas de detalle y de souvenirs utilizan `comprar-producto.mjs`. El módulo identifica el producto por el título de la página, reutiliza el pedido abierto y guarda el cambio antes de redirigir al cliente.

## Pantallas principales

| Archivo              | Uso                         |
| -------------------- | --------------------------- |
| `index.html`         | Menú principal              |
| `bebidas-cali.html`  | Lista de bebidas calientes  |
| `bebidas-frias.html` | Lista de bebidas frías      |
| `alimentos.html`     | Lista de alimentos          |
| `tazas.html`         | Catálogo de tazas           |
| `termos.html`        | Catálogo de termos          |
| `vasos.html`         | Catálogo de vasos           |
| `cliente.html`       | Pedido del cliente          |
| `cocina.html`        | Administración del catálogo |
| `caja.html`          | Consulta y cobro de pedidos |

Las páginas individuales de producto son, entre otras, `espresso.html`, `latte.html`, `cappuccino.html`, `mango-ref.html`, `baguette.html` y `pastel.html`.

## Estructura del proyecto

```text
Practica2/
├── index.html
├── index.mjs
├── comprar-producto.mjs
├── estilos.css
├── tienda.css
├── paginas de productos y categorías
└── Codigo-Exteno/
    ├── Ashley/
    │   └── Caja.mjs
    ├── David/
    │   ├── Concina.mjs
    │   └── Productos.mjs
    └── Funcionalidad/
        ├── Cliente.mjs
        └── Pedidos.mjs
```

## Módulos

### `index.mjs`

Es el punto de entrada de `cliente.html`, `cocina.html` y `caja.html`. Lee el atributo `data-page` del `body` y carga el módulo correspondiente.

### `Codigo-Exteno/David/Productos.mjs`

Define la clase `Producto`, el catálogo inicial, la búsqueda de productos y la persistencia de existencias.

Clave utilizada en `localStorage`: `cafe_existencias`.

### `Codigo-Exteno/Funcionalidad/Pedidos.mjs`

Gestiona la creación de pedidos, la adición y eliminación de productos, el cálculo de totales y el cierre de pedidos.

Claves utilizadas en `localStorage`:

- `cafe_pedidos`
- `cafe_pedidos_contador`

### `Codigo-Exteno/Funcionalidad/Cliente.mjs`

Renderiza el catálogo disponible, recupera el pedido abierto, muestra su resumen y permite enviarlo a caja.

### `Codigo-Exteno/David/Concina.mjs`

Controla la pantalla de cocina: alta, edición, eliminación y listado de productos.

### `Codigo-Exteno/Ashley/Caja.mjs`

Renderiza los pedidos guardados, calcula sus totales y permite marcar como pagados los pedidos abiertos.

## Ejecución

No se requieren dependencias externas ni instalación de paquetes. Como el proyecto utiliza módulos ES, se recomienda abrirlo mediante un servidor local desde esta carpeta:

```bash
python -m http.server 8000
```

Después, abrir:

```text
http://localhost:8000/index.html
```

También puede utilizarse la extensión **Live Server** de VS Code.

## Notas

- Los datos se guardan en el `localStorage` del navegador.
- El catálogo inicial se crea automáticamente cuando todavía no existen productos guardados.
- Los precios iniciales de bebidas y alimentos son valores definidos para la práctica; los souvenirs usan los precios mostrados en sus páginas.
- Para reiniciar los datos de prueba, borrar las claves `cafe_existencias`, `cafe_pedidos` y `cafe_pedidos_contador` desde las herramientas de desarrollo del navegador.
