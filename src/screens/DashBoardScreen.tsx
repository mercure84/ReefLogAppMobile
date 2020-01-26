import React from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

class DashboardScreen extends React.Component {
  render() {
    return (
      <View style={style.container}>
        <Text>Votre Tableau de Bord</Text>
        <Ionicons name="ios-settings" size={25} />

        <Text>Mon aquarium</Text>
        <Text>Mes derniers tests</Text>
        <Text>Mes évènements</Text>
        <Text>Followers : </Text>
        <TouchableOpacity></TouchableOpacity>
        <Button title="Un bouton" onPress={null} />
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default DashboardScreen;
