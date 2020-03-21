import React from "react";
import { Header, Text } from "react-native-elements";
import { View } from "react-native";
import { EquipmentForm } from "./components/EquipmentForm";

export const NewEquipmentScreen = ({ route }) => {
  const { equipment } = route.params;
  return (
    <View>
      <Header
        centerComponent={
          <Text style={{ fontSize: 16 }}>Ajouter un matériel</Text>
        }
        backgroundColor="red"
      />

      <EquipmentForm equipmentToUpdate={equipment} />
    </View>
  );
};
