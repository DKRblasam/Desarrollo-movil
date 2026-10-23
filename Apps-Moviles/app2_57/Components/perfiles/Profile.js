
import { View, Text, Button, StyleSheet } from "react-native";
import { useState } from "react";

// Componentes
import { __ } from "../Elements/seprator";

// Componente de perfil estático
export const Me_prfle = () => {
  return (
    <View style={Styles.card}>
      <Text style={Styles.names}>
        Nombre: Blas Amador Ian David
      </Text>

      <Text style={Styles.carrer}>
        Carrera: ITIID
      </Text>

      <Text style={Styles.otherText}>
        Materia: Desarrollo de aplicaciones móviles
      </Text>

      <Text style={Styles.otherText}>
        Cuatrimestre: 4to
      </Text>
    </View>
  );
};

// Componente de perfil con botón para mostrar u ocultar datos
export const Me_perfil = ({ name, carrer, mat, cuatri, style}) => {
  const [mostbtn, setBtn] = useState(false);
  return (
    <View style={[Styles.card, style]}>
      <Text style={Styles.names}>
        Nombre: {name}
      </Text>

      {mostbtn && (
        <>
          <Text style={Styles.carrer}>
            Carrera: {carrer}
          </Text>

          <Text style={Styles.otherText}>
            Materia: {mat}
          </Text>

          <Text style={Styles.otherText}>
            Cuatrimestre: {cuatri}
          </Text>
        </>
      )}

      <__ />

      <Button
        title={mostbtn ? "Ocultar datos" : "Mostrar datos"}
        onPress={() => setBtn(!mostbtn)}
      />
    </View>
  );
};

// Estilos
const Styles = StyleSheet.create({
  names: {
    fontSize: 24,
    fontWeight: "700",
    textTransform: "uppercase",
  },

  carrer: {
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


