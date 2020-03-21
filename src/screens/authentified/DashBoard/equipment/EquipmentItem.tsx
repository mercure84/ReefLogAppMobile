import React, { useState } from "react";
import { Equipment } from "../../../../services/equipmentService";
import { useNavigation } from "@react-navigation/native";
import {
  ViewStyle,
  TextStyle,
  ImageStyle,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Button
} from "react-native";
import Moment from "moment";
import Modal from "react-native-modal";

type Props = {
  equipment: Equipment;
};
import createIcon from "../../../../assets/icons/createIcon.png";
import deleteIcon from "../../../../assets/icons/deleteIcon.png";
import { Card } from "react-native-elements";
import RootStore from "../../../../store/RootStore";

export const EquipmentItem = ({ equipment }: Props) => {
  const navigation = useNavigation();
  const [rootStore] = useState(RootStore);
  const handlePress = () => {
    navigation.navigate("saveEquipment", { equipment: equipment });
  };
  const [isModalVisible, setModalVisible] = useState(false);

  const handlePressDelete = () => {
    isModalVisible ? setModalVisible(false) : setModalVisible(true);
  };

  const confirmDelete = (pEquipment: Equipment) => {
    rootStore.equipmentStore.storeDeleteEquipment(pEquipment.id);
    handlePressDelete();
  };

  return (
    <View style={styles.testContainer}>
      <View style={styles.header}>
        <View style={styles.item}>
          <Text style={styles.date}>
            Date d'installation :
            {Moment(equipment.dateInstallation).format("lll")}
          </Text>
          <Text>Type : {equipment.typeOfEquipment}</Text>
          {equipment.mark !== undefined && (
            <Text>Marque : {equipment.mark}</Text>
          )}
          {equipment.model !== undefined && (
            <Text>Modèle : {equipment.model}</Text>
          )}
        </View>
        <TouchableOpacity onPress={handlePress}>
          <Image source={createIcon} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressDelete}>
          <Image source={deleteIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <Text>Quantité : {equipment.quantity}</Text>
      <Text>Notes : {equipment.description}</Text>

      <Modal isVisible={isModalVisible} backdropOpacity={0.5}>
        <View style={{ flex: 0.5, justifyContent: "center" }}>
          <Card>
            <Text>
              Confirmez vous la suppression de l'équipement{" "}
              {equipment.typeOfEquipment} {equipment.mark}{" "}
            </Text>
          </Card>
          <Button title="Oui" onPress={() => confirmDelete(equipment)} />
          <Button title="Non" onPress={handlePressDelete} />
        </View>
      </Modal>
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
