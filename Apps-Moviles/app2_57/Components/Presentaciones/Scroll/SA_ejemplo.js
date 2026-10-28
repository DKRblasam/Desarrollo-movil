// ===================================================
//                Zona de importaciones
// ===================================================

import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, Button } from "react-native";

// ============= Componentes =============

// ------------- Separadores -------------

import { __ } from "../../Elements/seprator";

// ===================================================
//                   Zona del MAIN
// ===================================================

export default function SAContent() {
  const [msg, setMsg] = useState("Bienvenidos a nuestra practica");

  return (
    <SafeAreaView style={[StyleSheet.container]} edges={["top", "bottom"]}>
      <Text style={style.title}>Practica SafeArea</Text>
      <Text style={style.message}>{msg}</Text>

      <Button
        title="Change message"
        onPress={() =>
          setMsg(
            msg === "Esta es nuestra pagina" ? "Hii" : "Esta es nuestra pagina",
          )
        }
      />
    </SafeAreaView>
  );
}

// ===================================================
//                   Zona de estilos
// ===================================================

const style = StyleSheet.create({
  container: {
    backgroundColor: "#333",
    color: "blank",
    padding: 20,
    alignItems: "center",
    borderRadius: 10,
  },
  title: {
    color: "orange",
    fontFamily: "sans-serif",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  message: {
    textAlign: "center",
    fontSize: 13,
    marginBottom: 10,
  },
});
