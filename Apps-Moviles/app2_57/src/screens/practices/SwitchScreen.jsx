import { useState } from "react";
import { StyleSheet, View, Text, Switch, Pressable } from "react-native";

export default function SwitchScreen() {
  const [isOn, setIsOn] = useState(false);
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Practica 11 - Switch & Pressable </Text>
      <Switch value={isOn} onValueChange={setIsOn} />
      <Text style={styles.msg}>
        {" "}
        Es switch esta: {isOn ? "Encendido" : "Apagado"}
      </Text>

      <Pressable style={styles.btn} onPress={() => setCount((c) => c + 1)}>
        <Text style={styles.msgbtn}> Presioname </Text>
      </Pressable>

      <Text style={styles.msg}> Se ha presionado: {count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
  },
  msg: {
    fontSize: 18,
    marginVertical: 15,
  },
  btn: {
    backgroundColor: "#059669",
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
  },
  msgbtn: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
