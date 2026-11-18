// ===================================================
//                   Zona de importaciones
// ===================================================

import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  Alert,
  Platform,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";

import HeaderCoffee from "@components/sections/Header";
import TarjetaProducto from "@/components/sections/TarjetaProducto";

const mostrarAlerta = (titulo, mensaje) => {
  if (Platform.OS === "web") {
    `window.alert(${titulo}\n\n${mensaje})`;
  } else {
    Alert.alert(titulo, mensaje);
  }
};

const cafes = [
  {
    id: 1,
    nombre: "Café Americano",
    descripcion: "Café filtrado con agua caliente.",
    precio: 45,
  },
  {
    id: 2,
    nombre: "Hamburguesa",
    descripcion: "Hamburguesa con queso, lechuga, tomate y salsa especial.",
    precio: 120,
  },
  {
    id: 3,
    nombre: "sandwich de jamón y queso",
    descripcion: "Sandwich con jamón, queso, lechuga y tomate.",
    precio: 95,
  },
];

// ===================================================
//                   Zona del MAIN
// ===================================================

export default function Antojos() {
  const handClick = () => {

    mostrar

  };

  return (
    <View style={styles.screenContainer}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Antojos Express</Text>
      <HeaderCoffee />
      <FlatList
        data={cafes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <TarjetaProducto prod={item} />
            <Pressable
              style={styles.btn}
              onPress={() =>
                mostrarAlerta(
                  `Producto: ${item.nombre}`,
                  `\n\nDescripción: ${item.descripcion} \n Precio: $${item.precio}`,
                )
              }
            >
              <Text style={styles.BtnTxt}>Ver producto</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#faedcd",
  },
});
