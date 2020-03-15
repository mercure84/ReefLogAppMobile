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
          {animal.anemoneSpecies !== null ? (
            <Text>Anémone : {animal.anemoneSpecies}</Text>
          ) : null}
          {animal.crustaceanSpecies !== null ? (
            <Text>Détritivore : {animal.crustaceanSpecies}</Text>
          ) : null}
          {animal.cucumberSpecies !== null ? (
            <Text>Concombre : {animal.cucumberSpecies} </Text>
          ) : null}
          {animal.fishSpecies !== null ? (
            <Text>Poisson : {animal.fishSpecies}</Text>
          ) : null}
          {animal.lpsSpecies !== null ? (
            <Text>LPS : {animal.lpsSpecies} </Text>
          ) : null}
          {animal.spsSpecies !== null ? (
            <Text>SPS : {animal.spsSpecies} </Text>
          ) : null}
          {animal.softSpecies !== null ? (
            <Text>Mou : {animal.softSpecies} </Text>
          ) : null}
          {animal.softSpecies !== null ? (
            <Text>Détritivore : {animal.molluskSpecies} </Text>
          ) : null}
          {animal.urchinSpecies !== null ? (
            <Text>Oursin : {animal.urchinSpecies} </Text>
          ) : null}
          {animal.starSpecies !== null ? (
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
  }
});
