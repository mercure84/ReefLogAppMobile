import React, { useState } from "react";
import {
  Image,
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Fish } from "../../../../store/FishStore";
import RootStore from "../../../../store/RootStore";
import Moment from "moment";
import createIcon from "../../../../assets/icons/createIcon.png";
import deleteIcon from "../../../../assets/icons/deleteIcon.png";
import { DeleteModal } from "../../../../components/DeleteModal";
import { FishFormModal } from "./FishFormModal";

type Props = {
  fish: Fish;
};

export const FishItem = ({ fish }: Props) => {
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
  const handlePress = () => {
    setUpdateModalVisible(true);
  };

  const handlePressDelete = () => {
    setDeleteModalVisible(!isDeleteModalVisible);
  };

  const confirmDelete = async (pFish: Fish) => {
    await RootStore.fishStore.storeDeleteFish(pFish.id);
    handlePressDelete();
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <View style={styles.item}>
          <Text style={styles.date}>{fish.name}</Text>
          <Text>Date d'arrivée : {Moment(fish.incomingDate).format("ll")}</Text>
          {fish.birthDate && (
            <Text>
              Date de naissance : {Moment(fish.birthDate).format("ll")}
            </Text>
          )}
        </View>
        <TouchableOpacity onPress={handlePress}>
          <Image source={createIcon} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressDelete}>
          <Image source={deleteIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View>
        {fish.sex && <Text>Sexe : {fish.sex}</Text>}
        <Text>Taile : {fish.size}</Text>
        {fish.note && <Text>Notes : {fish.note}</Text>}
      </View>

      <DeleteModal
        isModaleVisible={isDeleteModalVisible}
        message={`Confirmez vous la suppression de :
        ${fish.name} ${fish.size} ?`}
        buttonYesFonction={() => confirmDelete(fish)}
        buttonNoFonction={handlePressDelete}
      />

      {isUpdateModalVisible && (
        <FishFormModal
          fishToSave={fish}
          showForm={setUpdateModalVisible}
          visible={isUpdateModalVisible}
        />
      )}
    </View>
  );
};

type Style = {
  mainContainer: ViewStyle;
  header: ViewStyle;
  icon: ImageStyle;
  item: ViewStyle;
  date: TextStyle;
};

const styles = StyleSheet.create<Style>({
  mainContainer: {
    borderColor: "grey",
    borderRadius: 4,
    borderWidth: 1,
    padding: 8,
    margin: 8,
  },
  item: {
    flex: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  icon: {
    height: 32,
    width: 32,
  },
  date: {
    fontWeight: "bold",
  },
});
