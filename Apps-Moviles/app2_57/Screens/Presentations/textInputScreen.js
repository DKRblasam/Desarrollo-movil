// ============= Componentes =============
// -------------  -------------

// ===================================================
//                Zona de importaciones
// ===================================================

import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  Platform,
} from "react-native";

// ============= Componentes =============
// ------------- Separadores -------------

import { __ } from "../../Components/Elements/seprator";

// ===================================================
//                   Zona del MAIN
// ===================================================

// ------------- Funcionamiento - funciones base -------------

const mostrarAlerta = (titulo, mensaje) => {
  if (Platform.OS === "web") {
    `window.alert(${titulo}\n\n${mensaje}`;
  } else {
    Alert.alert(titulo, mensaje);
  }
};

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
      mostrarAlerta("Faltan datos", "Completa: " + faltantes.join(", "));
      return;
    }

    if (!correo.includes("@")) {
      mostrarAlerta("Correo inválido", "El correo debe contener @");
      return;
    }

    if (telefono.length !== 10) {
      mostrarAlerta("Teléfono inválido", "Debe tener 10 dígitos");
      return;
    }

    mostrarAlerta(
      "Datos registrados",
      `Nombre: ${nombre}\nCorreo: ${correo}\nTeléfono: ${telefono}`,
    );

    setNombre("");
    setCorreo("");
    setTelefono("");
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title]}>Practica #12 - TextInput & Alert</Text>
      <Text style={[styles.title2]}>Equipo #3: Tadeo | Rojo | Leo </Text>

      <Text style={styles.title2}>Registro de datos</Text>

      <__ />
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
        maxLength={10}
      />

      <Button style={styles.btn} title="Registrar" onPress={registrar} />
    </View>
  );
}

// ===================================================
//                   Zona de estilos
// ===================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "start",

    maxHeight: "auto",
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
  msginp: {
    fontSize: 18,
    color: "#8a00ed",
    marginVertical: 15,
  },
  btn: {
    marginTop: 15,
    borderRadius: 5,
  },
});
