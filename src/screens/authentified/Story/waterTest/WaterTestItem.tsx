import React, { useState } from "react";
import { WaterTest } from "../../../../services/waterTestService";
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
import RootStore from "../../../../store/RootStore";

import Moment from "moment";
import "moment/locale/fr";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { CustomModal } from "../../../../components/ModalDeleteConfirmation";

type Props = {
  waterTest: WaterTest;
};

export const WaterTestItem = ({ waterTest }: Props) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [rootStore] = useState(RootStore);

  const navigation = useNavigation();
  const handlePress = () =>
    navigation.navigate("addTests", { waterTest: waterTest });

  const handlePressDelete = () => {
    isModalVisible ? setModalVisible(false) : setModalVisible(true);
  };

  const confirmDelete = (pWaterTest: WaterTest) => {
    rootStore.waterTestStore.storeDeleteWaterTest(pWaterTest.id);
    rootStore.waterTestStore.fetchWaterTestList();
    handlePressDelete();
  };

  return (
    <View style={styles.testContainer}>
      <View style={styles.header}>
        <View style={styles.item}>
          <Text style={styles.date}>
            Date : {Moment(waterTest.date).format("lll")}
          </Text>
        </View>
        <TouchableOpacity onPress={handlePress}>
          <Image source={createIcon} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressDelete}>
          <Image source={deleteIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {waterTest.temperature !== null ? (
        <Text>Température : {waterTest.temperature} °C </Text>
      ) : null}
      {waterTest.salinity !== null ? (
        <Text>Salinité : {waterTest.salinity} ppt</Text>
      ) : null}
      {waterTest.alcalinity !== null ? (
        <Text>KH : {waterTest.alcalinity} </Text>
      ) : null}
      {waterTest.calcium !== null ? (
        <Text>Calcium : {waterTest.calcium} ppm</Text>
      ) : null}
      {waterTest.magnesium !== null ? (
        <Text>Magnesium : {waterTest.magnesium} ppm </Text>
      ) : null}
      {waterTest.ammoniac !== null ? (
        <Text>NH4 : {waterTest.ammoniac} ppm</Text>
      ) : null}
      {waterTest.nitrates !== null ? (
        <Text>NO3 : {waterTest.nitrates} ppm</Text>
      ) : null}
      {waterTest.nitrites !== null ? (
        <Text>NO2 : {waterTest.nitrites} ppm</Text>
      ) : null}
      {waterTest.silicates !== null ? (
        <Text>Silicates : {waterTest.silicates} ppm </Text>
      ) : null}
      {waterTest.ph !== null ? <Text>pH : {waterTest.ph} </Text> : null}

      <CustomModal
        isModaleVisible={isModalVisible}
        message={`Confirmez vous la suppression du test du "
        ${waterTest.date} ?`}
        buttonYesFonction={() => confirmDelete(waterTest)}
        buttonNoFonction={handlePressDelete}
      />
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