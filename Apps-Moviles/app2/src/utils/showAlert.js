import { Alert, Platform } from "react-native";

/**
 * Muestra una alerta nativa; en web usa window.alert porque
 * Alert.alert de React Native no tiene implementación en react-native-web.
 */
export function showAlert(title, message) {
  if (Platform.OS === "web") {
    window.alert(`${title}\n\n${message}`);
  } else {
    Alert.alert(title, message);
  }
}
