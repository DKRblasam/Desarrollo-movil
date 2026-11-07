// ===================================================
//                Zona de importaciones
// ===================================================

import { useRef } from "react";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";

// -------------------- Estilos y tema --------------------

import { formStyles } from "@constants/styles";
import { colors } from "@constants/colors";

// ===================================================
//                   Zona del MAIN
// ===================================================

// Campos que se capturan. Con este arreglo se generan los TextInput,
// así no se repite el mismo bloque tres veces.

const fields = [
  { key: "titulo", placeholder: "Título del libro", autoCapitalize: "sentences" },
  { key: "autor", placeholder: "Autor", autoCapitalize: "words" },
  { key: "genero", placeholder: "Género", autoCapitalize: "sentences" },
];

export default function BookForm({ values, onChange, onSubmit, guardando }) {
  // Referencias a los TextInput para pasar el foco al siguiente campo.
  const inputs = useRef([]);

  return (
    <View style={formStyles.container}>
      {fields.map(({ key, ...inputProps }, index) => {
        const esUltimo = index === fields.length - 1;

        return (
          <TextInput
            key={key}
            ref={(el) => (inputs.current[index] = el)}
            value={values[key]}
            onChangeText={(text) => onChange(key, text)}
            placeholderTextColor={colors.placeholder}
            style={formStyles.input}
            editable={!guardando}
            returnKeyType={esUltimo ? "done" : "next"}
            // "next" enfoca el siguiente campo; en el último se cierra el teclado.
            onSubmitEditing={() => !esUltimo && inputs.current[index + 1]?.focus()}
            submitBehavior={esUltimo ? "blurAndSubmit" : "submit"}
            {...inputProps}
          />
        );
      })}

      <Pressable
        onPress={onSubmit}
        disabled={guardando}
        style={({ pressed }) => [
          formStyles.button,
          guardando && formStyles.buttonDisabled,
          pressed && formStyles.buttonPressed,
        ]}
      >
        <Text style={formStyles.buttonText}>
          {guardando ? "Guardando..." : "Agregar libro"}
        </Text>
      </Pressable>

      {/* Mientras se guarda se muestra el indicador de carga */}
      {guardando && (
        <View style={formStyles.loading}>
          <ActivityIndicator size="large" color={colors.title} />
          <Text style={formStyles.loadingText}>Guardando libro...</Text>
        </View>
      )}
    </View>
  );
}
