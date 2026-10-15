// ===================================================
//                Zona de importaciones
// ===================================================
import { View, Text, Image, StyleSheet } from "react-native";
// ===================================================
//                  Zona de imágenes
// ===================================================
const IMG_PORTADA = require("../assets/profile/portada.jpg");
const IMG_FOTO = require("../assets/profile/catastico1.png");
// ===================================================
//                  Datos del perfil
// ===================================================
const DATOS = [
  {
    etiqueta: "Carrera",
    valor: "Ingeniería en Tecnologías de la Información e Innovación Digital",
  },
  { etiqueta: "Materia", valor: "Desarrollo de aplicaciones móviles" },
  { etiqueta: "Cuatrimestre", valor: "4to" },
];
// ===================================================
//                   Zona del MAIN
// ===================================================
export const Me_prfle = () => {
  return (
    <View style={styles.pantalla}>
      {/* Portada + foto de perfil */}
      <View style={styles.cabecera}>
        <Image
          source={IMG_PORTADA}
          style={styles.portada}
          resizeMode="cover"
          accessibilityLabel="Imagen de portada"
        />
        <Image
          source={IMG_FOTO}
          style={styles.avatar}
          resizeMode="cover"
          accessibilityLabel="Foto de perfil"
        />
      </View>

      {/* Nombre */}
      <View style={styles.bloqueNombre}>
        <Text style={styles.nombre}>Blas Amador Ian David</Text>
        <Text style={styles.subtitulo}>Estudiante de desarrollo móvil</Text>
      </View>

      {/* Datos académicos */}
      <View style={styles.tarjeta}>
        {DATOS.map((d, i) => (
          <View
            key={d.etiqueta}
            style={[styles.fila, i < DATOS.length - 1 && styles.filaSeparada]}
          >
            <Text style={styles.etiqueta}>{d.etiqueta}</Text>
            <Text style={styles.valor}>{d.valor}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

// ===================================================
//                      Estilos
// ===================================================
const TINTA = "#1B2B4B";
const AZUL = "#2F6FED";
const PAPEL = "#F3F6FB";
const GRIS = "#5E6B82";
const LINEA = "#DCE3EF";

const styles = StyleSheet.create({
  pantalla: { flex: 0.5, backgroundColor: PAPEL },

  cabecera: { marginBottom: 56 },
  portada: { width: "100%", height: 170 },
  avatar: {
    position: "absolute",
    bottom: -48,
    left: 20,
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: PAPEL,
  },

  bloqueNombre: { paddingHorizontal: 20, marginBottom: 20 },
  nombre: { fontSize: 26, fontWeight: "700", color: TINTA },
  subtitulo: { fontSize: 15, color: AZUL, marginTop: 4 },

  // El toquecito: una sombra suave para que la tarjeta "flote"
  tarjeta: {
    marginHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 16,
    shadowColor: TINTA,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3, // equivalente de la sombra en Android
  },
  fila: { paddingVertical: 14 },
  filaSeparada: { borderBottomWidth: 1, borderBottomColor: LINEA },
  etiqueta: { fontSize: 13, fontWeight: "600", color: AZUL, marginBottom: 2 },
  valor: { fontSize: 16, color: TINTA, lineHeight: 22 },
});