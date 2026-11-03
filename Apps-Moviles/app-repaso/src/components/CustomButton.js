import { Pressable, Text, StyleSheet } from "react-native";

import { useTheme } from "@constants/themes";

export default function CustomButton({ title = "Alias funcionando", onPress }) {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: colors.primary, opacity: pressed ? 0.8 : 1 },
      ]}
    >
      <Text style={[styles.text, { color: colors.onPrimary }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 10,
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
