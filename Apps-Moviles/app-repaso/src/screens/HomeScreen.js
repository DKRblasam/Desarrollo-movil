import { View, StyleSheet } from "react-native";

import CustomButton from "@components/CustomButton";
import { colors } from "@constants/themes";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <CustomButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: colors.background,
  },
});
