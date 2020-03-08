import React from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { removeData, getData } from "../../../services/storageDevice";

export const disconnect = () => {
  removeData("token");
};

const ParametersScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={style.container}>
      <Text>Paramètres</Text>
      <TouchableOpacity>
        <Text>OPTIONS</Text>
      </TouchableOpacity>
      <Button
        title="Se déconnecter"
        onPress={() => (disconnect(), navigation.navigate("Signout"))}
      />
      <Button title="Afficher le Token" onPress={() => getData("token")} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ParametersScreen;