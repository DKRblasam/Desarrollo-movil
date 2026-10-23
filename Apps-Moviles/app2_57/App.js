// ===================================================
//                Zona de importaciones
// ===================================================

import { StyleSheet, View, Text } from "react-native";

// ============= Componentes =============

// ------------- Separadores -------------

import { __ } from "./Components/Elements/seprator";

// ============= Pantallas =============

// ------------- Pantalla de menu -------------

import MenuScreen from "./Screens/Menus/menu";

// ===================================================
//                   Zona del MAIN
// ===================================================

export default function App() {
  return (
    <View style={styles.container}>
      <MenuScreen />
    </View>
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
