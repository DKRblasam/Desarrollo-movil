import { View, Text, Pressable, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider, useTheme } from "./theme";

function Pantalla() {
  const { colors, dark, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={dark ? "light" : "dark"} />

      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        <Text style={[styles.title, { color: colors.text }]}>Hola</Text>
        <Text style={{ color: colors.secondary }}>Texto de apoyo</Text>
      </View>

      <Pressable
        onPress={toggleTheme}
        style={[styles.btn, { backgroundColor: colors.primary }]}
      >
        <Text style={{ color: colors.onPrimary, fontWeight: "600" }}>
          Cambiar tema
        </Text>
      </Pressable>

      <Text style={{ color: colors.accent, marginTop: 16 }}>¡Oferta!</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  card: { padding: 20, borderRadius: 12, width: "100%", marginBottom: 20 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 4 },
  btn: { paddingVertical: 12, paddingHorizontal: 24, borderRadius: 10 },
});