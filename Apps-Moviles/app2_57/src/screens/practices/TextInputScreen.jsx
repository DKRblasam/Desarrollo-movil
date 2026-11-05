import { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";

import { Spacer } from "@/components/common/Spacer";
import { showAlert } from "@/utils/showAlert";

const PHONE_LENGTH = 10;

export default function TextInputScreen() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");

  const registrar = () => {
    const faltantes = [];
    if (nombre.trim() === "") faltantes.push("Nombre");
    if (correo.trim() === "") faltantes.push("Correo");
    if (telefono.trim() === "") faltantes.push("Teléfono");

    if (faltantes.length > 0) {
      showAlert("Faltan datos", "Completa: " + faltantes.join(", "));
      return;
    }

    if (!correo.includes("@")) {
      showAlert("Correo inválido", "El correo debe contener @");
      return;
    }

    if (!new RegExp(`^\\d{${PHONE_LENGTH}}$`).test(telefono)) {
      showAlert("Teléfono inválido", `Debe tener ${PHONE_LENGTH} dígitos`);
      return;
    }

    showAlert(
      "Datos registrados",
      `Nombre: ${nombre}\nCorreo: ${correo}\nTeléfono: ${telefono}`,
    );

    setNombre("");
    setCorreo("");
    setTelefono("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Practica #12 - TextInput & Alert</Text>
      <Text style={styles.title2}>Equipo #3: Tadeo | Rojo | Leo </Text>

      <Text style={styles.title2}>Registro de datos</Text>

      <Spacer />
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="numeric"
        maxLength={PHONE_LENGTH}
      />

      <Button title="Registrar" onPress={registrar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",

    width: "100%",

    margin: "auto",
    paddingTop: 40,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  title: {
    fontSize: 27,
    fontWeight: "bold",
    marginTop: 20,
    color: "#FF6B6B",
    textAlign: "center",
  },
  title2: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    color: "#7C3AED",
    textAlign: "center",
  },
  input: {
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#6D4AFF",
    borderRadius: 10,
    width: "100%",
  },
});
