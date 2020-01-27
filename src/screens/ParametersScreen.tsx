import React from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";

class ParametersScreen extends React.Component {
  render() {
    return (
      <View style={style.container}>
        <Text>Paramètres</Text>
        <TouchableOpacity>
          <Text>OPTIONS</Text>
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

export default ParametersScreen;
