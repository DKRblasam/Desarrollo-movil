// ===================================================
//                Zona de importaciones
// ===================================================

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";

// ============= Componentes =============

// ------------- Saludos -------------

import { Hi_htler } from "./Components/Saludos/Hi";
import { Hi_frer } from "./Components/Saludos/Hi2";

// ------------- Perfiles -------------

import { Me_prfle, Me_perfil } from "./Components/perfiles/Profile";

// ------------- Separadores -------------

import { __ } from "./Components/Elements/seprator";


// -------------  -------------

// ===================================================
//                   Zona del MAIN
// ===================================================

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hola mundo en React Native por Davo</Text>

      <Image source={require("./assets/wave.png")} />

      <__ />

      <Hi_htler> </Hi_htler>
      <__ />
      <Hi_frer />

      <__ />

      <Me_prfle />

      <__ />

      <Me_perfil
        name="Blas Amador Ian David"
        carrer="ITIID 223"
        mat="Desarrollo de Aplicaciones web"
        cuatri="4to cuatrimestre"
      />

      <StatusBar style="auto" />
    </View>
  );
}

// ===================================================
//                   Zona de estilos
// ===================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
