import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/*Sirve para indicar que no se debe usar esta como principal*/}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Navegación de pila */}
      <Stack.Screen name="detalle" options={{ title: "Detalle de usuario" }} />
      <Stack.Screen
        name="actualiza"
        options={{ title: "Actualizar usuario" }}
      />
    </Stack>
  );
}
