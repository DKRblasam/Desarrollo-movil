# Starbucks Coffee Code

Aplicación web de una tienda Starbucks para consultar productos, crear pedidos,
administrar el catálogo y cobrar pedidos. La aplicación usa JavaScript modular,
`localStorage` y un servidor HTTP local de Node.js para probar correctamente los
módulos ES (`.mjs`).

## Funcionalidades

- Menú principal con categorías de bebidas, alimentos y souvenirs.
- Páginas de detalle con botón **Comprar**.
- Pedido abierto compartido entre las páginas de productos y Cliente.
- Menú dinámico con productos disponibles según stock.
- Promociones del 15% para bebidas y productos dulces.
- Cocina: agregar, editar, eliminar, buscar y filtrar productos.
- Caja: subtotal, IVA, total y cambio de estado a pagado.
- Persistencia en `localStorage`.

## Estructura actual

```text
Coffee-code/
├── index.html                         # Menú principal
├── package.json                       # Comandos del proyecto
├── server.mjs                         # Servidor HTTP para pruebas
├── pages/
│   ├── alimentos/                     # Categoría y productos de alimentos
│   ├── bebidas/                       # Categoría y productos de bebidas
│   ├── pedidos/
│   │   ├── cliente.html               # Pedido del cliente
│   │   ├── cocina.html                # Administración del catálogo
│   │   └── caja.html                  # Consulta y cobro de pedidos
│   └── souvenirs/                     # Productos y categorías de souvenirs
├── public/
│   └── images/                        # Imágenes del catálogo y logotipo
├── src/
│   ├── css/
│   │   ├── estilos.css                # Estilos generales
│   │   └── tienda.css                 # Estilos de la tienda
│   └── js/
│       ├── index.mjs                  # Enrutador por data-page
│       ├── Productos.mjs               # Catálogo y existencias
│       ├── Concina.mjs                 # Lógica e interfaz de Cocina
│       ├── comprar-producto.mjs        # Agrega productos al pedido
│       └── Codigo-Exteno/
│           ├── Funcionalidad/
│           │   ├── Cliente.mjs         # Menú, promociones y pedido
│           │   └── Pedidos.mjs         # Persistencia y operaciones
│           └── Ashley/
│               └── Caja.mjs            # Interfaz de Caja
└── Codigo-Anterior/                   # Versiones anteriores y pruebas
```

`Codigo-Anterior/` se conserva como referencia histórica. La aplicación actual
usa los archivos de `pages/`, `public/` y `src/`.

## Módulos principales

### Productos

[`src/js/Productos.mjs`](src/js/Productos.mjs) define `Producto`, carga el
catálogo inicial y ofrece búsquedas por nombre, precio, categoría y tipo.

### Pedidos

[`src/js/Codigo-Exteno/Funcionalidad/Pedidos.mjs`](src/js/Codigo-Exteno/Funcionalidad/Pedidos.mjs)
crea pedidos, agrega o elimina productos, calcula subtotal, IVA y total, y
guarda los datos en el navegador.

### Cliente

[`src/js/Codigo-Exteno/Funcionalidad/Cliente.mjs`](src/js/Codigo-Exteno/Funcionalidad/Cliente.mjs)
renderiza el menú disponible, las promociones y el resumen del pedido.

### Cocina

[`src/js/Concina.mjs`](src/js/Concina.mjs) administra productos y permite
filtrar por productos baratos, caros, bebidas, postres o buscar por nombre.

### Caja

[`src/js/Codigo-Exteno/Ashley/Caja.mjs`](src/js/Codigo-Exteno/Ashley/Caja.mjs)
consulta pedidos abiertos, muestra el desglose y permite marcarlos como pagados.

## Servidor local para pruebas

No abras las páginas con doble clic (`file://`). Los módulos ES y la navegación
entre páginas deben probarse mediante el servidor incluido.

### Requisitos

- Node.js 18 o superior.
- Navegador moderno.
- No se requieren dependencias externas ni `npm install`.

### Iniciar el servidor

Desde la carpeta `Coffee-code`:

```bash
npm start
```

También puedes iniciar directamente el archivo:

```bash
node server.mjs
```

El servidor mostrará la URL disponible, normalmente:

```text
Servidor activo en http://localhost:8000/
```

### Cambiar el puerto

En PowerShell:

```powershell
$env:PORT=8080; npm start
```

En CMD:

```bat
set PORT=8080 && npm start
```

En Linux, macOS o WSL:

```bash
PORT=8080 npm start
```

Si el puerto 8000 está ocupado y no se estableció `PORT`, el servidor prueba
automáticamente el siguiente puerto disponible.

### Detener el servidor

En la terminal donde está ejecutándose:

```text
Ctrl+C
```

### Rutas para probar

Con el puerto predeterminado:

| Pantalla       | URL                                                |
| -------------- | -------------------------------------------------- |
| Menú principal | `http://localhost:8000/`                           |
| Cliente        | `http://localhost:8000/pages/pedidos/cliente.html` |
| Cocina         | `http://localhost:8000/pages/pedidos/cocina.html`  |
| Caja           | `http://localhost:8000/pages/pedidos/caja.html`    |

## Pruebas manuales

1. Abre Cliente y confirma que aparecen el catálogo y las promociones.
2. Agrega un producto y verifica que se muestre en **Tu pedido**.
3. Confirma el pedido y abre Caja en otra pestaña.
4. Comprueba subtotal, IVA, total y estado `abierto`.
5. Marca el pedido como pagado y verifica el estado `pagado`.
6. Abre Cocina y prueba agregar, editar, eliminar, buscar y filtrar productos.
7. Recarga el navegador y confirma que los datos permanecen guardados.

## Persistencia y reinicio de pruebas

Los datos se almacenan en el `localStorage` del navegador:

- `cafe_existencias`: catálogo y stock.
- `cafe_pedidos`: pedidos guardados.
- `cafe_pedidos_contador`: siguiente identificador de pedido.

Para comenzar una prueba limpia, abre las herramientas de desarrollo del
navegador, entra en **Application/Almacenamiento > Local Storage**, selecciona
`http://localhost:8000` y elimina esas tres claves. Después recarga la página.

## Diagnóstico rápido

- **La página aparece vacía:** confirma que el servidor sigue activo y que la
  URL empieza por `http://localhost`.
- **No cargan los módulos:** no abras el HTML con `file://`; usa `npm start`.
- **El puerto está ocupado:** usa `PORT=8080 npm start` o el equivalente de tu
  terminal.
- **Aparecen datos viejos:** limpia las claves del `localStorage` indicadas
  arriba.
