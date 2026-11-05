// https://docs.expo.dev/guides/using-eslint/
const { defineConfig, globalIgnores } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  globalIgnores(["dist/*", "node_modules/*"]),
  expoConfig,
  {
    // Resuelve el alias "@/" leyendo jsconfig.json (misma fuente que Metro)
    settings: {
      "import/resolver": {
        typescript: { project: "./jsconfig.json" },
      },
    },
    rules: {
      // Los imports internos deben usar el alias "@/". Se permiten solo
      // los relativos del mismo directorio ("./archivo").
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../*"],
              message:
                'Usa imports absolutos con el alias "@/" en lugar de rutas relativas ("../").',
            },
          ],
        },
      ],
    },
  },
]);
