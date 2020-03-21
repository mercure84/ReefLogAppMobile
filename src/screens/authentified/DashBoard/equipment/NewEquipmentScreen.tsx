import React from "react";
import { Header, Text } from "react-native-elements";
import { View } from "react-native";
import { EquipmentForm } from "./EquipmentForm";

export const NewEquipmentScreen = ({ route }) => {
  const { equipment } = route.params;
  return (
    <View>
      <Header
        centerComponent={
          <Text style={{ fontSize: 16 }}>Ajouter un matériel</Text>
        }
        backgroundColor="yellow"
      />

      <EquipmentForm equipmentToUpdate={equipment} />
    </View>
  );
};
