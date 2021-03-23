import React, { useState } from "react";
import {
  View,
  ViewStyle,
  TextStyle,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  ModalProps,
  Modal,
  KeyboardAvoidingView,
} from "react-native";
import { Tank } from "../../../../store/TankStore";
import RootStore from "../../../../store/RootStore";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Moment from "moment";
import { ReefButton } from "../../../../components/ReefButton";
import { formatStringToInteger } from "../../../../utils/helpers";
import { Text } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import { MessageInfo } from "../../../../components/MessageInfo";

type Props = {
  showFormCallback: (boolean: boolean) => void;
  tankToSave: Tank;
} & ModalProps;

export const TankFormModal = ({
  showFormCallback,
  tankToSave,
  visible,
}: Props) => {
  const today = new Date();
  const [isLoading, setLoading] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [tank, setTank] = useState<Tank>(tankToSave);
  const [infoMessage, setInfoMessage] = useState("");

  const isUpdating = tankToSave !== null;
  const { tankStore } = RootStore;

  const checkForm = () => {
    let isValide = false;
    if (tank?.startDate === undefined) {
      setTank({ ...tank, startDate: today });
    }
    if (tank?.name === "") {
      setTank({ ...tank, name: "Mon aquarium récifal" });
    }
    if (
      tank?.length > 0 &&
      tank?.length < 1000 &&
      tank?.height > 0 &&
      tank?.height < 1000 &&
      tank?.width > 0 &&
      tank?.width < 1000
    ) {
      isValide = true;
    } else {
      isValide = false;
      setLoading(false);
      setInfoMessage("Il y a un souci dans les dimensions de votre aquarium.");
    }
    return isValide;
  };

  const saveTank = async () => {
    setLoading(true);
    if (checkForm()) {
      setInfoMessage("Le formulaire est valide ! Enregistrement en cours...");
      const response = tankStore.saveReefTank(tank, isUpdating);
      if (response != null) {
        setLoading(false);
        setInfoMessage("");
        showFormCallback(false);
      } else {
        setLoading(false);
        setInfoMessage("Un problème est survenu");
        tankStore.refresh();
      }
    }
  };

  const setDate = (date: Date) => {
    setDatePickerVisible(false);

    setTank({
      ...tank,
      startDate: date,
    });
    setDatePickerVisible(false);
  };

  return (
    <KeyboardAvoidingView style={styles.page} behavior="height">
      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.modalView}>
          {isLoading && <ActivityIndicator />}
          <MessageInfo message={infoMessage} />
          <View style={styles.inputInlineContainer}>
            <Text>Mise en eau : </Text>
            <ReefButton
              size="medium"
              title={
                tank !== null
                  ? Moment(tank.startDate).format("ll").toString()
                  : Moment(new Date()).format("ll").toString()
              }
              onPress={() => setDatePickerVisible(true)}
            />

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              date={
                tank !== null
                  ? new Date(Moment(tank.startDate).toString())
                  : new Date()
              }
              locale="fr-FR"
              mode="date"
              display="calendar"
              onConfirm={setDate}
              onCancel={() => setDatePickerVisible(false)}
            />
          </View>

          <View style={styles.inputInlineContainer}>
            <Text>Nom :</Text>
            <TextInput
              style={styles.textInput}
              maxLength={30}
              placeholder={`Mon aquarium récifal`}
              onChangeText={(text) =>
                setTank({
                  ...tank,
                  name: text,
                })
              }
              defaultValue={isUpdating && tank.name !== null ? tank.name : ""}
            />
          </View>
          <View style={styles.inputInlineContainer}>
            <View style={styles.inputInline}>
              <Text>Longueur</Text>
              <TextInput
                style={styles.textInputSmall}
                maxLength={3}
                placeholder="0-999cm"
                keyboardType="numeric"
                onChangeText={(text) =>
                  setTank({
                    ...tank,
                    length: formatStringToInteger(text),
                  })
                }
                defaultValue={
                  isUpdating && tank.length ? tank.length.toString() : ""
                }
              />
            </View>
            <View style={styles.inputInline}>
              <Text>Largeur</Text>
              <TextInput
                style={styles.textInputSmall}
                maxLength={3}
                placeholder="0-999cm"
                keyboardType="numeric"
                onChangeText={(text) =>
                  setTank({
                    ...tank,
                    width: formatStringToInteger(text),
                  })
                }
                defaultValue={
                  isUpdating && tank.width !== 0 ? tank.width.toString() : ""
                }
              />
            </View>
            <View style={styles.inputInline}>
              <Text>Hauteur</Text>
              <TextInput
                style={styles.textInputSmall}
                maxLength={3}
                placeholder="0-999cm"
                keyboardType="numeric"
                onChangeText={(text) =>
                  setTank({
                    ...tank,
                    height: formatStringToInteger(text),
                  })
                }
                defaultValue={
                  isUpdating && tank.height !== 0 ? tank.height.toString() : ""
                }
              />
            </View>

            <View style={styles.inputInline}>
              <Text>Décantation</Text>
              <TextInput
                style={styles.textInputSmall}
                maxLength={4}
                placeholder="0-9999 L"
                keyboardType="numeric"
                onChangeText={(text) =>
                  setTank({
                    ...tank,
                    sumpVolume: formatStringToInteger(text),
                  })
                }
                defaultValue={
                  isUpdating && tank.sumpVolume !== null
                    ? tank.sumpVolume.toString()
                    : ""
                }
              />
            </View>
          </View>
          <View style={styles.inputInlineContainer}>
            <Text>Maintenance</Text>
            <Picker
              style={{ height: 50, width: 150 }}
              mode="dropdown"
              selectedValue={tank?.typeOfMaintenance ?? "BERLINOIS"}
              onValueChange={(itemValue) =>
                setTank({ ...tank, typeOfMaintenance: itemValue.toString() })
              }
            >
              <Picker.Item label="Berlinois" value="BERLINOIS" />
              <Picker.Item label="Jaubert" value="JAUBERT" />
              <Picker.Item label="Autre" value="AUTRE" />
            </Picker>
          </View>
          <View style={styles.inputInlineContainer}>
            <Text>Population principale</Text>
            <Picker
              style={{ height: 50, width: 150 }}
              mode="dropdown"
              selectedValue={tank?.mainPopulation ?? "MIX"}
              onValueChange={(itemValue) =>
                setTank({ ...tank, mainPopulation: itemValue.toString() })
              }
            >
              <Picker.Item label="Fish-Only" value="FISH_ONLY" />
              <Picker.Item label="Mixte" value="MIX" />
              <Picker.Item label="Mous" value="SOFT" />
              <Picker.Item label="LPS" value="LPS" />
              <Picker.Item label="SPS" value="SPS" />
            </Picker>
          </View>
          <ReefButton title="Enregistrer" onPress={() => saveTank()} />
          <ReefButton
            title="Annuler"
            onPress={() => {
              showFormCallback(false);
            }}
          />
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

type Style = {
  inputInlineContainer: ViewStyle;
  inputInline: ViewStyle;
  modalView: ViewStyle;
  textInput: TextStyle;
  textInputSmall: TextStyle;
  page: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  page: { alignItems: "center", flex: 1 },
  inputInlineContainer: {
    paddingVertical: 2,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputInline: {
    alignItems: "center",
  },
  textInput: {
    backgroundColor: "lightgrey",
    textAlign: "center",
    height: 40,
    width: "65%",
    borderRadius: 5,
  },
  textInputSmall: {
    backgroundColor: "lightgrey",
    textAlign: "center",
    height: 40,
    width: "100%",
    borderRadius: 10,
  },
});
