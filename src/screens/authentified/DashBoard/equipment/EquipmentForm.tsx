import React, { useState } from "react";
import {
  Equipment,
  saveEquipment
} from "../../../../services/equipmentService";
import RootStore from "../../../../store/RootStore";
import {
  ActivityIndicator,
  View,
  Button,
  ViewStyle,
  TextStyle,
  StyleSheet,
  Text,
  Picker
} from "react-native";
import { CustomMessage } from "../../../../components/CustomMessage";
import { Card } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";

type Props = {
  equipmentToUpdate: Equipment;
};

export const EquipmentForm = ({ equipmentToUpdate }: Props) => {
  const navigation = useNavigation();
  const [equipment, setEquipment] = useState<Equipment>(equipmentToUpdate);
  const [infoMessage, setInfoMessage] = useState(
    "Saisissez les données de votre matériel !"
  );
  const isUpdating = equipmentToUpdate !== null;
  const [rootStore] = useState(RootStore);

  const [isLoading, setLoading] = useState(false);

  const checkForm = () => {
    if (equipment.typeOfEquipment !== "" && equipment.mark !== null) {
      return true;
    } else {
      setInfoMessage("Oups il ya un problème dans votre formulaire");
      return false;
    }
  };

  const submitEquipment = async () => {
    setLoading(true);
    if (checkForm) {
      setInfoMessage("Le formulaire est valide ! Enregistrement en cours...");
      const response = await saveEquipment(
        rootStore.tankStore.tankList[0].id,
        equipment,
        isUpdating
      );
      if (response != null) {
        setInfoMessage("L'équipement a été enregistré !");
        rootStore.equipmentStore.fetchEquipments();
        setLoading(false);
        navigation.navigate("handleEquipment");
      } else {
        setInfoMessage("Un problème est survenu");
      }
      setLoading(false);
    }
  };

  return (
    <>
      {isLoading && <ActivityIndicator />}
      <CustomMessage message={infoMessage} display={infoMessage !== null} />
      <Card>
        <View style={styles.input}>
          <Text>Date d'installation</Text>
          <TextInput
            style={styles.textInput}
            maxLength={30}
            placeholder={"30 caractères maxi"}
            onChangeText={text => null}
            enabled={false}
          />
        </View>

        <View style={styles.input}>
          <Text>Type :</Text>
          <Picker
            style={{ height: 50, width: 150 }}
            mode="dialog"
            selectedValue={
              equipment === null
                ? setEquipment({ ...equipment, typeOfEquipment: "SKIMMER" })
                : equipment.typeOfEquipment
            }
            onValueChange={itemValue =>
              setEquipment({ ...equipment, typeOfEquipment: itemValue })
            }
          >
            <Picker.Item label="Ecumeur" value="SKIMMER" />
            <Picker.Item label="Pompe de Brassage" value="STREAMPUMP" />
            <Picker.Item label="Pompe de remontée" value="RETURNPUMP" />
            <Picker.Item label="Eclairage" value="LIGHT" />
            <Picker.Item label="Pompe Doseuse" value="DOSINGPUMP" />
            <Picker.Item label="Pompe à Air" value="AIRPUMP" />
            <Picker.Item label="Filtre" value="FILTER" />
            <Picker.Item label="Chauffage" value="HEATING" />
            <Picker.Item label="Osmolateur" value="OSMOLATOR" />
            <Picker.Item label="UV" value="ULTRA_V" />
            <Picker.Item label="Autre" value="OTHER" />
          </Picker>
        </View>

        <View style={styles.input}>
          <Text>Marque</Text>
          <TextInput
            style={styles.textInput}
            maxLength={30}
            placeholder={"30 caractères maxi"}
            onChangeText={text => setEquipment({ ...equipment, mark: text })}
            defaultValue={
              isUpdating && equipment.mark !== null ? equipment.mark : null
            }
          />
        </View>

        <View style={styles.input}>
          <Text>Modèle</Text>
          <TextInput
            style={styles.textInput}
            maxLength={30}
            placeholder={"30 caractères maxi"}
            onChangeText={text => setEquipment({ ...equipment, model: text })}
            defaultValue={
              isUpdating && equipment.model !== null ? equipment.model : null
            }
          />
        </View>

        <View style={styles.input}>
          <Text>Nombre</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="number-pad"
            maxLength={4}
            placeholder={"0-9999"}
            onChangeText={text =>
              setEquipment({ ...equipment, quantity: parseFloat(text) })
            }
            defaultValue={
              isUpdating && equipment.quantity !== null
                ? equipment.quantity.toString()
                : "1"
            }
          />
        </View>

        <View style={styles.input}>
          <Text>Puissance (Watt)</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="number-pad"
            maxLength={4}
            placeholder={"0-9999"}
            onChangeText={text =>
              setEquipment({ ...equipment, power: parseFloat(text) })
            }
            defaultValue={
              isUpdating && equipment.power !== null
                ? equipment.power.toString()
                : null
            }
          />
        </View>

        <View style={styles.input}>
          <Text>Notes</Text>
          <TextInput
            style={styles.textInput}
            maxLength={250}
            placeholder={"250 caractères maxi"}
            onChangeText={text =>
              setEquipment({ ...equipment, description: text })
            }
            defaultValue={
              isUpdating && equipment.description !== null
                ? equipment.description
                : null
            }
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Enregistrer" onPress={() => submitEquipment()} />
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
