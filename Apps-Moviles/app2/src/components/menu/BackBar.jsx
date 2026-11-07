import { View, Text, Pressable, StyleSheet } from "react-native";

// Barra "Volver" que se muestra encima de cualquier práctica.
export function BackBar({ onBack, title, color }) {
  return (
    <View style={[styles.bar, { backgroundColor: color }]}>
      <Pressable onPress={onBack} hitSlop={12} style={styles.button}>
        <Text style={styles.buttonText}>‹ Menú</Text>
      </Pressable>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  button: {
    paddingRight: 14,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
  title: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "right",
  },
});
