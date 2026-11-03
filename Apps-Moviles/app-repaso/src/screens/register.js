// ===================================================
//                Zona de importaciones
// ===================================================

import { SafeAreaView } from "react-native-safe-area-context";


// ==================== Componentes ====================
// -------------------- Secciones --------------------

import Forms from "@components/Form";
import SectionSwch from "@components/sectionSwch";

// -------------------- Estilos --------------------

import styles from "@constants/styles";


// ===================================================
//                Zona de importaciones
// ===================================================

export default function regScreen() {
  return (
    <SafeAreaView>
      <Forms />
      <SectionSwch />
    </SafeAreaView>
  );
}