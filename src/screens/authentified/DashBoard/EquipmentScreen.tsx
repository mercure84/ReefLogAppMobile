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
import RootStore from "../../../store/RootStore";
import { EquipmentItem } from "./components/EquipmentItem";

export const EquipmentScreen = observer(() => {
  const navigation = useNavigation();
  const [rootStore] = useState(RootStore);

  if (rootStore.equipmentStore.equipmentState === "pending") {
    rootStore.equipmentStore.fetchEquipments();
  }

  const isEquipmentsLoading =
    rootStore.equipmentStore.equipmentState === "pending";
  const dataEquipments = rootStore.equipmentStore.equipmentsData;

  return (
    <View style={styles.page}>
      <Header
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
