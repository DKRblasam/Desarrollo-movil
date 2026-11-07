import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import { Spacer } from "@/components/common/Spacer";
import { ProfileToggleCard } from "@/components/profile/ProfileToggleCard";
import { globalStyles } from "@/styles/globalStyles";

const PROFILES = [
  { name: "David", style: "card1" },
  { name: "Ian", style: "card2" },
  { name: "Juan", style: "card3" },
];

export default function CardScreen() {
  return (
    <View style={globalStyles.screenContainer}>
      <Spacer />
      <Spacer />
      <Spacer />
      {PROFILES.map(({ name, style }) => (
        <ProfileToggleCard
          key={name}
          name={name}
          career="ITIID 223"
          subject="Desarrollo de Aplicaciones web"
          term="4to cuatrimestre"
          style={styles[style]}
        />
      ))}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  card1: {
    backgroundColor: "#f2e9e4",
  },
  card2: {
    backgroundColor: "#d8e2dc",
  },
  card3: {
    backgroundColor: "#b0c4b1",
  },
});
