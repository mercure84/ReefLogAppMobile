import React, { useState } from "react";
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
import deleteIcon from "../../../../assets/icons/deleteIcon.png";

import Moment from "moment";
import "moment/locale/fr";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import {
  Animal,
  AnimalType,
  getAnimalType
} from "../../../../services/animalService";
import RootStore from "../../../../store/RootStore";
import { CustomModal } from "../../../../components/ModalDeleteConfirmation";

type Props = {
  animal: Animal;
};

export const AnimalItem = ({ animal }: Props) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("updateAnimal", { animal: animal });
  };
  const [isModalVisible, setModalVisible] = useState(false);

  const handlePressDelete = () => {
    isModalVisible ? setModalVisible(false) : setModalVisible(true);
  };

  const confirmDelete = (pAnimal: Animal) => {
    RootStore.animalStore.storeDeleteAnimal(pAnimal.id);
    RootStore.animalStore.animalState = "pending";
    handlePressDelete();
  };
  return (
    <View style={styles.testContainer}>
      <View style={styles.header}>
        <View style={styles.item}>
          <Text style={styles.date}>
            Date d'arrivée : {Moment(animal.incomingDate).format("ll")}
          </Text>

          <Text style={styles.animalType}>
            {`${AnimalType[getAnimalType(animal)]} : ${
              animal[getAnimalType(animal) + "Species"]
            }`}
          </Text>
          <Text>{animal.name}</Text>
        </View>
        <TouchableOpacity onPress={handlePress}>
          <Image source={createIcon} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressDelete}>
          <Image source={deleteIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <Text>Taille : {animal.currentSize}</Text>
      <Text>Quantité : {animal.quantity}</Text>
      <Text>Notes : {animal.notes}</Text>

      <CustomModal
        isModaleVisible={isModalVisible}
        message={`Confirmez vous la suppression de l'animal :
        ${animal.name} arrivé le ${Moment(animal.incomingDate).format("ll")} ?`}
        buttonYesFonction={() => confirmDelete(animal)}
        buttonNoFonction={handlePressDelete}
      />
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
