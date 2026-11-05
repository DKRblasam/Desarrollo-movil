# REFACTORING_REPORT.md

Proyecto: `app2_57` · Expo SDK 57 (`expo ~57.0.26`) · React Native 0.86.3 · React 19.2.3 · JavaScript (sin TypeScript) · pnpm · Node 22.

Este reporte describe únicamente lo que se ejecutó y verificó. Lo que no se pudo comprobar aparece en 8.8 y 8.9.

---

## 8.1 Resumen general

**Estado inicial**
- 21 archivos de código en carpetas con mayúsculas mezcladas (`Components/`, `Screens/`, `Layouts/`, `styles/`) y nombres como `seprator.jsx`, `Prfle_pro.js`, `SV_ejemplo.js`.
- 45 imports relativos (`../../Components/...`).
- Sin `.gitignore` (el zip incluía `.expo/` con logs), sin ESLint, sin `jsconfig.json`.
- Código muerto y archivos rotos: 4 archivos sin uso o inservibles, 1 pantalla con `export` ausente, un componente que no devolvía nada en `renderItem`.
- `expo-splash-screen` en `^58.0.13`, incompatible con SDK 57 (el SDK espera `~57.0.9`).
- El bundle del código original sí compilaba (Android y web). `expo-doctor`: 19/21 checks pasan; los 2 restantes necesitan red hacia `exp.host` y no se pudieron ejecutar aquí.
- El log de `.expo` mostraba un error de ejecución: `ReferenceError: Property 'sd' doesn't exist`. **No existe `sd` en el código entregado** (búsqueda con `grep -w`), así que no pude reproducirlo; probablemente era un error de tipeo ya corregido. Ver 8.9.

**Objetivos**: ordenar la arquitectura, migrar a imports absolutos con alias, corregir malas prácticas y bugs, sin cambiar funcionalidades.

**Resultado final**: 0 imports relativos hacia arriba (`../`), 30 imports con alias `@/`, ESLint sin errores ni advertencias, bundle Android y web exitoso, prueba de humo en navegador (web) con las 8 prácticas abriendo y volviendo al menú sin errores de consola.

---

## 8.2 Problemas identificados

### Errores y bugs
| # | Archivo original | Problema |
|---|---|---|
| 1 | `Screens/Presentations/textInputScreen.js` | `mostrarAlerta` en web ejecutaba una *template string suelta* (`` `window.alert(...` ``): **la alerta nunca se mostraba en web**. |
| 2 | `Screens/Presentations/flatSectionScreen.js` | Sin `export default` (el menú lo importaba como `ScreenFlat` → `undefined`); `renderItem` con llaves y sin `return` (no pinta nada); `PantallaContactos` sin `return`; `c.nombre.toLowerCase.includes(...)` (faltaban paréntesis); `alternarFavorito` nunca agregaba favoritos. Archivo duplicado e inservible. |
| 3 | `Screens/Menus/menu.js` y `Layouts/main.js` | `menu.js` usaba `onclick` (inexistente en RN; debe ser `onPress`). `main.js` importaba `./Components/...` (ruta inválida desde `Layouts/`). Ambos sin uso. |
| 4 | `textInputScreen.js` | `alignItems: "start"` y `maxHeight: "auto"` no son valores válidos de React Native; `<Button style=...>` (Button no acepta `style`). |
| 5 | `modalBottomSheetScreen.js` | El componente se llamaba `ModalBottomScreen`, distinto del archivo/import. |
| 6 | `package.json` | `expo-splash-screen ^58.0.13` fuera del rango del SDK 57 (`~57.0.9`). |
| 7 | `textInputScreen.js` | El teléfono validaba solo la longitud (`length !== 10`); con teclado numérico se podían colar caracteres no numéricos. |

### Malas prácticas
- Componente `Pestana` declarado **dentro** del render de `ScreenFlat` (se desmonta y remonta en cada render).
- Objetos `source` (`bgMain`, `logoApp`) recreados en cada render en `ImageSplashScreen`.
- `useRef(new Animated.Value(0)).current` leído durante el render (regla `react-hooks/refs`).
- `useNativeDriver: true` en web (genera advertencia en react-native-web).
- Funciones inline como `SectionSeparatorComponent={() => ...}` (componente nuevo en cada render).
- 8 estilos casi idénticos (`card1`…`card8`) en `SV_ejemplo.js`.
- Mismo contenedor de estilos copiado en 6 archivos; dos pantallas placeholder idénticas.
- Nombres ilegibles o con typos: `__`, `Hi_htler`, `Hi_frer`, `Me_prfle` (existía en **dos** archivos con distinta implementación), `seprator`, `carrer`, `mat`, `cuatri`.
- Imports sin usar en casi todos los archivos (`StatusBar`, `Image`, `Button`, `View`, `StyleSheet`, `__`…), bloques de comentarios decorativos vacíos y código comentado.
- Estado `screen` basado en un string mágico `"menu"`.

### Arquitectura
- Carpetas con mayúsculas inconsistentes y nombres por "zona" en lugar de por responsabilidad.
- Una **pantalla** (`Screen.js`) vivía en `Components/` y la lista de prácticas, los botones y la barra "Volver" estaban dentro de un único archivo de 377 líneas (`menupro.js`).
- Lógica del botón físico "atrás" mezclada con la vista.

### Rendimiento
- `catastico1.png` (1.6 MB) entraba al bundle solo porque un componente sin uso se importaba en `cardScreen.js`.
- Los problemas de re-render listados arriba.

### Importaciones y configuración
- 45 imports relativos con `../../`.
- Sin `jsconfig.json` ni alias; sin ESLint; sin `.gitignore`.

### Seguridad
- No se encontraron secretos, tokens ni claves en el código ni en `app.json`. No hay variables de entorno, autenticación ni almacenamiento de datos sensibles (no había nada que modificar).
- Riesgo de higiene: sin `.gitignore`, `.expo/` y un futuro `.env` podían subirse a GitHub.
- Las únicas peticiones externas son dos imágenes por `https` (`i.blogs.es`, `reactnative.dev`).

---

## 8.3 Reorganización de carpetas

**Estructura anterior**
```
App.js
Components/{Elements, Saludos, Presentaciones/{Flat,Scroll}, perfiles, sections}
Layouts/main.js
Screens/{Menus, Presentations}
styles/global.js
assets/
```

**Nueva estructura**
```
index.js                      ← entry (usa "@/App")
jsconfig.json  eslint.config.js  .gitignore
assets/                       ← se queda en la raíz (app.json la referencia)
src/
  App.js
  components/
    common/     Spacer, PlaceholderScreen
    demos/      SafeAreaDemo, ScrollViewDemo
    greetings/  SimpleGreeting, ComposedGreeting
    menu/       PracticeButton, BackBar
    profile/    ProfileToggleCard, ProfileHeaderCard
  hooks/        useHardwareBack
  navigation/   practices (registro de prácticas)
  screens/
    MenuScreen
    practices/  CardScreen, SafeScreen, SwitchScreen, TextInputScreen,
                ListsScreen, ListsShowcaseScreen, FlatSectionScreen2,
                ImageSplashScreen, ModalBottomSheetScreen
  styles/       globalStyles
  utils/        showAlert
```

**Justificación**: separación por responsabilidad (componentes reutilizables / pantallas / navegación / hooks / utilidades), minúsculas en carpetas y PascalCase en componentes. No se crearon `services/`, `types/`, `constants/` ni `config/` porque no hay API, tipos ni configuración que alojar; crearlas sería formalismo vacío. `navigation/` contiene un registro de datos, no una librería de navegación: el proyecto navega con estado local y no se añadió React Navigation ni Expo Router (ver 8.9).

**Mapa de archivos**

| Original | Nuevo |
|---|---|
| `App.js` | `src/App.js` |
| `Screens/Menus/menupro.js` | `src/screens/MenuScreen.jsx` + `src/components/menu/{PracticeButton,BackBar}.jsx` + `src/navigation/practices.js` + `src/hooks/useHardwareBack.js` |
| `Screens/Presentations/cardScreen.js` | `src/screens/practices/CardScreen.jsx` |
| `…/safeScreen.js` | `src/screens/practices/SafeScreen.jsx` |
| `…/switchScreen.js` | `src/screens/practices/SwitchScreen.jsx` |
| `…/textInputScreen.js` | `src/screens/practices/TextInputScreen.jsx` (+ `src/utils/showAlert.js`) |
| `…/flatSectionScreen2.js`, `modalBottomSheetScreen.js` | `FlatSectionScreen2.jsx`, `ModalBottomSheetScreen.jsx` (usan `PlaceholderScreen`) |
| `…/imageSplashScreen.js` | `src/screens/practices/ImageSplashScreen.jsx` |
| `Components/Presentaciones/Flat/Screen.js` | `src/screens/practices/ListsScreen.jsx` |
| `Components/Presentaciones/Flat/ScreenPro.js` | `src/screens/practices/ListsShowcaseScreen.jsx` |
| `Components/Presentaciones/Scroll/SA_ejemplo.js` | `src/components/demos/SafeAreaDemo.jsx` |
| `Components/Presentaciones/Scroll/SV_ejemplo.js` | `src/components/demos/ScrollViewDemo.jsx` |
| `Components/perfiles/Profile.js` (`Me_perfil`) | `src/components/profile/ProfileToggleCard.jsx` |
| `Components/perfiles/Prfle_pro.js` | `src/components/profile/ProfileHeaderCard.jsx` |
| `Components/Saludos/Hi.js`, `Hi2.js` | `src/components/greetings/SimpleGreeting.jsx`, `ComposedGreeting.jsx` |
| `Components/Elements/seprator.jsx` | `src/components/common/Spacer.jsx` |
| `styles/global.js` | `src/styles/globalStyles.js` |

---

## 8.4 Importaciones y alias

**Alias implementados** (en `jsconfig.json`):
```json
"paths": {
  "@/assets/*": ["./assets/*"],
  "@/*": ["./src/*"]
}
```
Con `@/*` → `src/*` ya existen `@/components`, `@/screens`, `@/hooks`, `@/navigation`, `@/utils`, `@/styles`; `@/assets` apunta a la carpeta raíz. No se crearon alias para `services`, `constants`, `types` ni `config` porque esas carpetas no existen.

**Archivos de configuración**
- `jsconfig.json` (nuevo): única fuente de verdad de los alias.
- **Babel**: no se creó `babel.config.js`. `babel-preset-expo` y Metro (Expo) leen los `paths` de `jsconfig.json`/`tsconfig.json` por sí mismos; añadir `babel-plugin-module-resolver` habría duplicado la configuración.
- **Metro**: no se creó `metro.config.js`, por la misma razón. Se comprobó empíricamente (ver 8.8), incluido `require("@/assets/…")`.
- `eslint.config.js` (nuevo): usa `jsconfig.json` como resolver de `import/no-unresolved` y fija la regla `no-restricted-imports` que **prohíbe `../`**. Verificado con un archivo de prueba (falló correctamente con una ruta relativa y con un alias inexistente).

**Importaciones migradas**: 45 relativas → 0 relativas hacia arriba; hoy hay 30 imports con `@/`. No quedó ningún `./`.

**Exports**: criterio uniforme: pantallas y `App` con `export default`; componentes, hooks y utilidades con *named exports*. Corregidos: `ScreenFlat` (default inexistente), `ModalBottomScreen` ≠ archivo, dos `Me_prfle` distintos.

**Excepciones**: ninguna.

---

## 8.5 Cambios realizados

**Creados**: `jsconfig.json`, `eslint.config.js`, `.gitignore`, `REFACTORING_REPORT.md`, `src/hooks/useHardwareBack.js`, `src/navigation/practices.js`, `src/utils/showAlert.js`, `src/components/common/PlaceholderScreen.jsx`, `src/components/menu/{PracticeButton,BackBar}.jsx`.

**Modificados**: `index.js` (import `@/App`), `package.json`, `pnpm-lock.yaml`; todo el código fuente (movido y limpiado, ver mapa en 8.3).

**Movidos / renombrados**: ver tabla 8.3.

**Eliminados**
| Archivo | Motivo |
|---|---|
| `Screens/Menus/menu.js` | Menú antiguo, reemplazado por `menupro`; sin referencias. Usaba `onclick` (no funciona). |
| `Screens/Presentations/flatSectionScreen.js` | Versión incompleta/rota de `Screen.js`; sin `export default`. Su única referencia (`ScreenFlat` en el menú) estaba sin usar. |
| `Layouts/main.js` | Stub vacío con import inválido; sin referencias. |
| `Components/sections/menu.js` | Archivo vacío (0 líneas). |
| `.expo/` | Caché y logs generados; ahora en `.gitignore`. |

**Funcionalidades afectadas**: ninguna eliminada. Cambios de comportamiento deliberados: (a) la alerta de `TextInputScreen` ahora sí aparece en web; (b) el teléfono exige 10 dígitos numéricos (antes solo longitud 10).

---

## 8.6 Mejoras técnicas

**Malas prácticas corregidas**
- `Pestana` sacado del render → componente `Tab` de módulo.
- Constantes de imágenes en `ImageSplashScreen` fuera del componente; toggle de blur con `setState` funcional.
- `Animated.Value` creado con `useState(() => …)` (sin leer `ref.current` en el render); `useNativeDriver` solo en nativo.
- `SectionSeparatorComponent` inline → componente `SectionGap` estable.
- Props renombradas con sentido: `carrer/mat/cuatri` → `career/subject/term`.
- Estado de navegación: `"menu"` string → `activeKey = null`.
- Imports sin uso, comentarios decorativos y código comentado eliminados.

**Arquitectura**: registro único de prácticas (`navigation/practices.js`), `MenuScreen` separado de sus botones y barra, hook `useHardwareBack` reutilizable, `PlaceholderScreen` y `globalStyles.screenContainer` compartidos (DRY: 6 contenedores idénticos → 1).

**Rendimiento**: `ScreenPro` calcula las secciones con `useMemo`; `ScrollViewDemo` genera 8 tarjetas con `map` en lugar de 8 estilos/nodos copiados. Al quitar el import muerto de `Prfle_pro`, **el bundle ya no incluye `catastico1.png` (1.6 MB), `portada.jpg` ni `wave.png`** (el bundle original listaba esos 3 assets; el nuevo, ninguno). No se usó `React.memo` en `PracticeButton`: son 8 elementos y no justifica la complejidad.

**Seguridad**: `.gitignore` con `.env*`, claves/certificados (`*.jks`, `*.p8`, `*.p12`, `*.key`, `*.pem`), `.expo/`, `node_modules/`, `dist/`, `ios/`, `android/`. Sin secretos encontrados. Validación de teléfono reforzada.

**Mantenibilidad**: ESLint con regla anti-`../` y resolución de alias; scripts `lint` y `bundle` en `package.json`.

---

## 8.7 Dependencias

| Cambio | Paquete | Versión | Justificación |
|---|---|---|---|
| Actualizada (alineada) | `expo-splash-screen` | `^58.0.13` → `~57.0.11` | El SDK 57 declara `~57.0.9` en `expo/bundledNativeModules.json`; la 58.x es de otro SDK y puede romper el build nativo. No se usa en el código (el splash de la práctica es propio); se conservó porque la plantilla de Expo la incluye y afecta al splash nativo. |
| Agregada (dev) | `eslint` | `^9.39.5` | El proyecto no tenía linter; el `AGENTS.md` pide `expo lint`. Se eligió 9.x por compatibilidad con la config flat de Expo (hay 10.x disponible; no se adoptó sin validar). |
| Agregada (dev) | `eslint-config-expo` | `~57.0.2` | Reglas oficiales de Expo (hooks, import, react). |
| Eliminadas | — | — | Ninguna. |

No se actualizó nada más. `npx expo install` no pudo usarse (requiere la API de Expo, sin red aquí), por eso se instaló con `pnpm add`, verificando las versiones contra `bundledNativeModules.json`.

---

## 8.8 Pruebas y validaciones

| Comando | Resultado |
|---|---|
| `pnpm install --frozen-lockfile` (original) | OK |
| `npx expo-doctor` (original) | 19/21 pasan. Fallan 2 por falta de red a `exp.host` (schema de `app.json` y React Native Directory). |
| `npx expo export --platform android --platform web` (original) | OK — Web 308 módulos, Android 610 módulos. |
| `npx eslint .` (final) | OK, 0 errores, 0 advertencias. (Antes de añadir la config hubo 1 aviso de `GRIS` sin usar y 1 error `react-hooks/refs`; ambos corregidos.) |
| Prueba negativa de ESLint | Detectó `../common/Spacer` y `@/nope/x`. |
| `npx expo export --platform android --platform web` (final) | OK — Web 307 módulos, Android 609 módulos. |
| Export con sonda que importa los componentes sin uso (`ProfileHeaderCard`, `ComposedGreeting`, `ListsShowcaseScreen`) | OK — resolvió `@/assets/wave.png`, `@/assets/profile/*` y empaquetó los 3 assets. |
| `npx expo-doctor` (final) | Mismo resultado: 19/21; los mismos 2 checks fallan por red. |
| Prueba de humo en Chromium (Playwright sobre el export web) | Menú muestra "8 prácticas disponibles"; las 8 prácticas abren y regresan con "‹ Menú"; tarjetas alternan datos; Switch/Pressable cuenta; TextInput dispara las 3 alertas esperadas (faltan datos, teléfono inválido, registro correcto); SectionList cambia de pestaña. Sin errores de consola ni de página. |

**Errores encontrados y resueltos**: lista en 8.2. **Corrección de lint**: `import/no-unresolved` con alias (se resolvió configurando el resolver sobre `jsconfig.json`).

**Validaciones pendientes / no ejecutadas**
- No hay pruebas automatizadas en el proyecto (no se creó ninguna) → `npm test` no aplica.
- **TypeScript**: el proyecto es JavaScript; no hay `tsc` que ejecutar. No se migró a TS por ser un cambio de alcance mayor.
- **No se probó en Android/iOS reales ni emulador**; solo se generó el bundle Android (Hermes) y se ejecutó la versión web. No se generó bundle iOS.
- No se arrancó `expo start` de forma interactiva; el empaquetado de Metro se validó con `expo export`.
- Los 2 checks de `expo-doctor` que dependen de red quedan por correr en tu máquina.

---

## 8.9 Problemas pendientes

1. **`ReferenceError: Property 'sd' doesn't exist`** (aparece dos veces en `.expo/dev/logs/start.log`): no existe en el código actual. Si reaparece, copia el stack completo; sin él no es posible localizar la causa.
2. **Código alternativo sin usar (se conservó a propósito)**: `ListsShowcaseScreen`, `ProfileHeaderCard`, `SimpleGreeting`, `ComposedGreeting`. Son versiones/variantes tuyas que no están enlazadas al menú; bórralas si ya no las necesitas. `ListsScreen` y `ListsShowcaseScreen` duplican datos y lógica (versión simple vs. versión estilizada); conviene quedarse con una y unificarlas cuando decidas cuál mostrar.
3. **`BackBar` y `MenuScreen` usan `paddingTop: 50` fijo** en vez de `useSafeAreaInsets()`; en dispositivos con otro notch quedará con distinto espacio. No se cambió para no alterar el diseño visible.
4. **Validación de correo** solo comprueba que haya `@`. Endurecerla cambiaría el mensaje y el comportamiento actual.
5. **`AGENTS.md`** (plantilla de Expo) indica Expo Router en `src/app/`; el proyecto usa navegación por estado. No se migró a Expo Router (nueva dependencia y cambio de comportamiento). El `AGENTS.md` quedó intacto.
6. **`expo-splash-screen`** no se importa en ningún archivo; confirma si lo quieres o si puedes retirarlo.
7. **Imágenes remotas** en `ImageSplashScreen` (dependen de dos dominios externos); sin manejo de error de carga.
8. **Nomenclatura mixta**: identificadores internos de `ListsScreen`/`ListsShowcaseScreen` siguen en español (`PantallaTareas`, `COLORES`…); los nombres públicos nuevos están en inglés. Unificarlo es cosmético y se dejó fuera para no inflar el cambio.
9. `eslint` 10.x y `eslint-config-expo` 58.x existen; no se adoptaron sin validar contra SDK 57.

---

## 8.10 Justificación técnica (cambios relevantes)

| Qué | Por qué / problema | Beneficio |
|---|---|---|
| Alias `@/` en `jsconfig.json` y sin config Babel/Metro | Había 45 imports `../../`. Expo ya resuelve `paths` nativamente; una segunda config sería redundante y propensa a contradecirse. | Imports legibles y movibles; una sola fuente de verdad, validada por Metro y por ESLint. |
| Regla `no-restricted-imports` (`../*`) | La convención se perdería sin automatizar. | El linter impide volver a imports relativos hacia arriba. |
| Reorganización a `src/` por responsabilidad | Carpetas por "zona", pantallas dentro de `Components/`, nombres con typos. | Estructura predecible; agregar una práctica = un archivo + una entrada en `practices.js`. |
| `MenuScreen` dividido + `useHardwareBack` | Archivo de 377 líneas con datos, vista, lógica de Android y estilos. | Responsabilidades separadas; hook reutilizable con limpieza de suscripción. |
| `showAlert` en `utils/` | La rama web era una string suelta (bug). | Alertas funcionan en web y nativo; reutilizable. |
| Validación `^\d{10}$` | `length === 10` aceptaba caracteres no numéricos. | El mensaje "10 dígitos" ahora es verdadero. |
| `Tab` fuera del render, `useMemo`, `SectionGap`, constantes fuera del componente | Componentes y objetos nuevos en cada render. | Sin remontajes ni recargas de imagen innecesarias. |
| `PlaceholderScreen` + `globalStyles.screenContainer` | Mismo bloque de estilos en 6 archivos. | DRY, un solo lugar de cambio. |
| Eliminar `menu.js`, `flatSectionScreen.js`, `Layouts/main.js`, `sections/menu.js` | Sin referencias; rotos o vacíos (verificado por búsqueda de imports). | Menos ruido; sin riesgo de importar código roto. |
| `expo-splash-screen` → `~57.0.11` | Versión de otro SDK. | Compatibilidad con SDK 57; evita fallos de build nativo. |
| `.gitignore` | No existía. | Evita subir `.expo/`, `node_modules/`, secretos y builds. |
| Quitar import muerto de `Prfle_pro` | Metraba 1.6 MB de imágenes al bundle sin mostrarlas. | Bundle más ligero (verificado: el export final no lista assets). |
