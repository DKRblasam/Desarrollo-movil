// ===================================================
//                Zona de importaciones
// ===================================================

import { View, Text, Switch } from "react-native";

// -------------------- Estilos y tema --------------------

import { switchStyles } from "@constants/styles";
import { useTheme } from "@constants/themes";

// ===================================================
//                Zona del Main
// ===================================================

// Preguntas de sí/no. Cada una se controla con un Switch.

const questions = [
  { key: "taller", label: "¿Asistirá al taller?" },
  { key: "constancia", label: "¿Requiere constancia?" },
  { key: "deportes", label: "¿Participará en actividades deportivas?" },
];

export default function SectionSwch({ options, onChange }) {
  const { colors } = useTheme();

  return (
    <View style={switchStyles.container}>
      <Text style={[switchStyles.heading, { color: colors.text }]}>Opciones</Text>

      {questions.map(({ key, label }) => (
        <View key={key} style={switchStyles.row}>
          <Text style={[switchStyles.question, { color: colors.text }]}>{label}</Text>
          <Switch
            value={options[key]}
            onValueChange={(value) => onChange(key, value)}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor="#ffffff"
          />
        </View>
      ))}
    </View>
  );
}
