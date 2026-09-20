Analiza lo que voy a realizar; todavía no quiero que hagas nada. 

# Tienda funcional de productos

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

- `agregarPedido()`Permite agregar un nuevo pedido a la lista de pedidos.
   

### Elementos de JavaScript utilizados

- **let:** declarar variables cuyo valor puede cambiar.
   
- **const:** declarar variables cuyo valor no será reasignado.
   
- **Funciones:** Organizar y reutilizar las acciones relacionadas con los pedidos.
   
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

- **Objetos:** Representar cada producto y almacenar su información.
   
- **Propiedades:** Definir características como nombre, precio, categoría o cantidad.
   
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
   
- **Funciones:** Ejecutar acciones específicas, como mostrar productos o crear pedidos.
   
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

| Concepto: Uso dentro del proyecto  |                                         |
| ---------------------------------- | --------------------------------------- |
| `let`                              | Variables cuyo valor puede cambiar      |
| `const`                            | Variables que no serán reasignadas      |
| Funciones                          | Ejecutar y organizar acciones           |
| Arrays                             | Almacenar productos y pedidos           |
| Objetos                            | Representar productos y pedidos         |
| Propiedades                        | Almacenar los datos de cada objeto.     |
| `console.log()`                    | Mostrar información durante las pruebas |
| Template strings                   | Crear textos dinámicos                  |


## La idea fundamental
Piensa en productos.mjs y pedidos.mjs como módulos de datos/lógica, mientras que cliente.mjs, cocina.mjs y caja.mjs son módulos de operación.

````tree
                 LÓGICA
          ┌──────────────────┐
          │  productos.mjs   │
          │    pedidos.mjs   │
          └────────┬─────────┘
                   │
                   ▼
                MÓDULOS
     ┌─────────────┼─────────────┐
     ▼             ▼             ▼
 cliente.mjs   cocina.mjs    caja.mjs

````

## Flujo

````md
CLIENTE
   │
   │ selecciona productos
   ▼
pedidos.mjs
   │
   │ crea y guarda
   ▼
PEDIDO
   │
   ├──────────────► CAJA
   │                  │
   │                  └── calcula/muestra total
   │
   └──────────────► CLIENTE
                      │
                      └── muestra listado de pedidos

````

Y aquí hay una distinción importante:

El pedido se guarda una sola vez.

No necesitas tener:
**pedidos de Cliente**
**pedidos de Caja**

se dividen resp:
| Archivo | Responsabilidad |
|index.mjs |	Determina qué módulo ejecutar |
|productos.mjs |	Gestiona la información de productos|
|pedidos.mjs	| Gestiona la información de pedidos a|
|cliente.mjs	| Interfaz/acciones del cliente |
|cocina.mjs	| Interfaz/acciones de cocina |
|caja.mjs	| Interfaz/acciones de caja |