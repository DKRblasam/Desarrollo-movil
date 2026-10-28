// ===================================================
//                Zona de importaciones
// ===================================================

// ============= Funciones =============

// ------------- React -------------

import { useState, useEffect, useRef } from "react";

// ============= Componentes =============

// ------------- Nativos -------------

import {
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  Text,
  Animated,
  BackHandler,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
// ------------- Expo -------------

import { StatusBar } from "expo-status-bar";

// ------------- Estilos -------------

import { gl_styles } from "../../styles/global";

// ============= Pantallas =============

import CardScreen from "../Presentations/cardScreen";
import SafeScreen  from "../Presentations/safeScreen";
import SwitchScreen from "../Presentations/switchScreen";
import TextInputScreen from "../Presentations/textInputScreen";
// FIX: antes se importaba desde textInputScreen (archivo equivocado)
import ScreenFlat from "../Presentations/flatSectionScreen";
import FlatSectionScreen2 from "../Presentations/flatSectionScreen2";
import ImageSplashScreen from "../Presentations/imageSplashScreen";
import ModalBottomSheetScreen from "../Presentations/modalBottomSheetScreen";

// ===================================================
//                 Datos del menú
// ===================================================
// Una sola fuente de verdad: agregar una práctica = agregar un objeto.

const PRACTICAS = [
  {
    key: "cards",
    emoji: "🃏",
    title: "Tarjetas",
    color: "#7C3AED",
    author: "Practica de Tarjetas",
    Screen: CardScreen,
  },
  {
    key: "safe",
    emoji: "📱",
    title: "SafeAreaView & ScrollView",
    color: "#2563EB",
    author: "Dulce Ayelen Perez Toribio",
    Screen: SafeScreen,
  },
  {
    key: "press",
    emoji: "👆",
    title: "Pressable & Switch",
    color: "#059669",
    author: "Karen Hernández Sánchez",
    Screen: SwitchScreen,
  },
  {
    key: "input",
    emoji: "⌨️",
    title: "TextInput & Alert",
    color: "#EA580C",
    author: "Jesus Rojo Uribe",
    Screen: TextInputScreen,
  },
  {
    key: "lists",
    emoji: "📋",
    title: "FlatList & SectionList",
    color: "#DB2777",
    author: "Natalia Zarate Cabanillas",
    Screen: ScreenFlat,
  },
  {
    key: "lists2",
    emoji: "🗂️",
    title: "FlatList & SectionList (2)",
    color: "#9333EA",
    author: "Natalia Zarate Cabanillas",
    Screen: FlatSectionScreen2,
  },
  {
    key: "image",
    emoji: "🌄",
    title: "ImageBackground & SplashScreen",
    color: "#0891B2",
    author: "Paloma Valeria Hurtado Guerrero",
    Screen: ImageSplashScreen,
  },
  {
    key: "modal",
    emoji: "🪟",
    title: "Modal & Bottom Sheet",
    color: "#C2410C",
    author: "Iancarlo Abreu Martinez",
    Screen: ModalBottomSheetScreen,
  },
];

// ===================================================
//              Componentes auxiliares
// ===================================================

// Botón de práctica: reemplaza a <Button> (que no permite estilos reales
// y usa `onPress`, no `onclick`).
function PracticaButton({ item, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "rgba(255,255,255,0.25)" }}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: item.color },
        pressed && styles.cardPressed,
      ]}
    >
      <Text style={styles.cardEmoji}>{item.emoji}</Text>

      <View style={styles.cardTexts}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardAuthor}>{item.author}</Text>
      </View>

      <Text style={styles.cardArrow}>›</Text>
    </Pressable>
  );
}

// Botón "Volver" que se muestra encima de cualquier práctica.
function BackBar({ onBack, title, color }) {
  return (
    <View style={[styles.backBar, { backgroundColor: color }]}>
      <Pressable onPress={onBack} hitSlop={12} style={styles.backBtn}>
        <Text style={styles.backText}>‹ Menú</Text>
      </Pressable>
      <Text style={styles.backTitle} numberOfLines={1}>
        {title}
      </Text>
    </View>
  );
}

// ===================================================
//                   Zona del MAIN
// ===================================================

export default function MenuScreen() {
  const [screen, setScreen] = useState("menu");

  // Animación de entrada del encabezado (una sola vez)
  const headerAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(headerAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [headerAnim]);

  // El botón "atrás" de Android regresa al menú en vez de cerrar la app
  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      if (screen !== "menu") {
        setScreen("menu");
        return true;
      }
      return false;
    });
    return () => sub.remove();
  }, [screen]);

  // ------------- Vista de una práctica -------------
  const activa = PRACTICAS.find((p) => p.key === screen);

  if (activa) {
    const { Screen } = activa;
    return (
      <View style={styles.flex}>
        {/* <StatusBar style="light" /> */}
        <BackBar
          onBack={() => setScreen("menu")}
          title={`${activa.emoji} ${activa.title}`}
          color={activa.color}
        />
        <View style={styles.flex}>
          <Screen />
        </View>
      </View>
    );
  }

  // ------------- Vista del menú -------------
  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar style="dark" /> */}

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={{
            opacity: headerAnim,
            transform: [
              {
                translateY: headerAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-16, 0],
                }),
              },
            ],
          }}
        >
          <Text style={[gl_styles.title_menu, styles.title]}>
            ¡Explora el menú!
          </Text>
          <Text style={styles.subtitle}>
            Selecciona una práctica para comenzar 🚀
          </Text>
        </Animated.View>

        {PRACTICAS.map((item) => (
          <PracticaButton
            key={item.key}
            item={item}
            onPress={() => setScreen(item.key)}
          />
        ))}

        <Text style={styles.footer}>{PRACTICAS.length} prácticas disponibles</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

// ===================================================
//                   Zona de estilos
// ===================================================

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingTop: 50,
  },

  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
    marginTop: 10,
  },

  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 24,
  },

  // --- Tarjeta/botón ---
  card: {
    flexDirection: "row", // FIX: "col" no es un valor válido
    alignItems: "center",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 14,
    overflow: "hidden",

    // sombra iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    // sombra Android
    elevation: 5,
  },

  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },

  cardEmoji: {
    fontSize: 30,
    marginRight: 14,
  },

  cardTexts: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  cardAuthor: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    marginTop: 2,
  },

  cardArrow: {
    fontSize: 30,
    color: "rgba(255,255,255,0.9)",
    marginLeft: 8,
  },

  footer: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 10,
  },

  // --- Barra de regreso ---
  backBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },

  backBtn: {
    paddingRight: 14,
  },

  backText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },

  backTitle: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "right",
  },
});