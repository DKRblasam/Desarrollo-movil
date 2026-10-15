// ===================================================
//                Zona de importaciones
// ===================================================
import { View, Text, Image, Button } from "react-native";

// ===================================================
//                   Zona del MAIN
// ===================================================

export const Hi_frer = () => {
  return (
    <View>
      <Text> Hola React Native Componente propio compuesto</Text>
      <Image source={require('../assets/wave.png')} />
      <Button title="Presiona para saludar" />
    </View>
  );
};
