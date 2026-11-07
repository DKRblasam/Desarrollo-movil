import { useEffect } from "react";
import { BackHandler } from "react-native";

/**
 * Registra un manejador del botón "atrás" de Android.
 * `onBack` debe devolver true si gestionó el evento (evita cerrar la app)
 * o false para dejar el comportamiento por defecto.
 */
export function useHardwareBack(onBack) {
  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      onBack,
    );
    return () => subscription.remove();
  }, [onBack]);
}
