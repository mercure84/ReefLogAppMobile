import React, { useState } from "react";
import {
  Text,
  View,
  ViewStyle,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { ReefButton } from "../../../../components/ReefButton";

import { Header } from "react-native-elements";
import RootStore from "../../../../store/RootStore";
import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import { AnimalItem } from "./AnimalItem";
import { GoBackButton } from "../../../../components/GoBackButton";
import { ReefHeaderTitle } from "../../../../components/ReefHeaderTitle";

export const PopulationScreen = observer(() => {
  const navigation = useNavigation();
  if (RootStore.animalStore.animalState === "pending") {
    RootStore.animalStore.fetchAnimals();
  }
  const isAnimalsLoading = RootStore.animalStore.animalState === "pending";
  const dataAnimals = RootStore.animalStore.animalsData;
  return (
    <View style={styles.page}>
      <Header
        leftComponent={<GoBackButton />}
        centerComponent={<ReefHeaderTitle title="Mes pensionnaires" />}
        backgroundColor="white"
        backgroundImage={require("../../../../assets/animals.png")}
        backgroundImageStyle={{ opacity: 0.8 }}
      />
      <ReefButton
        onPress={() => navigation.navigate("newAnimal")}
        title="Ajouter un pensionnaire"
      />

      {isAnimalsLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          style={{ marginBottom: 64 }}
          data={dataAnimals}
          renderItem={({ item }) => <AnimalItem animal={item} />}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text>Aucun enregistrement</Text>}
          scrollEnabled={true}
        />
      )}
    </View>
  );
});

type Style = {
  page: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  page: {
    alignItems: "stretch",
  },
});
