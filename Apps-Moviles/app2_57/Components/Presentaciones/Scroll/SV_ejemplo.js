// ===================================================
//                Zona de importaciones
// ===================================================

import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, ScrollView, View, Text, Button } from "react-native";

// ============= Componentes =============

// ------------- Separadores -------------

import { __ } from "../../Elements/seprator";

// ===================================================
//                   Zona del MAIN
// ===================================================

export default function SVContent() {
  const [slide, setSlid] = useState(true);

  return (
    <View style={[style.container]}>
      <Text style={style.title}>Ejemplo de ScrollView</Text>
      <Button
        title={slide ? "Desactivar desplazamiento" : "Activar desplazamiento"}
        onclick={() => setSlid(!slide)}
      />
      <ScrollView
        style={style.lista}
        contentContainerStyle={style.content}
        showsVerticalScrollIndicator={true}
        scrollEnabled={slide}
      >
        <Text style={style.card1}>Tarjeta 1</Text>
        <Text style={style.card2}>Tarjeta 2</Text>
        <Text style={style.card3}>Tarjeta 3</Text>
        <Text style={style.card4}>Tarjeta 4</Text>
        <Text style={style.card5}>Tarjeta 5</Text>
        <Text style={style.card6}>Tarjeta 6</Text>
        <Text style={style.card7}>Tarjeta 7</Text>
        <Text style={style.card8}>Tarjeta 8</Text>
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "#dee2ff",
    fontFamily: ["system-ui", "Lucida Sans", "-apple-system"],
    padding: 20,
  },
  title: {
    fontFamily: "Roboto",
    fontWeight: "bolder",
    textAlign: "center",
    marginBottom: 10,
  },
  lista: {
    height: 200,
    flexGrow: 1,
    marginTop: 10,
  },
  content: {
    paddingBottom: 10,
  },
  card1: {
    backgroundColor: "#FFCDD2", // Rosa pastel
    padding: 25,
    marginBottom: 5,
    borderRadius: 8,
    textAlign: "center",
  },
  card2: {
    textAlign: "center",
    backgroundColor: "#C8E6C9", // Verde pastel
    padding: 25,
    marginBottom: 5,
    borderRadius: 8,
  },
  card3: {
    textAlign: "center",
    backgroundColor: "#BBDEFB", // Azul pastel
    padding: 25,
    marginBottom: 5,
    borderRadius: 8,
  },
  card4: {
    textAlign: "center",
    backgroundColor: "#E1BEE7", // Lila pastel
    padding: 25,
    marginBottom: 5,
    borderRadius: 8,
  },
  card5: {
    textAlign: "center",
    backgroundColor: "#FFF9C4", // Amarillo pastel
    padding: 25,
    marginBottom: 5,
    borderRadius: 8,
  },
  card6: {
    textAlign: "center",
    backgroundColor: "#FFE0B2", // Naranja pastel
    padding: 25,
    marginBottom: 5,
    borderRadius: 8,
  },
  card7: {
    textAlign: "center",
    backgroundColor: "#B2DFDB", // Turquesa pastel
    padding: 25,
    marginBottom: 5,
    borderRadius: 8,
  },
  card8: {
    textAlign: "center",
    backgroundColor: "#F8BBD0", // Rosa pastel claro
    padding: 25,
    marginBottom: 5,
    borderRadius: 8,
  },
});
