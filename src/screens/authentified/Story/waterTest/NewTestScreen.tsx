import React from "react";
import { View, Text } from "react-native";
import { Header } from "react-native-elements";
import { WaterTestForm } from "./WaterTestForm";
import Moment from "moment";
import "moment/locale/fr";

export const NewTestScreen = ({ route }) => {
  const { waterTest } = route.params;

  const title =
    waterTest !== null
      ? "Modification de votre test du " + Moment(waterTest.date).format("lll")
      : "Ajout d'un nouveau test";

  return (
    <View>
      <Header
        centerComponent={<Text style={{ fontSize: 16 }}>{title}</Text>}
        backgroundColor="green"
      />

      <WaterTestForm waterTestToUpdate={waterTest} />
    </View>
  );
};
