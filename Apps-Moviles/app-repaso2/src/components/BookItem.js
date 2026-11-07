// ===================================================
//                Zona de importaciones
// ===================================================

import { Text, View } from "react-native";

// -------------------- Estilos --------------------

import { bookStyles } from "@constants/styles";

// ===================================================
//                   Zona del MAIN
// ===================================================

// Tarjeta que dibuja un libro dentro de la FlatList.

export default function BookItem({ libro }) {
  return (
    <View style={bookStyles.card}>
      <Text style={bookStyles.title}>{libro.titulo}</Text>
      <Text style={bookStyles.text}>Autor: {libro.autor}</Text>
      <Text style={bookStyles.text}>Género: {libro.genero}</Text>
    </View>
  );
}
