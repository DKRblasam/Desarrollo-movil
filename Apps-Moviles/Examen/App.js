// ===================================================
//                   Zona de importaciones
// ===================================================


import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Antojos from '@screens/Antojo-express';

// ===================================================
//                   Zona del MAIN
// ===================================================

export default function App() {
  return (
    <View >
      <Antojos />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0dcca',
    alignItems: 'start',
    justifyContent: 'center',
  },
});
