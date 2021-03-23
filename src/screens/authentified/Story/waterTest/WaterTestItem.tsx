import React, { useState } from "react";
import { WaterTest } from "../../../../store/WaterTestStore";
import {
  Text,
  Image,
  StyleSheet,
  View,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from "react-native";
import createIcon from "../../../../assets/icons/createIcon.png";
import deleteIcon from "../../../../assets/icons/deleteIcon.png";
import RootStore from "../../../../store/RootStore";

import Moment from "moment";
import "moment/locale/fr";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DeleteModal } from "../../../../components/DeleteModal";
import { WaterTestFormModal } from "./WaterTestFormModal";

type Props = {
  waterTest: WaterTest;
};

export const WaterTestItem = ({ waterTest }: Props) => {
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);

  const handlePress = () => {
    setUpdateModalVisible(true);
  };

  const handlePressDelete = () => {
    setDeleteModalVisible(!isDeleteModalVisible);
  };

  const confirmDelete = (pWaterTest: WaterTest) => {
    RootStore.waterTestStore.storeDeleteWaterTest(pWaterTest.id);
    RootStore.waterTestStore.fetchWaterTests();
    handlePressDelete();
  };

  return (
    <View style={styles.mainContainer}>
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
      {waterTest.phosphates !== null ? (
        <Text>PO4 : {waterTest.phosphates} ppm</Text>
      ) : null}
      {waterTest.silicates !== null ? (
        <Text>Silicates : {waterTest.silicates} ppm </Text>
      ) : null}
      {waterTest.ph !== null ? <Text>pH : {waterTest.ph} </Text> : null}

      <DeleteModal
        isModaleVisible={isDeleteModalVisible}
        message={`Confirmez vous la suppression du test du 
        ${Moment(waterTest.date).format("lll")} ?`}
        buttonYesFonction={() => confirmDelete(waterTest)}
        buttonNoFonction={handlePressDelete}
      />

      {isUpdateModalVisible && (
        <WaterTestFormModal
          waterTestToSave={waterTest}
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
