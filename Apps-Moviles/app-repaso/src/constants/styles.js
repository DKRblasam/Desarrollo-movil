// ===================================================
//                Zona de importaciones
// ===================================================

import { StyleSheet } from "react-native";

// ===================================================
//                   Zona de estilos
// ===================================================
// Solo layout y medidas; los colores salen del tema (useTheme).

// ------------- Pantalla -------------

export const screenStyles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 480,
    alignSelf: "center",
    padding: 22,
    borderRadius: 18,
    gap: 6,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 14,
  },
});

// ------------- Formulario -------------

export const formStyles = StyleSheet.create({
  formContainer: {
    gap: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
});

// ------------- Opciones (switches) -------------

export const switchStyles = StyleSheet.create({
  container: {
    marginTop: 18,
  },
  heading: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  question: {
    flex: 1,
    fontSize: 15,
    paddingRight: 12,
  },
});
