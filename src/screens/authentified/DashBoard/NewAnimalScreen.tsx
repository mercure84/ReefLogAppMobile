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
import RootStore from "../../../store/RootStore";

export const NewAnimalScreen = observer(() => {
  const [rootStore, setRootStore] = useState(RootStore);

  const [showForm, setShowForm] = useState(false);
  const [animalType, setAnimalType] = useState("");
  const showAnimalForm = (animalTypeForm: string) => {
    setShowForm(true);
    showReefCleenerSelection(false);
    showCoralSelection(false);
    setAnimalType(animalTypeForm);
  };

  const [isCoralSelection, showCoralSelection] = useState(false);
  const [isReefCleanerSelection, showReefCleenerSelection] = useState(false);

  const handleCoralSelection = () => {
    showCoralSelection(true);
    showReefCleenerSelection(false);
  };

  const handleReefCleanerSelection = () => {
    showCoralSelection(false);
    showReefCleenerSelection(true);
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
              onPress={handleCoralSelection}
            >
              <Image source={coralIcon} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={handleReefCleanerSelection}
            >
              <Image source={reefCleanerIcon} style={styles.icon} />
            </TouchableOpacity>
          </View>
          {isCoralSelection && (
            <View>
              <Button title="Soft" onPress={() => showAnimalForm("soft")} />
              <Button title="LPS" onPress={() => showAnimalForm("lps")} />
              <Button title="SPS" onPress={() => showAnimalForm("sps")} />
              <Button
                title="Anémone"
                onPress={() => showAnimalForm("anemone")}
              />
            </View>
          )}

          {isReefCleanerSelection && (
            <View>
              <Button title="Oursin" onPress={() => showAnimalForm("urchin")} />
              <Button title="Etoile" onPress={() => showAnimalForm("star")} />
              <Button
                title="Concombre"
                onPress={() => showAnimalForm("cucumber")}
              />
              <Button
                title="Crustacé"
                onPress={() => showAnimalForm("crustacean")}
              />

              <Button
                title="Mollusque"
                onPress={() => showAnimalForm("mollusk")}
              />
            </View>
          )}
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
