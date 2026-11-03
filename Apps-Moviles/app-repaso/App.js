// ===================================================
//                Zona de importaciones
// ===================================================

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

// ==================== Componentes ====================
// -------------------- Styles --------------------
import { ThemeProvider, useTheme } from "./theme";

// -------------------- Pantallas --------------------

import HomeScreen from "@/screens/HomeScreen";
import regScree from "@/screens/register";

// ===================================================
//                Zona de importaciones
// ===================================================

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <regScreen />
        <StatusBar style="auto" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
  // return (
  //   <ThemeProvider>
  //     <Pantalla />
  //   </ThemeProvider>
  // );
  // return (
  //   <View style={styles.container}>
  //     <Text>Open up App.js to start working on your app!</Text>
  //     <StatusBar style="auto" />
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
