import React from "react";
import { observer } from "mobx-react";
import { View, ViewStyle, StyleSheet } from "react-native";
import { Header } from "react-native-elements";
import { AnimalForm } from "./AnimalForm";
import { GoBackButton } from "../../../../components/GoBackButton";
import { ReefHeaderTitle } from "../../../../components/ReefHeaderTitle";
import { getAnimalType } from "../../../../utils/helpers";

export const UpdateAnimalScreen = observer(({ route }) => {
  const { animal } = route.params;

  return (
    <View style={styles.page}>
      <Header
        leftComponent={<GoBackButton />}
        centerComponent={<ReefHeaderTitle title="Modifier un pensionnaire" />}
        backgroundColor="white"
        backgroundImage={require("../../../../assets/coral.png")}
        backgroundImageStyle={{ opacity: 0.8 }}
      />

      <AnimalForm
        animalToSave={animal}
        animalTypeForm={getAnimalType(animal)}
      />
    </View>
  );
});

type Style = {
  page: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  page: {
    alignItems: "stretch"
  }
});
