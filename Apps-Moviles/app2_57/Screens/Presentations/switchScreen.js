// ===================================================
//                Zona de importaciones
// ===================================================

import { useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Switch, Pressable } from "react-native";

// ============= Componentes =============

// ------------- Separadores -------------

import { __ } from "../../Components/Elements/seprator";

// -------------  -------------

// ============= Componentes =============

// import {} from '';

// ===================================================
//                   Zona del MAIN
// ===================================================

export default function SwitchScreen() {
  const [on, setChange] = useState(false);
  const [count, setCount] = useState(0);

  return(
    <View style = {styles.container}>
      <Text style = {styles.title}> Practica 11 - Switch & Pressable </Text>
      <Switch
        value = {on}
        onValueChange = {(valor) => setChange(valor)}
      />
      <Text style = {styles.msg}> Es switch esta: {on ? 'Encendido' : 'Apagado'}</Text>
       
      <Pressable
        style = {styles.btn}
        onPress = {() => setCount(count + 1)}
      >
        <Text style = {styles.msgbtn}> Presioname </Text>
      </Pressable>

      <Text style = {styles.msg}> Se ha presionado: {count}</Text>


    </View>
  );
}

// ===================================================
//                   Zona de estilos
// ===================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  msg: {
    fontSize: 18,
    marginVertical: 15
  },
  btn: {
    backgroundColor: '#059669',
    padding: 15,
    borderRadius: 10,
    marginTop: 30
  },
  msgbtn: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  }
});
