// ===================================================
//                Zona de importaciones
// ===================================================

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";

// ============= Componentes =============

// ------------- Saludos -------------

import { Hi_htler } from "../../Components/Saludos/Hi";
import { Hi_frer } from "../../Components/Saludos/Hi2";

// ------------- Perfiles -------------

import { Me_perfil } from "../../Components/perfiles/Profile";
import { Me_prfle } from "../../Components/perfiles/Prfle_pro";

// ------------- Separadores -------------

import { __ } from "../../Components/Elements/seprator";

// -------------  -------------

// ===================================================
//                   Zona del MAIN
// ===================================================

export default function CardScreen() {
  return (
    <View style={styles.container}>
      {/* <Text>Hola mundo en React Native por Davo</Text>
      <Image source={require("./assets/wave.png")} />
      <__ />
      <Hi_htler> </Hi_htler>
      <__ />
      <Hi_frer />       
      <Me_prfle />    
      */}

      <__ />
      <__ />
      <__ />
      <Me_perfil
        name="David"
        carrer="ITIID 223"
        mat="Desarrollo de Aplicaciones web"
        cuatri="4to cuatrimestre"
        style={styles.card1}
      />
      {/* <__ /> */}
      <Me_perfil
        name="Ian"
        carrer="ITIID 223"
        mat="Desarrollo de Aplicaciones web"
        cuatri="4to cuatrimestre"
        style={styles.card2}
      />
      {/* <__ /> */}
      <Me_perfil
        name="Juan"
        carrer="ITIID 223"
        mat="Desarrollo de Aplicaciones web"
        cuatri="4to cuatrimestre"
        style={styles.card3}
      />
      {/* <__ /> */}
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
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",

    backgroundColor: "#cccccc",

    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  card1: {
    backgroundColor: "#f2e9e4",
  },
  card2: {
    backgroundColor: "#d8e2dc",
  },
  card3: {
    backgroundColor: "#b0c4b1",
  },
});
