import React from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import { getData, removeData, storeData } from "../services/storageDevice";

const ParametersScreen = () => {

  return (
    <View style={style.container}>
      <Text>Paramètres</Text>
      <TouchableOpacity>
        <Text>OPTIONS</Text>
      </TouchableOpacity>
      <Button title="Kill Token" onPress={() => removeData('id_token')} />
      <Button title="Display Token" onPress={() => getData('id_token')} />


    </View>
  );
}


const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ParametersScreen;
