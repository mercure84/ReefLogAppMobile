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
import { Animal, AnimalType } from "../../../../services/animalService";
import RootStore from "../../../../store/RootStore";
import { CustomModal } from "../../../../components/ModalDeleteConfirmation";
import { getAnimalType, getIconForAnimal } from "../../../../utils/helpers";

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
    RootStore.animalStore.fetchAnimals();
    handlePressDelete();
  };
  return (
    <View style={styles.testContainer}>
      <View style={styles.horizontalWrapper}>
        <View >
          <View style={styles.leftWrapper}>
            <Image style={styles.icon} source={getIconForAnimal(animal)} />
            <View style={styles.animalTitle}>
              <Text style={styles.animalType}>
                {AnimalType[getAnimalType(animal)]}
              </Text>

              <Text>{`${animal[getAnimalType(animal) + "Species"]} ${
                animal.name ?? ""
              }`}</Text>
            </View>
     
          </View>
          <Text style={styles.date}>
              Date d'arrivée : {Moment(animal.incomingDate).format("ll")}
            </Text>
          <View style={styles.horizontalWrapper}>
            <Text>Taille : {animal.currentSize}</Text>
            <Text>Quantité : {animal.quantity}</Text>
          </View>
 
          <Text>Notes : {animal.notes}</Text>
        </View>

        <View style={styles.groupIcon}>
          <TouchableOpacity onPress={handlePress}>
            <Image source={createIcon} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePressDelete}>
            <Image source={deleteIcon} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

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
  groupIcon: ViewStyle;
  horizontalWrapper: ViewStyle;
  animalType: TextStyle;
  icon: ImageStyle;
  date: TextStyle;
  animalTitle: ViewStyle;
  leftWrapper : ViewStyle;
};

const styles = StyleSheet.create<Style>({
  leftWrapper : {
 flexDirection : "row"
  },
  testContainer: {
    borderColor: "grey",
    borderRadius: 4,
    borderWidth: 1,
    padding: 8,
    margin: 8
  },
  animalTitle: {
    marginLeft : 16,
    justifyContent : "flex-start"
  },
  groupIcon: {
    flexDirection: "row",
    justifyContent: "center"
  },
  icon: {
    height: 32,
    width: 32,
  },
  date: {
    fontWeight: "bold"
  },
  animalType: {
    color: "blue"
  },
  horizontalWrapper: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
