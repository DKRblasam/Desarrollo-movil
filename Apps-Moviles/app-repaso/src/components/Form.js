// ===================================================
//                Zona de importaciones
// ===================================================

import { View, Text, TextInput } from "react-native";

// ============= Extras =============
// ------------- Estilos y tema -------------

import { formStyles } from "@constants/styles";
import { useTheme } from "@constants/themes";

// ===================================================
//                   Zona del MAIN
// ===================================================

// Campos que se capturan. Con este arreglo se generan los TextInput,
// así no se repite el mismo bloque tres veces.

const fields = [
  { key: "nombre", label: "Nombre completo", placeholder: "Ej. Ian David Blas", autoCapitalize: "words" },
  { key: "carrera", label: "Carrera", placeholder: "Ej. ITIID", autoCapitalize: "words" },
  { key: "semestre", label: "Semestre", placeholder: "Ej. 4", keyboardType: "numeric", maxLength: 2 },
];

export default function Forms({ values, onChange }) {
  const { colors } = useTheme();

  return (
    <View style={formStyles.formContainer}>
      {fields.map(({ key, label, ...inputProps }) => (
        <View key={key}>
          <Text style={[formStyles.label, { color: colors.secondary }]}>{label}</Text>
          <TextInput
            value={values[key]}
            onChangeText={(text) => onChange(key, text)}
            placeholderTextColor={colors.secondary}
            style={[
              formStyles.input,
              { color: colors.text, backgroundColor: colors.background, borderColor: colors.border },
            ]}
            {...inputProps}
          />
        </View>
      ))}
    </View>
  );
}
