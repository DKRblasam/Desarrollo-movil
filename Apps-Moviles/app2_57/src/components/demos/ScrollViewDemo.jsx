import { useState } from "react";
import { StyleSheet, ScrollView, View, Text, Button } from "react-native";

// Colores pastel de las 8 tarjetas (una por elemento).
const CARD_COLORS = [
  "#FFCDD2", // Rosa
  "#C8E6C9", // Verde
  "#BBDEFB", // Azul
  "#E1BEE7", // Lila
  "#FFF9C4", // Amarillo
  "#FFE0B2", // Naranja
  "#B2DFDB", // Turquesa
  "#F8BBD0", // Rosa claro
];

export function ScrollViewDemo() {
  const [scrollEnabled, setScrollEnabled] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ejemplo de ScrollView</Text>
      <Button
        title={
          scrollEnabled ? "Desactivar desplazamiento" : "Activar desplazamiento"
        }
        onPress={() => setScrollEnabled((enabled) => !enabled)}
      />
      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator
        scrollEnabled={scrollEnabled}
      >
        {CARD_COLORS.map((color, index) => (
          <Text key={color} style={[styles.card, { backgroundColor: color }]}>
            Tarjeta {index + 1}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#dee2ff",
    padding: 20,
  },
  title: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  list: {
    height: 200,
    flexGrow: 1,
    marginTop: 10,
  },
  content: {
    paddingBottom: 10,
  },
  card: {
    textAlign: "center",
    padding: 25,
    marginBottom: 5,
    borderRadius: 8,
  },
});
