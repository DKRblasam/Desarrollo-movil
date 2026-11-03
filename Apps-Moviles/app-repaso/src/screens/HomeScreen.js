// ===================================================
//                Zona de importaciones
// ===================================================

import { View, StyleSheet } from "react-native";


// ==================== Componentes ====================
// -------------------- Secciones --------------------

import CustomButton from "@components/CustomButton";


// -------------------- Estilos --------------------

import { colors } from "@constants/themes";


// ===================================================
//                Zona del Main
// ===================================================

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <CustomButton />
    </View>
  );
}



// ===================================================
//                Zona de estilos
// ===================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: colors.background,
  },
});