// ===================================================
//                Zona de importaciones
// ===================================================

import { StyleSheet } from "react-native";

import { colors } from "@constants/colors";

// ===================================================
//                   Zona de estilos
// ===================================================

// ------------- Splash -------------

export const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.splashBackground,
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.splashText,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 15,
    color: colors.splashSubtext,
  },
});

// ------------- Pantalla principal -------------

export const screenStyles = StyleSheet.create({
  background: {
    flex: 1,
  },
  // Capa oscura sobre la imagen para que el texto se lea bien.
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
  },
  safe: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  keyboard: {
    flex: 1,
  },
  listContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
    color: colors.title,
    marginBottom: 16,
  },
  total: {
    marginTop: 18,
    marginBottom: 12,
    fontSize: 16,
    fontWeight: "700",
    color: colors.title,
  },
  empty: {
    textAlign: "center",
    color: colors.title,
    fontSize: 15,
    marginTop: 10,
  },
  separator: {
    height: 10,
  },
});

// ------------- Formulario -------------

export const formStyles = StyleSheet.create({
  container: {
    gap: 10,
  },
  input: {
    backgroundColor: colors.input,
    color: colors.inputText,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  button: {
    marginTop: 4,
    padding: 14,
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonDisabled: {
    backgroundColor: colors.primaryDisabled,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: colors.onPrimary,
  },
  loading: {
    alignItems: "center",
    marginTop: 14,
    gap: 6,
  },
  loadingText: {
    color: colors.title,
    fontSize: 14,
    fontWeight: "600",
  },
});

// ------------- Tarjeta de libro -------------

export const bookStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 14,
  },
  title: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.cardTitle,
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    color: colors.cardText,
  },
});
