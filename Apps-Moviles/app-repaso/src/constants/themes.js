import { createContext, useContext, useState } from "react";
import { useColorScheme } from "react-native";

export const lightTheme = {
  dark: false,
  colors: {
    primary: "#3a6d8e",
    secondary: "#586980",
    background: "#f8fafc",
    surface: "#ffffff",
    text: "#1e293b",
    accent: "#d62839",
    onPrimary: "#ffffff",
    border: "#cbd5e1",
  },
};

export const darkTheme = {
  dark: true,
  colors: {
    primary: "#5b97ba",
    secondary: "#94a3b8",
    background: "#1e293b",
    surface: "#273449",
    text: "#d7e3fc",
    accent: "#ff6b78",
    onPrimary: "#1e293b",
    border: "#3b4a63",
  },
};

export const colors = {
  primary: "#2563EB",
  secondary: "#64748B",
  background: "#F8FAFC",
  text: "#1E293B",
};


const ThemeContext = createContext(lightTheme);

export function ThemeProvider({ children }) {
  const sistema = useColorScheme(); // "light" | "dark" | null
  const [modo, setModo] = useState(null); // null = seguir al sistema

  const esOscuro = (modo ?? sistema) === "dark";
  const theme = {
    ...(esOscuro ? darkTheme : lightTheme),
    toggleTheme: () => setModo(esOscuro ? "light" : "dark"),
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
