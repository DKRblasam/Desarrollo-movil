import { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Animated,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackBar } from "@/components/menu/BackBar";
import { PracticeButton } from "@/components/menu/PracticeButton";
import { useHardwareBack } from "@/hooks/useHardwareBack";
import { PRACTICES } from "@/navigation/practices";
import { globalStyles } from "@/styles/globalStyles";

export default function MenuScreen() {
  // key de la práctica abierta; null = se muestra el menú
  const [activeKey, setActiveKey] = useState(null);

  // Animación de entrada del encabezado (una sola vez)
  const [headerAnim] = useState(() => new Animated.Value(0));
  useEffect(() => {
    Animated.timing(headerAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: Platform.OS !== "web",
    }).start();
  }, [headerAnim]);

  const goToMenu = useCallback(() => setActiveKey(null), []);

  // El botón "atrás" de Android regresa al menú en vez de cerrar la app
  const handleHardwareBack = useCallback(() => {
    if (activeKey === null) return false;
    setActiveKey(null);
    return true;
  }, [activeKey]);
  useHardwareBack(handleHardwareBack);

  // ------------- Vista de una práctica -------------
  const active = PRACTICES.find((p) => p.key === activeKey);

  if (active) {
    const { Screen } = active;
    return (
      <View style={styles.flex}>
        <BackBar
          onBack={goToMenu}
          title={`${active.emoji} ${active.title}`}
          color={active.color}
        />
        <View style={styles.flex}>
          <Screen />
        </View>
      </View>
    );
  }

  // ------------- Vista del menú -------------
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={{
            opacity: headerAnim,
            transform: [
              {
                translateY: headerAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-16, 0],
                }),
              },
            ],
          }}
        >
          <Text style={[globalStyles.menuTitle, styles.title]}>
            ¡Explora el menú!
          </Text>
          <Text style={styles.subtitle}>
            Selecciona una práctica para comenzar 🚀
          </Text>
        </Animated.View>

        {PRACTICES.map((item) => (
          <PracticeButton
            key={item.key}
            item={item}
            onPress={() => setActiveKey(item.key)}
          />
        ))}

        <Text style={styles.footer}>
          {PRACTICES.length} prácticas disponibles
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingTop: 50,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 24,
  },
  footer: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 10,
  },
});
