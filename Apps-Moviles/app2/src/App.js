import { SafeAreaProvider } from "react-native-safe-area-context";

import MenuScreen from "@/screens/MenuScreen";

export default function App() {
  return (
    <SafeAreaProvider>
      <MenuScreen />
    </SafeAreaProvider>
  );
}
