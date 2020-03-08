import React from "react";
import { View, Text } from "react-native";
import { Header } from "react-native-elements";

export const NewTestScreen = () => {
  return (
    <View>
      <Header
        centerComponent={
          <Text style={{ fontSize: 16 }}>Ajout d'un test de mon eau</Text>
        }
        backgroundColor="green"
      />
    </View>
  );
};
