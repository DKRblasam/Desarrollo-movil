// ===================================================
//                Zona de importaciones
// ===================================================

import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

// ==================== Componentes ====================
// -------------------- Secciones --------------------

import Forms from "@components/Form";
import SectionSwch from "@components/sectionSwch";
import CustomButton from "@components/CustomButton";

// -------------------- Estilos, tema y utilidades --------------------

import { screenStyles } from "@constants/styles";
import { useTheme } from "@constants/themes";
import { mostAlert } from "@utils/alerts";

// ===================================================
//                Zona del Main
// ===================================================

const siNo = (valor) => (valor ? "Sí" : "No");

export default function RegisterScreen() {
  const { colors, dark } = useTheme();

  // El estado vive en la pantalla para que el botón de enviar
  // pueda leer los campos y los switches al mismo tiempo.
  const [form, setForm] = useState({ nombre: "", carrera: "", semestre: "" });
  const [options, setOptions] = useState({
    taller: false,
    constancia: false,
    deportes: false,
  });

  const changeField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const changeOption = (key, value) => setOptions((prev) => ({ ...prev, [key]: value }));

  const enviarRegistro = () => {
    const nombre = form.nombre.trim();
    const carrera = form.carrera.trim();
    const semestre = form.semestre.trim();

    // 1. Ningún campo vacío
    const faltan = [];
    if (nombre === "") faltan.push("Nombre");
    if (carrera === "") faltan.push("Carrera");
    if (semestre === "") faltan.push("Semestre");

    if (faltan.length > 0) {
      mostAlert(
        "Campos incompletos",
        `Debes llenar todos los campos.\n\nFaltan: ${faltan.join(", ")}`,
      );
      return;
    }

    // 2. Semestre numérico
    if (!/^\d+$/.test(semestre)) {
      mostAlert("Error", "El semestre debe ser un número.");
      return;
    }

    // 3. Todo correcto: se muestra el resumen
    mostAlert(
      "Registro enviado",
      `Nombre: ${nombre}\nCarrera: ${carrera}\nSemestre: ${semestre}\n\n` +
        `Taller: ${siNo(options.taller)}\n` +
        `Constancia: ${siNo(options.constancia)}\n` +
        `Deportes: ${siNo(options.deportes)}`,
    );
  };

  return (
    <SafeAreaView style={[screenStyles.safe, { backgroundColor: colors.background }]}>
      <StatusBar style={dark ? "dark" : "light"} />

      <ScrollView
        contentContainerStyle={screenStyles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[screenStyles.card, { backgroundColor: colors.surface }]}>
          <Text style={[screenStyles.title, { color: colors.text }]}>
            Registro de Evento Universitario
          </Text>
          <Text style={[screenStyles.subtitle, { color: colors.secondary }]}>
            Completa tus datos para registrarte al evento
          </Text>

          <Forms values={form} onChange={changeField} />
          <SectionSwch options={options} onChange={changeOption} />

          <View style={{ marginTop: 22 }}>
            <CustomButton title="Enviar Registro" onPress={enviarRegistro} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
