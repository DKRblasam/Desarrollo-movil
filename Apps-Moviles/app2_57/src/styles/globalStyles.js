import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  menuTitle: {
    fontSize: 30,
    fontFamily: "Times New Roman",
    fontWeight: "900",
    color: "#003566",
  },

  // Contenedor base compartido por las pantallas de práctica
  screenContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",

    backgroundColor: "#cccccc",

    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
});
