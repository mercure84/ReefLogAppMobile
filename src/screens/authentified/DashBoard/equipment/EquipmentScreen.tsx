import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  ViewStyle,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { observer } from "mobx-react";
import { Header } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import RootStore from "../../../../store/RootStore";
import { EquipmentItem } from "./EquipmentItem";
import { GoBackButton } from "../../../../components/GoBackButton";
import { ReefButton } from "../../../../components/ReefButton";
import { ReefHeaderTitle } from "../../../../components/ReefHeaderTitle";

export const EquipmentScreen = observer(() => {
  const navigation = useNavigation();

  if (RootStore.equipmentStore.equipmentState === "pending") {
    RootStore.equipmentStore.fetchEquipments();
  }

  const isEquipmentsLoading =
    RootStore.equipmentStore.equipmentState === "pending";
  const dataEquipments = RootStore.equipmentStore.equipmentsData;

  return (
    <View style={styles.page}>
      <Header
        leftComponent={<GoBackButton />}
        centerComponent={<ReefHeaderTitle title="Mon équipement" />}
        backgroundColor="white"
        backgroundImage={require("../../../../assets/equipment.png")}
        backgroundImageStyle={{ opacity: 0.8 }}
      />

      <ReefButton
        onPress={() => navigation.navigate("saveEquipment")}
        title="Ajouter un équipement"
      />

      {isEquipmentsLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          style={{ marginBottom: 64 }}
          data={dataEquipments}
          renderItem={({ item }) => <EquipmentItem equipment={item} />}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text>Aucun enregistrement</Text>}
          scrollEnabled={true}
        />
      )}
    </View>
  );
});

type Style = {
  page: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  page: {
    alignItems: "stretch",
  },
});
