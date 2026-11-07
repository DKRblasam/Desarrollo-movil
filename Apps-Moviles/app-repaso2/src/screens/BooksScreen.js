// ===================================================
//                Zona de importaciones
// ===================================================

import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

// ==================== Componentes ====================
// -------------------- Secciones --------------------

import BookForm from "@components/BookForm";
import BookItem from "@components/BookItem";

// -------------------- Estilos y utilidades --------------------

import { screenStyles } from "@constants/styles";
import { mostAlert } from "@utils/alerts";

// ===================================================
//                Zona del Main
// ===================================================

// Tiempo que dura la espera simulada antes de guardar (4 segundos).
const ESPERA_MS = 4000;

const formularioVacio = { titulo: "", autor: "", genero: "" };

const librosIniciales = [
  {
    id: "1",
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    genero: "Realismo mágico",
  },
  {
    id: "2",
    titulo: "El principito",
    autor: "Antoine de Saint-Exupéry",
    genero: "Fantasía",
  },
  {
    id: "3",
    titulo: "Harry Potter y la piedra filosofal",
    autor: "J.K. Rowling",
    genero: "Fantasía",
  },
  {
    id: "4",
    titulo: "Orgullo y prejuicio",
    autor: "Jane Austen",
    genero: "Romance",
  },
  { id: "5", titulo: "La Odisea", autor: "Homero", genero: "Épica" },
  {
    id: "6",
    titulo: "Romeo y Julieta",
    autor: "William Shakespeare",
    genero: "Drama",
  },
  {
    id: "7",
    titulo: "Los juegos del hambre",
    autor: "Suzanne Collins",
    genero: "Ciencia ficción",
  },
  { id: "8", titulo: "El alquimista", autor: "Paulo Coelho", genero: "Novela" },
  { id: "9", titulo: "Frankenstein", autor: "Mary Shelley", genero: "Terror" },
  {
    id: "10",
    titulo: "El código Da Vinci",
    autor: "Dan Brown",
    genero: "Misterio",
  },
  { id: "11", titulo: "It", autor: "Stephen King", genero: "Terror" },
  {
    id: "12",
    titulo: "Mujercitas",
    autor: "Louisa May Alcott",
    genero: "Novela",
  },
  {
    id: "13",
    titulo: "La metamorfosis",
    autor: "Franz Kafka",
    genero: "Literatura",
  },
  {
    id: "14",
    titulo: "El diario de Ana Frank",
    autor: "Ana Frank",
    genero: "Biografía",
  },
  {
    id: "15",
    titulo: "La divina comedia",
    autor: "Dante Alighieri",
    genero: "Poesía",
  },
  {
    id: "16",
    titulo: "El retrato de Dorian Gray",
    autor: "Oscar Wilde",
    genero: "Filosofía",
  },
  {
    id: "17",
    titulo: "La sombra del viento",
    autor: "Carlos Ruiz Zafón",
    genero: "Misterio",
  },
  {
    id: "18",
    titulo: "Bajo la misma estrella",
    autor: "John Green",
    genero: "Romance",
  },
  {
    id: "19",
    titulo: "La vuelta al mundo en 80 días",
    autor: "Julio Verne",
    genero: "Aventura",
  },
  {
    id: "20",
    titulo: "El viejo y el mar",
    autor: "Ernest Hemingway",
    genero: "Novela",
  },
];

export default function BooksScreen() {
  // Estados: campos del formulario, lista de libros y bandera de guardado.
  const [form, setForm] = useState(formularioVacio);
  const [libros, setLibros] = useState(librosIniciales);
  const [guardando, setGuardando] = useState(false);

  // Guarda el id del temporizador para poder cancelarlo al salir de la pantalla.
  const temporizador = useRef(null);

  useEffect(() => {
    return () => clearTimeout(temporizador.current);
  }, []);

  const changeField = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const agregarLibro = () => {
    if (guardando) return;

    const libro = {
      titulo: form.titulo.trim(),
      autor: form.autor.trim(),
      genero: form.genero.trim(),
    };

    // 1. Validar que todos los campos estén llenos
    if (libro.titulo === "" || libro.autor === "" || libro.genero === "") {
      mostAlert("Campos incompletos", "Todos los campos son obligatorios.");
      return;
    }

    // 2. Simular la espera de 4 segundos con el ActivityIndicator
    Keyboard.dismiss();
    setGuardando(true);

    temporizador.current = setTimeout(() => {
      // 3. Agregar el libro a la FlatList
      setLibros((prev) => [
        ...prev,
        { id: `${Date.now()}-${prev.length}`, ...libro },
      ]);

      // 4. Limpiar los TextInput
      setForm(formularioVacio);
      setGuardando(false);

      // 5. Notificar con un Alert
      mostAlert("Libro agregado", "Libro guardado correctamente.");
    }, ESPERA_MS);
  };

  return (
    // La imagen ocupa toda la pantalla (incluso detrás de la zona segura).
    <ImageBackground
      source={require("../../assets/fondo.jpg")}
      resizeMode="cover"
      style={screenStyles.background}
    >
      <StatusBar style="light" />

      <View style={screenStyles.overlay}>
        <SafeAreaView style={screenStyles.safe}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={screenStyles.keyboard}
          >
            <FlatList
              data={libros}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <BookItem libro={item} />}
              ItemSeparatorComponent={() => (
                <View style={screenStyles.separator} />
              )}
              contentContainerStyle={screenStyles.listContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={
                <View>
                  <Text style={screenStyles.title}>
                    Registro de Libros Leídos
                  </Text>

                  <BookForm
                    values={form}
                    onChange={changeField}
                    onSubmit={agregarLibro}
                    guardando={guardando}
                  />

                  <Text style={screenStyles.total}>
                    Total de libros: {libros.length}
                  </Text>
                </View>
              }
              ListEmptyComponent={
                <Text style={screenStyles.empty}>
                  Aún no has registrado libros.
                </Text>
              }
            />
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}
