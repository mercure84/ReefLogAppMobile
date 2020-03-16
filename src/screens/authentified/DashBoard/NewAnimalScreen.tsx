import React, { useState } from "react";
import {
  Text,
  View,
  ViewStyle,
  StyleSheet,
  Button,
  Image,
  ImageStyle
} from "react-native";
import { Header } from "react-native-elements";
import { observer } from "mobx-react";
import { AnimalForm } from "./components/AnimalForm";
import { TouchableOpacity } from "react-native-gesture-handler";
import fishIcon from "../../../assets/icons/fish.png";
import coralIcon from "../../../assets/icons/coral.png";
import reefCleanerIcon from "../../../assets/icons/reefcleaner.png";

export const NewAnimalScreen = observer(() => {
  const [showForm, setShowForm] = useState(false);
  const [animalType, setAnimalType] = useState("");
  const showAnimalForm = (animalTypeForm: string) => {
    setShowForm(true);
    setAnimalType(animalTypeForm);
  };

  return (
    <View style={styles.page}>
      <Header
        centerComponent={
          <Text style={{ fontSize: 16 }}>
            Ajouter / Modifier un pensionnaire
          </Text>
        }
        backgroundColor="red"
      />
      {!showForm && (
        <View>
          <Text>Quel animal souhaitez-vous ajouter ?</Text>

          <View style={styles.iconsChoiceContainer}>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => showAnimalForm("fish")}
            >
              <Image source={fishIcon} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => showAnimalForm("coral")}
            >
              <Image source={coralIcon} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => showAnimalForm("reefCleaner")}
            >
              <Image source={reefCleanerIcon} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      )}
      {showForm && (
        <AnimalForm animalToSave={null} animalTypeForm={animalType} />
      )}
    </View>
  );
});

type Style = {
  page: ViewStyle;
  iconsChoiceContainer: ViewStyle;
  icon: ImageStyle;
  iconContainer: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  page: {
    alignItems: "stretch"
  },
  iconsChoiceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8
  },
  icon: {
    width: 96,
    height: 96
  },
  iconContainer: {
    padding: 8
  }
});
