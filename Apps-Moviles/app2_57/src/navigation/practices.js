import CardScreen from "@/screens/practices/CardScreen";
import SafeScreen from "@/screens/practices/SafeScreen";
import SwitchScreen from "@/screens/practices/SwitchScreen";
import TextInputScreen from "@/screens/practices/TextInputScreen";
import ListsScreen from "@/screens/practices/ListsScreen";
import FlatSectionScreen2 from "@/screens/practices/FlatSectionScreen2";
import ImageSplashScreen from "@/screens/practices/ImageSplashScreen";
import ModalBottomSheetScreen from "@/screens/practices/ModalBottomSheetScreen";
import ActivityScreen from "@/screens/practices/ActivityScreen";

// Una sola fuente de verdad del menú: agregar una práctica = agregar un objeto.
export const PRACTICES = [
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
    Screen: ListsScreen,
  },
  {
    key: "lists2",
    emoji: "🗂️",
    title: "FlatList & SectionList (2)",
    color: "#9333EA",
    author: "Gael ...",
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
  {
    key: "activity",
    emoji: "⌨️",
    title: "ActivityIndicator & KeyboardAvoidingView",
    color: "#FF9C2B",
    author: "Rene ...",
    Screen: ActivityScreen,
  },
];
