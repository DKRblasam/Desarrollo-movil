import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

export default function ActivityScreen() {
  const [cargando, setCargando] = useState(false);
  const [esGrande, setEsGrande] = useState(false);
  const [cambiarColor, setCambiarColor] = useState(false);

  const handleEnviar = () => {
    setCargando(true);
    setTimeout(() => setCargando(false), 4000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={20}
      style={styles.container}
    >
      <TextInput placeholder="Escribe algo..." style={styles.input} />

      <View style={styles.actionContainer}>
        {cargando ? (
          <ActivityIndicator
            size={esGrande ? "large" : "small"}
            color={cambiarColor ? "#00bfff" : "#0000bb"}
          />
        ) : (
          <Button title="Enviar" onPress={handleEnviar} />
        )}
      </View>

      <View style={styles.SwitchBox}></View>
      <View style={styles.Switchrow}></View>
      <View style={styles.SwitchText}>
        <Text>Hacer mas Grande</Text>
        <Switch value={esGrande} onValueChange={setEsGrande} />
      </View>
      <View style={styles.Switchrow}>
        <Text>Cambiar Color</Text>
        <Switch value={cambiarColor} onValueChange={setCambiarColor} />
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  action: {
    marginBottom: 20,
    height: 40,
    justifyContent: "center",
  },
  SwitchBox: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    backgroundColor: "#fff",
  },
  Switchrow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  SwitchText: {
    fontSize: 16,
  },
});
