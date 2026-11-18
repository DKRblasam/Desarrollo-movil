import { View, Text, Image, StyleSheet } from "react-native";

export default function HeaderCoffee() {
  return (
    <View style={styles.headerContainer}>
      {/* <Image
        source={require("@assets/images/coffee-header.png")}
        // style={styles.headerImage}
      /> */}
      <Text style={styles.headerText}>Encabezado Cafeteria</Text>
      <Text style={styles.headerSubtext}>Bienvenido a nuestra cafeteria</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#403d39',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtext: {
    fontSize: 16,
    color: '#fff',
  },
});
