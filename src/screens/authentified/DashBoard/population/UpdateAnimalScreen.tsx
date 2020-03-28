import React, { useState } from "react";
import { observer } from "mobx-react";
import { View, ViewStyle, StyleSheet, Text } from "react-native";
import { Header } from "react-native-elements";
import { AnimalForm } from "./AnimalForm";
import { getSpecies } from "../../../../services/animalService";
import { GoBackButton } from "../../../../components/GoBackButton";

export const UpdateAnimalScreen = observer(({ route }) => {
  const { animal } = route.params;

  return (
    <View style={styles.page}>
      <Header
        leftComponent={<GoBackButton />}
        centerComponent={
          <Text style={{ fontSize: 16 }}>Ajouter un pensionnaire</Text>
        }
        backgroundColor="red"
      />

      <AnimalForm animalToSave={animal} animalTypeForm={getSpecies(animal)} />
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
