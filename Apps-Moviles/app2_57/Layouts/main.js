// ===================================================
//                Zona de importaciones
// ===================================================

import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

// ============= Componentes =============

// ------------- Separadores -------------

import { __ } from "./Components/Elements/seprator";

// -------------  -------------

// ============= Componentes =============

// import {} from '';

// ===================================================
//                   Zona del MAIN
// ===================================================

export default function Main() {
  return <View style={styles.container}></View>;
}

// ===================================================
//                   Zona de estilos
// ===================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",

    backgroundColor: "#cccccc",

    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
});
