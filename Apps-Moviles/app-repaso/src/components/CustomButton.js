import { Pressable, Text, StyleSheet } from "react-native";

import { colors } from "@constants/themes";

export default function CustomButton() {
  return (
    <Pressable style={styles.button}>
      <Text style={styles.text}>Alias funcionando</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
  },
  text: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
  },
});
