import React from "react";
import { Header, Text } from "react-native-elements";
import { View } from "react-native";
import { EquipmentForm } from "./EquipmentForm";
import { GoBackButton } from "../../../../components/GoBackButton";

export const NewEquipmentScreen = ({ route }) => {
  const { equipment } = route.params;
  return (
    <View>
      <Header
        leftComponent={<GoBackButton />}
        centerComponent={
          <Text style={{ fontSize: 16 }}>Ajouter un matériel</Text>
        }
        backgroundColor="yellow"
      />

      <EquipmentForm equipmentToUpdate={equipment} />
    </View>
  );
};
