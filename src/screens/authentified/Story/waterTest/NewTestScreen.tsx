import React from "react";
import { View } from "react-native";
import { Header } from "react-native-elements";
import { WaterTestForm } from "./WaterTestForm";
import "moment/locale/fr";
import { GoBackButton } from "../../../../components/GoBackButton";
import { ReefHeaderTitle } from "../../../../components/ReefHeaderTitle";

export const NewTestScreen = ({ route }) => {
  const { waterTest } = route.params;

  const title =
    waterTest !== null ? "Modification de votre test" : "Nouveau test";

  return (
    <View>
      <Header
        leftComponent={<GoBackButton />}
        centerComponent={<ReefHeaderTitle title={title} />}
        backgroundColor="white"
        backgroundImage={require("../../../../assets/story.png")}
        backgroundImageStyle={{ opacity: 0.8 }}
      />

      <WaterTestForm waterTestToUpdate={waterTest} />
    </View>
  );
};


