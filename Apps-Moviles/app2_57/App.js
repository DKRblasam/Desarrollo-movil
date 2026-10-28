// ===================================================
//                Zona de importaciones
// ===================================================

import { StyleSheet, View, Text } from "react-native";

// ============= Componentes =============

// ------------- Separadores -------------

import { __ } from "./Components/Elements/seprator";

// ============= Pantallas =============

// ------------- Pantalla de menu -------------

// import MenuScreen from "./Screens/Menus/menupro";
// import ScreenFlat from "./Screens/Presentations/flatSectionScreen";
import MenuScreen from "./Screens/Menus/menupro";

// ===================================================
//                   Zona del MAIN
// ===================================================

import { SafeAreaProvider } from "react-native-safe-area-context";
export default function App() {
  return (
    <SafeAreaProvider>
      <MenuScreen />
    </SafeAreaProvider>
  );
}

// ===================================================
//                   Zona de estilos
// ===================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "col",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#cccccc",

    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
});
