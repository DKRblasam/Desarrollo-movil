import { useState } from "react";
import { StyleSheet, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MESSAGE_WELCOME = "Bienvenidos a nuestra practica";
const MESSAGE_PAGE = "Esta es nuestra pagina";
const MESSAGE_HI = "Hii";

export function SafeAreaDemo() {
  const [msg, setMsg] = useState(MESSAGE_WELCOME);

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <Text style={styles.title}>Practica SafeArea</Text>
      <Text style={styles.message}>{msg}</Text>

      <Button
        title="Change message"
        onPress={() =>
          setMsg((current) =>
            current === MESSAGE_PAGE ? MESSAGE_HI : MESSAGE_PAGE,
          )
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#333",
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
