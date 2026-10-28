// ===================================================
//                Zona de importaciones
// ===================================================

import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, Text } from "react-native";

// ============= Componentes =============

// ------------- Separadores -------------

import { __ } from "../../Components/Elements/seprator";

// ============= Componentes - Practica =============

// ------------- SafeArea - Component -------------
import SAContent from "../../Components/Presentaciones/Scroll/SA_ejemplo";

// ------------- ScrollView - Component -------------
import SVContent from "../../Components/Presentaciones/Scroll/SV_ejemplo";

// import {} from "";

// ===================================================
//                   Zona del MAIN
// ===================================================

export default function SafeScreen() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Practica 10 - SAfeArea & ScrollViw ew</Text>
        <Text style={styles.subtitle}>Equipo #1 - Dulce|Karla|Saul</Text>
      </View>

      <SAContent />
      <SVContent />
      
    </SafeAreaView>
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
