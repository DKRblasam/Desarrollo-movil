import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { SafeAreaDemo } from "@/components/demos/SafeAreaDemo";
import { ScrollViewDemo } from "@/components/demos/ScrollViewDemo";
import { globalStyles } from "@/styles/globalStyles";

export default function SafeScreen() {
  return (
    <SafeAreaView>
      <View style={globalStyles.screenContainer}>
        <Text>Practica 10 - SafeArea & ScrollView</Text>
        <Text>Equipo #1 - Dulce|Karla|Saul</Text>
      </View>

      <SafeAreaDemo />
      <ScrollViewDemo />
    </SafeAreaView>
  );
}
