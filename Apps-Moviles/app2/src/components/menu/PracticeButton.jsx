import { View, Text, Pressable, StyleSheet } from "react-native";

// Botón de práctica del menú (Pressable permite estilos reales, a diferencia de <Button>).
export function PracticeButton({ item, onPress }) {
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
      <Text style={styles.emoji}>{item.emoji}</Text>

      <View style={styles.texts}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.author}>{item.author}</Text>
      </View>

      <Text style={styles.arrow}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
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
  emoji: {
    fontSize: 30,
    marginRight: 14,
  },
  texts: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  author: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    marginTop: 2,
  },
  arrow: {
    fontSize: 30,
    color: "rgba(255,255,255,0.9)",
    marginLeft: 8,
  },
});
