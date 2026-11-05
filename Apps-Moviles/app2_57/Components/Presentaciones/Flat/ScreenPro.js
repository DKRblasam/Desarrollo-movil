// ===================================================
//                Zona de importaciones
// ===================================================

import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  TextInput,
  FlatList,
  SectionList,
  Pressable,
  StyleSheet,
} from "react-native";

// ===================================================
//                   Zona del MAIN
// ===================================================

// ============= Paleta =============
const COLORES = {
  fondo: "#F4F2FF",
  tarjeta: "#FFFFFF",
  tinta: "#1E1B3A",
  tintaSuave: "#7A7799",
  primario: "#6D4AFF",
  primarioClaro: "#E6E0FF",
  menta: "#2EC4A0",
  sol: "#FFB703",
  coral: "#FF6B6B",
  borde: "#E3DFF5",
};

const COLORES_AVATAR = ["#6D4AFF", "#2EC4A0", "#FF8FAB", "#FFB703", "#4D9DE0"];

// ============= Datos =============
const TAREAS_INICIALES = [
  { id: "1", nombre: "Estudiar React Native", emoji: "📚", hecha: false },
  { id: "2", nombre: "Practicar JavaScript", emoji: "⚡", hecha: true },
  { id: "3", nombre: "Preparar la exposición", emoji: "🎤", hecha: false },
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
export function PantallaTareas() {
  const [tareas, setTareas] = useState(TAREAS_INICIALES);
  const [texto, setTexto] = useState("");
  const [seleccionado, setSeleccionado] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const pendientes = tareas.filter((t) => !t.hecha).length;

  const agregarTarea = () => {
    if (!texto.trim()) return;
    setTareas((anteriores) => [
      ...anteriores,
      { id: String(Date.now()), nombre: texto.trim(), emoji: "📝", hecha: false },
    ]);
    setTexto("");
  };

  const alternarHecha = (id) =>
    setTareas((anteriores) =>
      anteriores.map((t) => (t.id === id ? { ...t, hecha: !t.hecha } : t)),
    );

  const actualizar = () => {
    setRefreshing(true);
    setTimeout(() => {
      setTareas(TAREAS_INICIALES);
      setRefreshing(false);
    }, 1000);
  };

  return (
    <View style={styles.pantalla}>
      <View style={styles.filaInput}>
        <TextInput
          style={styles.input}
          placeholder="¿Qué tienes que hacer?"
          placeholderTextColor={COLORES.tintaSuave}
          value={texto}
          onChangeText={setTexto}
          onSubmitEditing={agregarTarea}
          returnKeyType="done"
        />
        <Pressable
          onPress={agregarTarea}
          style={({ pressed }) => [styles.botonPrimario, pressed && styles.presionado]}
        >
          <Text style={styles.botonPrimarioTexto}>Agregar</Text>
        </Pressable>
      </View>

      <FlatList
        data={tareas}
        keyExtractor={(item) => item.id}
        extraData={seleccionado}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => setSeleccionado(item.id)}
            style={[styles.tarjetaItem, item.id === seleccionado && styles.seleccionado]}
          >
            <Text style={styles.emoji}>{item.emoji}</Text>
            <Text style={[styles.itemTexto, item.hecha && styles.itemHecho]}>
              {item.nombre}
            </Text>
            <Pressable
              onPress={() => alternarHecha(item.id)}
              hitSlop={8}
              style={[styles.check, item.hecha && styles.checkActivo]}
            >
              {item.hecha && <Text style={styles.checkMarca}>✓</Text>}
            </Pressable>
          </Pressable>
        )}
        ListHeaderComponent={
          <View style={styles.cabecera}>
            <Text style={styles.titulo}>Mis tareas</Text>
            <Text style={styles.subtitulo}>
              {pendientes === 0
                ? "¡Todo listo por hoy! 🎉"
                : `Te faltan ${pendientes} de ${tareas.length}`}
            </Text>
          </View>
        }
        ListFooterComponent={
          tareas.length > 0 ? (
            <Pressable onPress={() => setTareas([])} style={styles.botonTexto}>
              <Text style={styles.botonTextoLabel}>Vaciar lista</Text>
            </Pressable>
          ) : null
        }
        ItemSeparatorComponent={Separador}
        ListEmptyComponent={
          <View style={styles.vacioCaja}>
            <Text style={styles.vacioEmoji}>🌱</Text>
            <Text style={styles.vacio}>
              No hay tareas. Escribe una arriba para empezar.
            </Text>
          </View>
        }
        refreshing={refreshing}
        onRefresh={actualizar}
        initialNumToRender={10}
      />
    </View>
  );
}

// ---------- SectionList + estados ----------
export function PantallaContactos() {
  const [busqueda, setBusqueda] = useState("");
  const [favoritos, setFavoritos] = useState([]);

  const alternarFavorito = (id) =>
    setFavoritos((anteriores) =>
      anteriores.includes(id)
        ? anteriores.filter((f) => f !== id)
        : [...anteriores, id],
    );

  // El estado 'busqueda' determina qué secciones y contactos se muestran
  const secciones = CONTACTOS.map((s) => ({
    ...s,
    data: s.data.filter((c) =>
      c.nombre.toLowerCase().includes(busqueda.toLowerCase()),
    ),
  })).filter((s) => s.data.length > 0);

  return (
    <View style={styles.pantalla}>
      <View style={styles.cabecera}>
        <Text style={styles.titulo}>Contactos</Text>
        <Text style={styles.subtitulo}>
          {favoritos.length} favorito(s) · toca un contacto para marcarlo
        </Text>
      </View>

      <TextInput
        style={[styles.input, styles.inputBusqueda]}
        placeholder="🔍  Buscar contacto"
        placeholderTextColor={COLORES.tintaSuave}
        value={busqueda}
        onChangeText={setBusqueda}
      />

      <SectionList
        sections={secciones}
        keyExtractor={(item) => item.id}
        extraData={favoritos}
        contentContainerStyle={styles.lista}
        renderItem={({ item, index }) => {
          const esFavorito = favoritos.includes(item.id);
          return (
            <Pressable
              onPress={() => alternarFavorito(item.id)}
              style={[styles.tarjetaItem, esFavorito && styles.favorito]}
            >
              <View
                style={[
                  styles.avatar,
                  { backgroundColor: COLORES_AVATAR[(item.id.length + index + item.nombre.length) % COLORES_AVATAR.length] },
                ]}
              >
                <Text style={styles.avatarTexto}>{item.nombre[0]}</Text>
              </View>
              <View style={styles.contactoInfo}>
                <Text style={styles.itemTexto}>{item.nombre}</Text>
                <Text style={styles.telefono}>{item.telefono}</Text>
              </View>
              <Text style={[styles.estrella, esFavorito && styles.estrellaActiva]}>
                {esFavorito ? "★" : "☆"}
              </Text>
            </Pressable>
          );
        }}
        renderSectionHeader={({ section }) => (
          <View style={styles.encabezado}>
            <Text style={styles.encabezadoTexto}>{section.title}</Text>
          </View>
        )}
        renderSectionFooter={({ section }) => (
          <Text style={styles.pie}>{section.data.length} contacto(s)</Text>
        )}
        ItemSeparatorComponent={Separador}
        SectionSeparatorComponent={() => <View style={{ height: 4 }} />}
        stickySectionHeadersEnabled
        ListEmptyComponent={
          <View style={styles.vacioCaja}>
            <Text style={styles.vacioEmoji}>🕵️</Text>
            <Text style={styles.vacio}>Nadie se llama así. Prueba con otra letra.</Text>
          </View>
        }
      />
    </View>
  );
}

// ---------- App ----------
export default function ScreenFlat() {
  const [pantalla, setPantalla] = useState("tareas");

  const Pestana = ({ id, etiqueta }) => (
    <Pressable
      onPress={() => setPantalla(id)}
      style={[styles.pestana, pantalla === id && styles.pestanaActiva]}
    >
      <Text style={[styles.pestanaTexto, pantalla === id && styles.pestanaTextoActivo]}>
        {etiqueta}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.contenedor}>
      <StatusBar style="dark" />
      <View style={styles.pestanas}>
        <Pestana id="tareas" etiqueta="✅  Tareas" />
        <Pestana id="contactos" etiqueta="👥  Contactos" />
      </View>
      {pantalla === "tareas" ? <PantallaTareas /> : <PantallaContactos />}
    </View>
  );
}

const sombra = {
  shadowColor: "#2B1F6B",
  shadowOpacity: 0.08,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 4 },
  elevation: 2,
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    paddingTop: 56,
    paddingHorizontal: 16,
    backgroundColor: COLORES.fondo,
  },
  pantalla: { flex: 1 },
  lista: { paddingBottom: 32 },

  // Pestañas
  pestanas: {
    flexDirection: "row",
    backgroundColor: COLORES.primarioClaro,
    borderRadius: 14,
    padding: 4,
  },
  pestana: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 11,
    alignItems: "center",
  },
  pestanaActiva: { backgroundColor: COLORES.primario },
  pestanaTexto: { fontSize: 15, fontWeight: "600", color: COLORES.primario },
  pestanaTextoActivo: { color: "#FFFFFF" },

  // Cabecera
  cabecera: { paddingTop: 20, paddingBottom: 12 },
  titulo: {
    fontSize: 30,
    fontWeight: "800",
    color: COLORES.tinta,
    letterSpacing: -0.5,
  },
  subtitulo: { fontSize: 14, color: COLORES.tintaSuave, marginTop: 2 },

  // Inputs y botones
  filaInput: { flexDirection: "row", gap: 8, marginTop: 16 },
  input: {
    flex: 1,
    backgroundColor: COLORES.tarjeta,
    borderWidth: 1.5,
    borderColor: COLORES.borde,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 16,
    color: COLORES.tinta,
  },
  inputBusqueda: { flex: 0, marginBottom: 8 },
  botonPrimario: {
    backgroundColor: COLORES.primario,
    borderRadius: 12,
    paddingHorizontal: 18,
    justifyContent: "center",
  },
  botonPrimarioTexto: { color: "#FFFFFF", fontWeight: "700", fontSize: 15 },
  presionado: { opacity: 0.75, transform: [{ scale: 0.97 }] },
  botonTexto: { alignSelf: "center", padding: 14 },
  botonTextoLabel: { color: COLORES.coral, fontWeight: "600" },

  // Tarjetas de lista
  tarjetaItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORES.tarjeta,
    borderRadius: 14,
    padding: 14,
    borderLeftWidth: 4,
    borderLeftColor: "transparent",
    ...sombra,
  },
  seleccionado: {
    borderLeftColor: COLORES.primario,
    backgroundColor: "#F3F0FF",
  },
  favorito: { borderLeftColor: COLORES.sol, backgroundColor: "#FFFAEB" },
  separador: { height: 8 },
  emoji: { fontSize: 22, marginRight: 12 },
  itemTexto: { flex: 1, fontSize: 16, fontWeight: "600", color: COLORES.tinta },
  itemHecho: { textDecorationLine: "line-through", color: COLORES.tintaSuave },

  // Check de tareas
  check: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: COLORES.borde,
    alignItems: "center",
    justifyContent: "center",
  },
  checkActivo: { backgroundColor: COLORES.menta, borderColor: COLORES.menta },
  checkMarca: { color: "#FFFFFF", fontWeight: "800", fontSize: 14 },

  // Contactos
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarTexto: { color: "#FFFFFF", fontSize: 18, fontWeight: "700" },
  contactoInfo: { flex: 1 },
  telefono: { fontSize: 13, color: COLORES.tintaSuave, marginTop: 1 },
  estrella: { fontSize: 24, color: COLORES.borde },
  estrellaActiva: { color: COLORES.sol },
  encabezado: {
    alignSelf: "flex-start",
    backgroundColor: COLORES.primario,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 8,
    marginBottom: 6,
  },
  encabezadoTexto: { color: "#FFFFFF", fontSize: 15, fontWeight: "800" },
  pie: { paddingVertical: 8, paddingLeft: 4, color: COLORES.tintaSuave, fontSize: 12 },

  // Estado vacío
  vacioCaja: { alignItems: "center", paddingVertical: 40 },
  vacioEmoji: { fontSize: 40, marginBottom: 8 },
  vacio: { textAlign: "center", color: COLORES.tintaSuave, fontSize: 15 },
});