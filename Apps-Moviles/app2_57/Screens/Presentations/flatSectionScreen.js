// ===================================================
//                Zona de importaciones
// ===================================================

import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  SectionList,
  Pressable,
  StyleSheet,
} from "react-native";

const TAREAS_INICIALES = [
  { id: "1", nombre: "Estudiar React Native." },
  { id: "2", nombre: "Practicar JS." },
  { id: "3", nombre: "Preparar la expo." },
];

const CONTACTOS = [
  {
    title: "A",
    data: [
      { id: "c1", nombre: "Ana", telefono: "555-1001" },
      { id: "c2", nombre: "Andrés", telefono: "555-1002" },
    ],
  },
  {
    title: "B",
    data: [
      { id: "c3", nombre: "Brenda", telefono: "555-1003" },
      { id: "c4", nombre: "Bruno", telefono: "555-1004" },
    ],
  },
  { title: "C", data: [{ id: "c5", nombre: "Carlos", telefono: "555-1005" }] },
];

const Separador = () => <View style={styles.separador} />;

// ---------- FlatList + estados ----------
function PantallaTareas() {
  const [tareas, setTareas] = useState(TAREAS_INICIALES);
  const [texto, setTexto] = useState("");
  const [seleccionado, setSeleccionado] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const agregarTarea = () => {
    if (!texto.trim()) return;
    setTareas((anteriores) => [
      ...anteriores,
      { id: String(Date.now()), nombre: texto.trim() },
    ]);
    setTexto("");
  };

  const actualizar = () => {
    setRefreshing(true);

    setTimeout(() => {
      setTareas(TAREAS_INICIALES);
      setRefreshing(false);
    }, 1000);
  };

  return (
    <View style={styles.pantalla}>
      <TextInput
        style={styles.input}
        placeholder="Nueva Tarea"
        value={texto}
        onChangeText={setTexto}
      />
      <View style={styles.fila}>
        <Button title="Agregar" onPress={agregarTarea} />
        <Button title="Vaciar" onPress={() => setTareas([])} />
      </View>

      <FlatList
        data={tareas}
        keyExtractor={(item) => item.id}
        extraData={seleccionado}
        renderItem={({ item }) => {
          <Pressable
            onPress={() => setSeleccionado(item.id)}
            style={[
              styles.item,
              item.id === seleccionado && styles.seleccionado,
            ]}
          >
            <Text>{item.nombre}</Text>
          </Pressable>;
        }}
        ListHeaderComponent={
          <Text style={styles.titulo}>Tareas ({tareas.length})</Text>
        }
        ListFooterComponent={<Text style={styles.pie}> Fin de la lista </Text>}
        ItemSeparatorComponent={Separador}
        ListEmptyComponent={
          <Text style={styles.vacio}> No hay tareas regitradas </Text>
        }
        refreshing={refreshing}
        onRefresh={actualizar}
        initialNumToRender={10}
      />
    </View>
  );
}

// ======================== Section List ========================

export function PantallaContactos() {
  const [busqueda, setBusqueda] = useState("");
  const [favoritos, setFavoritos] = useState([]);

  const alternarFavorito = (id) => {
    setFavoritos((anteriores) =>
      anteriores.includes(id)
        ? anteriores.filter((f) => f !== id)
        : [...anteriores],
    );
  };

  const secciones = CONTACTOS.map((s) => ({
    ...s,
    data: s.data.filter((c) =>
      c.nombre.toLowerCase.includes(busqueda.toLowerCase),
    ),
  })).filter((s) => s.data.length > 0);
  
}
