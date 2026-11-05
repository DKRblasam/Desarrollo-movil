import { View, Text, Image, Button } from "react-native";

export const ComposedGreeting = () => (
  <View>
    <Text> Hola React Native Componente propio compuesto</Text>
    <Image source={require("@/assets/wave.png")} />
    <Button title="Presiona para saludar" />
  </View>
);
