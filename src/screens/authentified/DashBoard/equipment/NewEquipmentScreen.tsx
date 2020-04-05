import React from "react";
import { Header, Text } from "react-native-elements";
import { View } from "react-native";
import { EquipmentForm } from "./EquipmentForm";
import { GoBackButton } from "../../../../components/GoBackButton";
import { ReefHeaderTitle } from "../../../../components/ReefHeaderTitle";

export const NewEquipmentScreen = ({ route }) => {
  const { equipment } = route.params;
  return (
    <View>
      <Header
        leftComponent={<GoBackButton />}
        centerComponent={
          <ReefHeaderTitle
            title={
              equipment === null
                ? "Nouvel équipement"
                : "Modifier un équipement"
            }
          />
        }
        backgroundColor="white"
        backgroundImage={require("../../../../assets/equipment.png")}
        backgroundImageStyle={{ opacity: 0.8 }}
      />

      <EquipmentForm equipmentToUpdate={equipment} />
    </View>
  );
};
