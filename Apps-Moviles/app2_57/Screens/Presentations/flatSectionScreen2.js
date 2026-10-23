// ===================================================
//                Zona de importaciones
// ===================================================

import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";

// ============= Componentes =============

// ------------- Separadores -------------

import { __ } from "../../Components/Elements/seprator";

// -------------  -------------

// ============= Componentes =============

// import {} from "";

// ===================================================
//                   Zona del MAIN
// ===================================================

export default function FlatSectionScreen2() {
  return (
    <View style={styles.container}>
      <Text>Practica ## - </Text>
      <Text>Equipo ##</Text>
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
    justifyContent: "",
    alignItems: "center",

    backgroundColor: "#cccccc",

    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
});
