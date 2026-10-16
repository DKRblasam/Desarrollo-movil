// ===================================================
//                Zona de importaciones
// ===================================================
import { View, Text, Image, Button } from "react-native";
import { useState, onPress } from "react";

// ============= Componentes =============

import { __ } from "../Elements/seprator";

// ===================================================
//                   Zona del MAIN
// ===================================================

export const Me_prfle = () => {
  return (
    <View>
      <Text> Nombre: Blas Amador Ian David</Text>
      <Text> Carrera: ITIID</Text>
      <Text> Materia: Desarrollo de aplicaciones móviles</Text>
      <Text> Cuatrimestre: 4to</Text>
    </View>
  );
};

export const Me_perfil = ({ name, carrer, mat, cuatri }) => {
  const [mostbtn, setBtn] = useState(false);

  return (
    <View>
      <Text> Nombre: {name}</Text>

      {mostbtn && (
        <>
          <Text> Carrera: {carrer}</Text>
          <Text> Materia: {mat}</Text>
          <Text> Cuatrimestre: {cuatri}</Text>
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
