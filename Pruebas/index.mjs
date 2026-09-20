// index.mjs

              // ===================================================
              //   index.mjs: determina qué módulo se ejecuta
              // ===================================================

import { initCliente, renderCliente } from "./cliente.mjs";
import { initCocina, renderCocina } from "./cocina.mjs";
import { initCaja, renderCaja } from "./caja.mjs";

// Cada módulo sabe cómo "repintarse" cuando se activa su pestaña
const modulos = {
  cliente: renderCliente,
  cocina: renderCocina,
  caja: renderCaja,
};

function mostrarModulo(nombre) {
  document.querySelectorAll(".panel").forEach((panel) => {
    panel.classList.toggle("activo", panel.id === `panel-${nombre}`);
  });

  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("activo", tab.dataset.modulo === nombre);
  });

  modulos[nombre]();
}

function iniciarApp() {
  // Cada módulo conecta sus propios listeners una sola vez
  initCliente();
  initCocina();
  initCaja();

  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => mostrarModulo(tab.dataset.modulo));
  });

  // Módulo inicial al abrir la página
  mostrarModulo("cliente");
}

document.addEventListener("DOMContentLoaded", iniciarApp);
