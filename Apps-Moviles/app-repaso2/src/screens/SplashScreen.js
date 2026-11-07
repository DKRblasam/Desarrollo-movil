// ===================================================
//                Zona de importaciones
// ===================================================

import { Image, Text, View, ActivityIndicator, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";

// -------------------- Estilos --------------------

import { splashStyles } from "@constants/styles";

// ===================================================
//                Zona del Main
// ===================================================

// Pantalla de bienvenida. Solo dibuja; quien decide cuándo se muestra
// y cuándo se oculta (2 segundos) es App.js mediante el estado.

export default function SplashScreen() {
  return (
    <View style={splashStyles.container}>
      <StatusBar style="light" />
      <Image
        source={require("../../assets/logo.png")}
        style={splashStyles.logo}
        resizeMode="contain"
      />
      <ActivityIndicator
        size={Platform.OS === "ios" ? "large" : 100}
        color="#FF9FCC"
        style={{
          transform: [{ scale: Platform.OS === "ios" ? 3 : 1 }],
          margin: Platform.OS === "ios" ? 25 : 0,
          marginBottom: 40,
        }}
      />
      <Text style={splashStyles.title}>Registro de Libros Leídos</Text>
      <Text style={splashStyles.subtitle}>Bienvenido</Text>
    </View>
  );
}
