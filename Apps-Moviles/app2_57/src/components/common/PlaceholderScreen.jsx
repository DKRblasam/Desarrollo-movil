import { View, Text } from "react-native";

import { globalStyles } from "@/styles/globalStyles";

// Pantalla provisional para prácticas que aún no se han desarrollado.
export function PlaceholderScreen() {
  return (
    <View style={globalStyles.screenContainer}>
      <Text>Practica ## - </Text>
      <Text>Equipo ##</Text>
    </View>
  );
}
