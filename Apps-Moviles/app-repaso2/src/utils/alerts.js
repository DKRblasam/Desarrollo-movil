// ===================================================
//                Zona de importaciones
// ===================================================

import { Alert, Platform } from "react-native";

// ===================================================
//                   Zona del MAIN
// ===================================================

// Alert.alert no funciona en web (react-native-web), por eso se usa
// window.alert cuando la app corre en el navegador.

export const mostAlert = (title, msg) => {
  if (Platform.OS === "web") {
    window.alert(`${title}\n\n${msg}`);
    return;
  }

  Alert.alert(title, msg);
};
