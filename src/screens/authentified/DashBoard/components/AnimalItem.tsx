import React from "react";
import {
  Text,
  Image,
  StyleSheet,
  View,
  ViewStyle,
  ImageStyle,
  TextStyle
} from "react-native";
import createIcon from "../../../../assets/icons/createIcon.png";

import Moment from "moment";
import "moment/locale/fr";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Animal } from "src/services/animalService";

type Props = {
  animal: Animal;
};

export const AnimalItem = ({ animal }: Props) => {
  const navigation = useNavigation();
  const handlePress = () => null;
  /*     navigation.navigate("addTests", { waterTest: waterTest });
   */
  return (
    <View style={styles.testContainer}>
      <View style={styles.header}>
        <View style={styles.item}>
          <Text style={styles.date}>
            Date d'arrinée : {Moment(animal.incomingDate).format("lll")}
          </Text>
          {animal.anemoneSpecies !== undefined ? (
            <Text style={styles.animalType}>
              Anémone : {animal.anemoneSpecies}
            </Text>
          ) : null}
          {animal.crustaceanSpecies !== undefined ? (
            <Text style={styles.animalType}>
              Crustacé : {animal.crustaceanSpecies}
            </Text>
          ) : null}
          {animal.cucumberSpecies !== undefined ? (
            <Text style={styles.animalType}>
              Concombre : {animal.cucumberSpecies}{" "}
            </Text>
          ) : null}
          {animal.fishSpecies !== undefined ? (
            <Text style={styles.animalType}>
              Poisson : {animal.fishSpecies}
            </Text>
          ) : null}
          {animal.lpsSpecies !== undefined ? (
            <Text style={styles.animalType}>LPS : {animal.lpsSpecies} </Text>
          ) : null}
          {animal.spsSpecies !== undefined ? (
            <Text style={styles.animalType}>SPS : {animal.spsSpecies} </Text>
          ) : null}
          {animal.softSpecies !== undefined ? (
            <Text style={styles.animalType}>Mou : {animal.softSpecies} </Text>
          ) : null}
          {animal.softSpecies !== undefined ? (
            <Text style={styles.animalType}>
              Détritivore : {animal.molluskSpecies}{" "}
            </Text>
          ) : null}
          {animal.urchinSpecies !== undefined ? (
            <Text style={styles.animalType}>
              Oursin : {animal.urchinSpecies}{" "}
            </Text>
          ) : null}
          {animal.starSpecies !== undefined ? (
            <Text>{animal.starSpecies} </Text>
          ) : null}

          <Text>{animal.name}</Text>
        </View>
        <TouchableOpacity onPress={handlePress}>
          <Image source={createIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <Text>Taille : {animal.currentSize}</Text>
      <Text>Quantité : {animal.quantity}</Text>
      <Text>Notes : {animal.notes}</Text>
    </View>
  );
};

type Style = {
  testContainer: ViewStyle;
  animalType: TextStyle;
  header: ViewStyle;
  icon: ImageStyle;
  item: ViewStyle;
  date: TextStyle;
};

const styles = StyleSheet.create<Style>({
  testContainer: {
    borderColor: "grey",
    borderRadius: 4,
    borderWidth: 1,
    padding: 8,
    margin: 8
  },
  item: {
    flex: 3
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  icon: {
    height: 32,
    width: 32
  },
  date: {
    fontWeight: "bold"
  },
  animalType: {
    color: "blue"
  }
});
