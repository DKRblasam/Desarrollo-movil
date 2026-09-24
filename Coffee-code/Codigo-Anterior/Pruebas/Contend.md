# Tienda funcional de productos - Parte 1

## 1. Objetivo general

Desarrollar una tienda funcional de productos que permita gestionar los productos y pedidos mediante diferentes módulos:

- **Caja:** gestión de pedidos y cálculo del total.
    
- **Cocina:** administración de productos.
    
- **Cliente:** consulta de productos y visualización de pedidos.
    

## 2. Funcionalidades principales

La página deberá permitir realizar las siguientes acciones:

- Mostrar los productos disponibles.
    
- Agregar productos a un pedido.
    
- Guardar pedidos.
    
- Mostrar los pedidos realizados por el cliente.
    
- Agregar, editar y eliminar productos.
    
- Calcular el total acumulado de los pedidos.
    

---

# 3. Investigación de contenidos

## 3.1. Caja

### Objetivo

Crear un módulo encargado de gestionar los pedidos realizados por los clientes y calcular su total.

### Gestión de pedidos

- Crear pedidos.
    
- Agregar productos al pedido.
    
- Mostrar la lista de productos seleccionados.
    
- Calcular el total acumulado.
    
- Guardar los pedidos.
    
- Mostrar los pedidos realizados.
    

### Función principal

- `agregarPedido()`: permite agregar un nuevo pedido a la lista de pedidos.
    

### Elementos de JavaScript utilizados

- **let:** declarar variables cuyo valor puede cambiar.
    
- **const:** declarar variables cuyo valor no será reasignado.
    
- **Funciones:** organizar y reutilizar las acciones relacionadas con los pedidos.
    
- **Arrays:** almacenar productos y pedidos.
    

---

## 3.2. Cocina

### Objetivo

Crear un módulo para administrar los productos disponibles en la tienda.

### Gestión de productos

- **Agregar:** registrar nuevos productos.
    
- **Editar:** modificar la información de un producto existente.
    
- **Eliminar:** quitar productos de la lista.
    
- **Listar:** mostrar todos los productos disponibles.
    

### Elementos de JavaScript utilizados

- **Objetos:** representar cada producto y almacenar su información.
    
- **Propiedades:** definir características como nombre, precio, categoría o cantidad.
    
- **Arrays:** almacenar y administrar la colección de productos.
    

### Ejemplo de estructura de un producto

```javascript
const producto = {
    nombre: "Café americano",
    precio: 35,
    categoria: "Bebidas"
};
```

---

## 3.3. Cliente

### Objetivo

Crear una interfaz que permita al cliente consultar los productos disponibles y revisar sus pedidos.

### Gestión de productos y pedidos

- Mostrar un menú llamativo.
    
- Consultar los productos disponibles.
    
- Mostrar información de los productos.
    
- Crear un pedido.
    
- Consultar la lista de pedidos realizados.
    

### Elementos de JavaScript utilizados

- **console.log():** mostrar información durante el desarrollo y las pruebas.
    
- **Funciones:** ejecutar acciones específicas, como mostrar productos o crear pedidos.
    
- **Template strings:** generar textos dinámicos utilizando información almacenada en variables y objetos.
    

### Ejemplo de template string

```javascript
const nombre = "Café americano";
const precio = 35;

console.log(`Producto: ${nombre} - Precio: $${precio}`);
```

---

# 4. Organización general del proyecto

El funcionamiento de la tienda puede dividirse en tres módulos principales:

```map
TIENDA
│
├── Cliente
│   ├── Consultar productos
│   ├── Crear pedido
│   └── Consultar pedidos
│
├── Cocina
│   ├── Agregar productos
│   ├── Editar productos
│   ├── Eliminar productos
│   └── Listar productos
│
└── Caja
    ├── Recibir pedidos
    ├── Agregar productos al pedido
    ├── Calcular total
    ├── Guardar pedidos
    └── Mostrar pedidos
```

## 5. Conceptos de JavaScript utilizados

| Concepto         | Uso dentro del proyecto                 |
| ---------------- | --------------------------------------- |
| `let`            | Variables cuyo valor puede cambiar      |
| `const`          | Variables que no serán reasignadas      |
| Funciones        | Ejecutar y organizar acciones           |
| Arrays           | Almacenar productos y pedidos           |
| Objetos          | Representar productos y pedidos         |
| Propiedades      | Almacenar los datos de cada objeto      |
| `console.log()`  | Mostrar información durante las pruebas |
| Template strings | Crear textos dinámicos                  |

## 6. Link relacionado

- [[Investigacion_Coffe]]

*Carpetas*: 
`Practica2/Codigo-Exteno/David/`


---
---


# Tienda con más funcionalidades - Parte 2

## Caja

### Objetivo

Ampliar el módulo de caja para calcular:

- Subtotal.
- IVA.
- Total.

### Investigar

- `reduce()`
- Desestructuración (*destructuring assignment*)

### Aplicación

- `reduce()` se utilizará para acumular el precio de los productos del pedido.
- La desestructuración permitirá obtener directamente propiedades como `precio` y `cantidad`.



---
-----



## Cocina

### Objetivo

Ampliar la gestión de productos para permitir búsquedas y clasificaciones.

### Funcionalidades

- Buscar productos baratos.
- Buscar productos caros.
- Filtrar bebidas.
- Filtrar postres.
- Buscar un producto específico.

### Investigar

- `filter()`: [[Investigacion_coffe_2#^5d6e71]]
- `find()`

### Aplicación

- `filter()` se utilizará para obtener grupos de productos que cumplan una condición.
- `find()` se utilizará para localizar un producto específico.

---

## Cliente

### Objetivo

Mejorar la presentación de los productos mediante información dinámica.

### Funcionalidades

- Mostrar un menú dinámico.
- Mostrar promociones disponibles para el cliente.
- Mostrar únicamente productos disponibles según su stock.

### Investigar

- `map()`
- `forEach()`

### Aplicación

- `map()` se utilizará para transformar los datos de los productos en información que pueda mostrarse al cliente.
- `forEach()` se utilizará para recorrer los elementos y ejecutar acciones sobre cada uno.

---

## 7. Relación entre módulos y métodos

| Módulo | Necesidad | Método o concepto |
|---|---|---|
| Caja | Calcular subtotal | `reduce()` |
| Caja | Obtener propiedades de productos | Desestructuración |
| Cocina | Filtrar productos | `filter()` |
| Cocina | Buscar un producto | `find()` |
| Cliente | Crear información para el menú | `map()` |
| Cliente | Recorrer y mostrar productos | `forEach()` |

## 8. Flujo general de la Parte 2

```text
Productos
   │
   ├── Cocina
   │   ├── filter() → clasificar productos
   │   └── find() → buscar producto
   │
   ├── Caja
   │   ├── reduce() → subtotal
   │   ├── IVA
   │   └── total
   │
   └── Cliente
       ├── filter() → productos disponibles
       ├── map() → preparar información
       └── forEach() → mostrar información
```

## 9. Resultado esperado

Al finalizar la Parte 2, la tienda deberá contar con una gestión más dinámica de los productos y pedidos. El módulo de Caja podrá calcular el subtotal, IVA y total. Cocina podrá clasificar y buscar productos, mientras que Cliente podrá mostrar un menú dinámico considerando el stock y las promociones.
