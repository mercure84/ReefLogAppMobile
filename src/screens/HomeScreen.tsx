import React from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={style.container}>
        <Text>Bienvenue sur REEFLOG !</Text>
        <Button title="Créer un compte" onPress={null} />
        <Button title="Se connecter" onPress={null} />

        <TouchableOpacity>
          <Text> A propos </Text>
        </TouchableOpacity>
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

export default HomeScreen;
