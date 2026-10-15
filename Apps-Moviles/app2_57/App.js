// ===================================================
//                Zona de importaciones
// ===================================================

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";

import { Hi_htler } from "./Components/Hi";
import { Hi_frer } from "./Components/Hi2";
import { Me_prfle } from "./Components/Prfle_pro";

// ===================================================
//                   Zona del MAIN
// ===================================================

export default function App() {
  return (
    <View style={styles.container}>

      <Text>Hola mundo en React Native por Davo</Text>
      
      

      <Image 
        source={require("./assets/wave.png")} 
      />

      <Hi_htler> </Hi_htler>
      <Hi_frer />

      <Me_prfle />

      


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
