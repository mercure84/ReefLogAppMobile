import React, { useState } from "react";
import { Equipment } from "../../../../services/equipmentService";
import RootStore from "../../../../store/RootStore";
import {
  ActivityIndicator,
  View,
  Button,
  ViewStyle,
  TextStyle,
  StyleSheet
} from "react-native";
import { CustomMessage } from "../../../../components/CustomMessage";
import { Card } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

type Props = {
  equipmentToUpdate: Equipment;
};

export const EquipmentForm = ({ equipmentToUpdate }: Props) => {
  const navigation = useNavigation();
  const [rootStore, setRootStore] = useState(RootStore);
  const [equipment, setEquipment] = useState<Equipment>(equipmentToUpdate);
  const [infoMessage, setInfoMessage] = useState(
    "Saisissez les données de vos tests !"
  );

  const [isLoading, setLoading] = useState(false);

  return (
    <>
      {isLoading && <ActivityIndicator />}
      <CustomMessage message={infoMessage} display={infoMessage !== null} />
      <Card>
        <View style={styles.buttonContainer}>
          <Button title="Enregistrer" onPress={() => null} />
          <Button
            title="Annuler"
            onPress={() => navigation.navigate("handleEquipment")}
          />
        </View>
      </Card>
    </>
  );
};

type Style = {
  input: ViewStyle;
  inputInlineContainer: ViewStyle;
  inputInline: ViewStyle;
  textInput: TextStyle;
  textInputSmall: TextStyle;
  buttonContainer: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  input: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4
  },
  inputInlineContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  inputInline: {
    alignItems: "center"
  },
  textInput: {
    backgroundColor: "lightgrey",
    textAlign: "center",
    height: 40,
    width: "65%",
    borderRadius: 5
  },

  textInputSmall: {
    backgroundColor: "lightgrey",
    textAlign: "center",
    height: 40,
    width: "100%",
    borderRadius: 10
  },
  buttonContainer: {
    padding: 16
  }
});
