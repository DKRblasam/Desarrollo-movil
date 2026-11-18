
import { View, Text, Image, StyleSheet } from "react-native";

export default function TarjetaProducto({prod}) {
  return (
    <View style={styles.cafeItem}>
      <Text style={styles.cafeName}>{prod.nombre}</Text>
      <Text style={styles.cafeDescription}>{prod.descripcion}</Text>
      <Text style={styles.cafePrice}>${prod.precio.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cafeItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cafeName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cafeDescription: {
    fontSize: 14,
    color: "#666",
  },
  cafePrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  cafeButton: {
    backgroundColor: "#e9edc9",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#2c3e50",
    color: "#2c3e50",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
});
