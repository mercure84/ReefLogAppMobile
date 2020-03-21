import React from "react";
import {
  Text,
  StyleSheet,
  View,
  ViewStyle,
  ImageStyle,
  Button
} from "react-native";
import { observer } from "mobx-react";
import { Header } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export const EquipmentScreen = observer(() => {
  const navigation = useNavigation();
  return (
    <View style={styles.page}>
      <Header
        centerComponent={<Text style={{ fontSize: 16 }}>Mes équipements</Text>}
        backgroundColor="yellow"
      />

      <Button
        onPress={() => navigation.navigate("newEquipment")}
        title="Ajouter un équipement"
      />
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
