// ===================================================
//                Zona de importaciones
// ===================================================

// ============= Funciones =============

// ------------- React -------------

import { useState } from "react";

// ============= Componentes =============

// ------------- Nativos -------------

import { StyleSheet, View, Text, ScrollView, Pressable } from "react-native";

// ------------- Expo -------------

import { StatusBar } from "expo-status-bar";

// ------------- Separadores -------------

import { __ } from "../../Components/Elements/seprator";

// ------------- Estilos -------------

import { gl_styles } from "../../styles/global";

// ============= Pantallas =============

import { CardScreen } from "../Presentations/cardScreen";
import { SafeScreen } from "../Presentations/safeScreen";
import { SwitchScreen } from "../Presentations/switchScreen";
import { TextInputScreen } from '../Presentations/textInputScreen';
import { FlatSectionScreen } from '../Presentations/flatSectionScreen';
import { FlatSectionScreen2 } from '../Presentations/flatSectionScreen2';
import { ImageSplashScreen } from "../Presentations/imageSplashScreen";
import { ModalBottomSheetScreen } from "../Presentations/modalBottomSheetScreen";

// ===================================================
//                   Zona del MAIN
// ===================================================

const PRACTICES = [
  {
    id: "cards",
    icon: "🃏",
    title: "Tarjetas",
    subtitle: "Componentes y diseño",
    color: "#7C3AED",
    author: "Práctica general",
  },
  {
    id: "safe",
    icon: "📱",
    title: "SafeAreaView & ScrollView",
    subtitle: "Áreas seguras y desplazamiento",
    color: "#2563EB",
    author: "Dulce Ayelen Perez Toribio",
  },
  {
    id: "press",
    icon: "👆",
    title: "Pressable & Switch",
    subtitle: "Interacciones y controles",
    color: "#059669",
    author: "Karen Hernández Sánchez",
  },
  {
    id: "input",
    icon: "⌨️",
    title: "TextInput & Alert",
    subtitle: "Entradas de texto y alertas",
    color: "#EA580C",
    author: "Jesus Rojo Uribe",
  },
  {
    id: "lists",
    icon: "📋",
    title: "FlatList & SectionList",
    subtitle: "Listas dinámicas · Exposición 1",
    color: "#DB2777",
    author: "Natalia Zarate Cabanillas",
  },
  {
    id: "lists2",
    icon: "🗂️",
    title: "FlatList & SectionList",
    subtitle: "Listas dinámicas · Exposición 2",
    color: "#9333EA",
    author: "Natalia Zarate Cabanillas",
  },
  {
    id: "image",
    icon: "🌄",
    title: "ImageBackground & SplashScreen",
    subtitle: "Fondos e inicio de la aplicación",
    color: "#0891B2",
    author: "Paloma Valeria Hurtado Guerrero",
  },
  {
    id: "modal",
    icon: "🪟",
    title: "Modal & Bottom Sheet",
    subtitle: "Ventanas emergentes y paneles",
    color: "#C2410C",
    author: "Iancarlo Abreu Martinez",
  },
];

export default function MenuScreen() {
  const [screen, setScreen] = useState("menu");

  // Redirecciones a cada práctica
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
          <StatusBar style="light" />

          <View style={styles.header}>
            <Text style={styles.eyebrow}>REACT NATIVE · PRÁCTICAS</Text>

            <Text style={styles.title}>
              ¡Explora el{"\n"}
              <Text style={styles.titleAccent}>menú!</Text>
            </Text>

            <Text style={styles.description}>
              Selecciona un tema para conocer sus componentes y ver las
              prácticas de cada expositor.
            </Text>

            <View style={styles.counter}>
              <Text style={styles.counterText}>✨ 8 prácticas disponibles</Text>
            </View>
          </View>

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          >
            {PRACTICES.map((item, index) => (
              <Pressable
                key={item.id}
                onPress={() => setScreen(item.id)}
                style={({ pressed }) => [
                  styles.card,
                  pressed && styles.cardPressed,
                ]}
                accessibilityRole="button"
                accessibilityLabel={`Abrir ${item.title}`}
              >
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: item.color },
                  ]}
                >
                  <Text style={styles.icon}>{item.icon}</Text>
                </View>

                <View style={styles.cardContent}>
                  <Text style={styles.cardNumber}>
                    PRÁCTICA {(index + 1).toString().padStart(2, "0")}
                  </Text>

                  <Text style={styles.cardTitle}>{item.title}</Text>

                  <Text style={styles.cardSubtitle}>{item.subtitle}</Text>

                  <Text style={styles.author}>👤 {item.author}</Text>
                </View>

                <View style={[styles.arrow, { backgroundColor: item.color }]}>
                  <Text style={styles.arrowText}>›</Text>
                </View>
              </Pressable>
            ))}

            <Text style={styles.footer}>Hecho con 💜 y React Native</Text>
          </ScrollView>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1020",
    paddingTop: 48,
  },

  header: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },

  eyebrow: {
    color: "#A5B4FC",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 12,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 38,
    fontWeight: "900",
    lineHeight: 43,
  },

  titleAccent: {
    color: "#A78BFA",
  },

  description: {
    color: "#A7B0C5",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 12,
    maxWidth: 330,
  },

  counter: {
    alignSelf: "flex-start",
    marginTop: 17,
    paddingVertical: 8,
    paddingHorizontal: 13,
    borderRadius: 20,
    backgroundColor: "#1C2440",
    borderWidth: 1,
    borderColor: "#343D60",
  },

  counterText: {
    color: "#DDD6FE",
    fontSize: 12,
    fontWeight: "700",
  },

  scroll: {
    flex: 1,
  },

  list: {
    paddingHorizontal: 18,
    paddingTop: 5,
    paddingBottom: 28,
    gap: 12,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#151C30",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#29324B",
    padding: 14,
    minHeight: 112,

    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },

  cardPressed: {
    opacity: 0.78,
    transform: [{ scale: 0.97 }],
    borderColor: "#A78BFA",
  },

  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  icon: {
    fontSize: 25,
  },

  cardContent: {
    flex: 1,
    paddingVertical: 2,
  },

  cardNumber: {
    color: "#8B98B5",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.3,
    marginBottom: 5,
  },

  cardTitle: {
    color: "#F8FAFC",
    fontSize: 14,
    fontWeight: "800",
    lineHeight: 19,
  },

  cardSubtitle: {
    color: "#A7B0C5",
    fontSize: 11,
    marginTop: 4,
    lineHeight: 15,
  },

  author: {
    color: "#C4B5FD",
    fontSize: 10,
    fontWeight: "600",
    marginTop: 8,
    lineHeight: 15,
  },

  arrow: {
    width: 28,
    height: 28,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 7,
  },

  arrowText: {
    color: "#FFFFFF",
    fontSize: 25,
    lineHeight: 27,
    fontWeight: "500",
  },

  footer: {
    textAlign: "center",
    color: "#78839F",
    fontSize: 11,
    marginTop: 12,
    marginBottom: 10,
  },
});
