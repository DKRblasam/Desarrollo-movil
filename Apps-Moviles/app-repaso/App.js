// ===================================================
//                Zona de importaciones
// ===================================================

import { SafeAreaProvider } from "react-native-safe-area-context";

// ==================== Componentes ====================
// -------------------- Tema --------------------

import { ThemeProvider } from "@constants/themes";

// -------------------- Pantallas --------------------

import RegisterScreen from "@/screens/register";

// ===================================================
//                   Zona del MAIN
// ===================================================

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <RegisterScreen />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
