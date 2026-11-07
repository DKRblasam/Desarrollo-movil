import { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import { Spacer } from "@/components/common/Spacer";

// Tarjeta de perfil con botón para mostrar u ocultar los datos.
export const ProfileToggleCard = ({ name, career, subject, term, style }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={[styles.card, style]}>
      <Text style={styles.names}>Nombre: {name}</Text>

      {expanded && (
        <>
          <Text style={styles.career}>Carrera: {career}</Text>
          <Text style={styles.otherText}>Materia: {subject}</Text>
          <Text style={styles.otherText}>Cuatrimestre: {term}</Text>
        </>
      )}

      <Spacer />

      <Button
        title={expanded ? "Ocultar datos" : "Mostrar datos"}
        onPress={() => setExpanded((prev) => !prev)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  names: {
    fontSize: 24,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  career: {
    fontSize: 20,
    fontWeight: "100",
    fontFamily: "Roboto",
    color: "#335c67",
  },
  otherText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#586f7c",
  },
  card: {
    borderWidth: 3,
    borderColor: "#0f4c5c",
    borderRadius: 10,
    padding: 10,
    margin: 3,
  },
});
