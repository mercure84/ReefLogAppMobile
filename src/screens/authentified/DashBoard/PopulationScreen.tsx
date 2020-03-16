import React, { useState } from "react";
import {
  Text,
  View,
  ViewStyle,
  StyleSheet,
  ActivityIndicator,
  Button
} from "react-native";
import { Header } from "react-native-elements";
import RootStore from "../../../store/RootStore";
import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import { AnimalsListDisplay } from "./components/AnimalsListDisplay";

export const PopulationScreen = observer(() => {
  const navigation = useNavigation();
  const [rootStore, setRootStore] = useState(RootStore);
  if (rootStore.animalStore.animalState === "pending") {
    rootStore.animalStore.fetchAnimals();
  }
  const isAnimalsLoading = rootStore.animalStore.animalState === "pending";
  const dataAnimals = rootStore.animalStore.animalsData;
  return (
    <View style={styles.page}>
      <Header
        centerComponent={
          <Text style={{ fontSize: 16 }}>Mes pensionnaires</Text>
        }
        backgroundColor="green"
      />
      <Button
        onPress={() => navigation.navigate("newAnimal")}
        title="Ajouter un pensionnaire"
      />

      {isAnimalsLoading ? (
        <ActivityIndicator />
      ) : (
        <AnimalsListDisplay animals={dataAnimals} />
      )}
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
