import React from "react";
import { Header } from "react-native-elements";
import { ReefHeaderTitle } from "../../../components/ReefHeaderTitle";
import { ReefButton } from "../../../components/ReefButton";
import { View } from "react-native";

export const SocialScreen = () => {
  return (
    <>
      <Header
        centerComponent={<ReefHeaderTitle title="COMMUNAUTE" />}
        backgroundColor="white"
        backgroundImage={require("../../../assets/social.png")}
        backgroundImageStyle={{ opacity: 0.8 }}
      />
      <View>
        <ReefButton
          title="Voir les aquariums de la communauté"
          onPress={displayTanks}
        />
      </View>
    </>
  );
};
