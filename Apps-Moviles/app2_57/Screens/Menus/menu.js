// ===================================================
//                Zona de importaciones
// ===================================================

// ============= Funciones =============

// ------------- React -------------

import { useState } from "react";

// ============= Componentes =============

// ------------- Nativos -------------

import { StyleSheet, View, ScrollView, Button, Text } from "react-native";

// ------------- Expo -------------

import { StatusBar } from "expo-status-bar";

// ------------- Separadores -------------

import { __ } from "../../Components/Elements/seprator";

// ------------- Estilos -------------

import { gl_styles } from "../../styles/global";

// ============= Pantallas =============

import CardScreen from "../Presentations/cardScreen";
import SafeScreen from "../Presentations/safeScreen";
import SwitchScreen from "../Presentations/switchScreen";
import TextInputScreen from "../Presentations/textInputScreen";
import FlatSectionScreen from "../Presentations/flatSectionScreen";
import FlatSectionScreen2 from "../Presentations/flatSectionScreen2";
import ImageSplashScreen from "../Presentations/imageSplashScreen";
import ModalBottomSheetScreen from "../Presentations/modalBottomSheetScreen";

// ===================================================
//                   Zona del MAIN
// ===================================================

export default function MenuScreen() {
  const [screen, setScreen] = useState("menu");

  switch (screen) {
    case "cards":
      return <CardScreen />;

    case "safe":
      return <SafeScreen />;

    case "press":
      return <SwitchScreen />;

    case "input":
      return <TextInputScreen />;

    case "lists":
      return <FlatSectionScreen />;

    case "lists2":
      return <FlatSectionScreen2 />;

    case "image":
      return <ImageSplashScreen />;

    case "modal":
      return <ModalBottomSheetScreen />;
    case "menu":
    default:
      return (
        <View style={styles.container}>
          <__ />

          <Text style={gl_styles.title_menu}>Selecciona una opcion</Text>

          <__ />
          <Button
            title="Practica - Tarjetas"
            onclick={() => setScreen("cards")}
          />

          <__ />
          <Button
            title="Practica - SafeArea & Scrollviw"
            onclick={() => setScreen("safe")}
          />

          <__ />
          <Button
            title="Practica - Presseable & Switch"
            onclick={() => setScreen("press")}
          />

          <Text style={styles.title}>¡Explora el menú!</Text>
          <Text style={styles.subtitle}>
            Selecciona una práctica para comenzar 🚀
          </Text>

          <View style={styles.button}>
            <Button
              title="🃏  Práctica - Tarjetas"
              color="#7C3AED"
              onclick={() => setScreen("cards")}
            />
          </View>

          <View style={styles.button}>
            <Button
              title="📱  SafeAreaView & ScrollView"
              color="#2563EB"
              onclick={() => setScreen("safe")}
            />
            <Text style={styles.author}>Dulce Ayelen Perez Toribio</Text>
          </View>

          <View style={styles.button}>
            <Button
              title="👆  Pressable & Switch"
              color="#059669"
              onclick={() => setScreen("press")}
            />
            <Text style={styles.author}>Karen Hernández Sánchez</Text>
          </View>

          <View style={styles.button}>
            <Button
              title="⌨️  TextInput & Alert"
              color="#EA580C"
              onclick={() => setScreen("input")}
            />
            <Text style={styles.author}>Jesus Rojo Uribe</Text>
          </View>

          <View style={styles.button}>
            <Button
              title="📋  FlatList & SectionList"
              color="#DB2777"
              onclick={() => setScreen("lists")}
            />
            <Text style={styles.author}>Natalia Zarate Cabanillas</Text>
          </View>

          <View style={styles.button}>
            <Button
              title="🗂️  FlatList & SectionList (2)"
              color="#9333EA"
              onclick={() => setScreen("lists2")}
            />
            <Text style={styles.author}>Natalia Zarate Cabanillas</Text>
          </View>

          <View style={styles.button}>
            <Button
              title="🌄  ImageBackground & SplashScreen"
              color="#0891B2"
              onclick={() => setScreen("image")}
            />
            <Text style={styles.author}>Paloma Valeria Hurtado Guerrero</Text>
          </View>

          <View style={styles.button}>
            <Button
              title="🪟  Modal & Bottom Sheet"
              color="#C2410C"
              onclick={() => setScreen("modal")}
            />
            <Text style={styles.author}>Iancarlo Abreu Martinez</Text>
          </View>
        </View>
      );
  }
}

// ===================================================
//                   Zona de estilos
// ===================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#cccccc",

    paddingTop: 50,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
});
