# Introducción a JavaScript

Práctica introductoria para trabajar con JavaScript en el navegador y con
Node.js. El ejercicio separa una vista HTML, la lógica que interactúa con el
usuario y un archivo independiente para probar la ejecución desde Node.

## Archivos

| Archivo          | Descripción                                              |
| ---------------- | -------------------------------------------------------- |
| `vista.html`     | Página HTML que carga la práctica de JavaScript.         |
| `logica.mjs`     | Solicita el nombre del usuario y muestra un saludo.      |
| `Intro-node.mjs` | Imprime mensajes, calcula un promedio y mide un proceso. |

## Actividades

- Usar `prompt()` para capturar el nombre del usuario.
- Mostrar información con `console.log()`.
- Insertar un saludo en la página con `document.write()`.
- Declarar y operar variables numéricas.
- Calcular el promedio de dos edades.
- Medir la duración de un proceso con `console.time()` y `console.timeEnd()`.

## Ejecutar en el navegador

Desde la raíz del repositorio, inicia un servidor local sencillo:

```bash
python -m http.server 8000
```

Después abre:

```text
http://localhost:8000/Intro-JS/vista.html
```

También puede abrirse desde un servidor local de VS Code, como Live Server.

## Ejecutar con Node.js

Desde la raíz del repositorio:

```bash
node Intro-JS/Intro-node.mjs
```

El programa mostrará el saludo, el promedio de las edades y el tiempo empleado
por el proceso de prueba.
