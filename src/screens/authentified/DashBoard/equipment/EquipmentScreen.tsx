import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  ViewStyle,
  Button,
  ActivityIndicator,
  FlatList
} from "react-native";
import { observer } from "mobx-react";
import { Header } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import RootStore from "../../../../store/RootStore";
import { EquipmentItem } from "./EquipmentItem";
import { GoBackButton } from "../../../../components/GoBackButton";

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
        centerComponent={<Text style={{ fontSize: 16 }}>Mes équipements</Text>}
        backgroundColor="yellow"
      />

      <Button
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
          keyExtractor={item => item.id.toString()}
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
    alignItems: "stretch"
  }
});
