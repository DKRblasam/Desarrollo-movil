// ===================================================
//                Zona de importaciones
// ===================================================

import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

// ==================== Pantallas ====================

import SplashScreen from "@screens/SplashScreen";
import BooksScreen from "@screens/BooksScreen";

// ===================================================
//                   Zona del MAIN
// ===================================================

// Duración de la pantalla de bienvenida (2 segundos).
const SPLASH_MS = 2000;

export default function App() {
  // true  -> se muestra el splash
  // false -> se muestra la pantalla principal
  const [mostrarSplash, setMostrarSplash] = useState(true);

  // Se ejecuta una sola vez (arreglo de dependencias vacío): programa el
  // temporizador que oculta el splash. El return limpia el temporizador
  // si el componente se elimina antes de que termine.
  useEffect(() => {
    const temporizador = setTimeout(() => setMostrarSplash(false), SPLASH_MS);
    return () => clearTimeout(temporizador);
  }, []);

  return (
    <SafeAreaProvider>
      {mostrarSplash ? <SplashScreen /> : <BooksScreen />}
    </SafeAreaProvider>
  );
}
