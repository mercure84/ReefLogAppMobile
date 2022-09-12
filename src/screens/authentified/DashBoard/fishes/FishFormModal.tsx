import React, { useState } from "react";
import {
  Modal,
  ModalProps,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { ReefActivityIndicator } from "../../../../components/ReefActivityIndicator";
import { ReefButton } from "../../../../components/ReefButton";
import { Fish, SexType, SizeType } from "../../../../store/FishStore";
import RootStore from "../../../../store/RootStore";
import Moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";

type Props = {
  fishToSave: Fish | null;
  showForm: React.Dispatch<React.SetStateAction<boolean>>;
} & ModalProps;

export const FishFormModal = ({ fishToSave, showForm, visible }: Props) => {
  const myFish: Fish = fishToSave ?? {
    id: "",
    name: "",
    sex: SexType.UNDEFINED,
    size: SizeType.M,
  };

  const [fish, setFish] = useState<Fish>(myFish);
  const [isIncomingDatePickerVisible, showIncomingDatePicker] = useState(false);
  const [isBirthDatePickerVisible, showBirthDatePicker] = useState(false);
  const [infoMessage, setInfoMessage] = useState("Décrivez votre poisson... !");
  const isUpdating = fishToSave !== null;
  const [isLoading, setLoading] = useState(false);

  const checkForm = () => {
    if (fish.name !== "") {
      return true;
    } else {
      setInfoMessage("Oups il ya un problème dans votre formulaire");
      return false;
    }
  };

  const submit = async () => {
    setLoading(true);
    if (fish !== undefined && checkForm()) {
      setInfoMessage("Le formulaire est valide ! Enregistrement en cours...");
      const response = RootStore.fishStore.saveFish(fish, isUpdating);
      if (response != null) {
        setInfoMessage("Le poisson a été enregistré !");
        setLoading(false);
        showForm(false);
      } else {
        setInfoMessage("Un problème est survenu");
      }
      setLoading(false);
    }
  };

  const setIncomingDate = (date: Date) => {
    showIncomingDatePicker(false);
    setFish({
      ...fish,
      incomingDate: date,
    });
  };
  const setBirthDate = (date: Date) => {
    showBirthDatePicker(false);

    setFish({
      ...fish,
      birthDate: date,
    });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalView}>
        {isLoading && <ReefActivityIndicator />}
        <View style={styles.inputInlineContainer}>
          <Text>Date d'arrivée</Text>
          <ReefButton
            size="medium"
            title={
              fish !== null
                ? Moment(fish.incomingDate).format("ll").toString()
                : Moment(new Date()).format("ll").toString()
            }
            onPress={() => showIncomingDatePicker(true)}
          />

          <DateTimePickerModal
            isVisible={isIncomingDatePickerVisible}
            date={new Date(Moment(fish.incomingDate).toString()) ?? new Date()}
            locale="fr-FR"
            mode="date"
            display="calendar"
            onConfirm={setIncomingDate}
            onCancel={() => showIncomingDatePicker(false)}
          />
        </View>
        <View style={styles.inputInlineContainer}>
          <Text>Date de naissance</Text>
          <ReefButton
            size="medium"
            title={
              fish.birthDate !== null
                ? Moment(fish.birthDate).format("ll").toString()
                : Moment(fish.incomingDate).format("ll").toString()
            }
            onPress={() => showBirthDatePicker(true)}
          />

          <DateTimePickerModal
            isVisible={isBirthDatePickerVisible}
            date={new Date(Moment(fish.birthDate).toString()) ?? new Date()}
            locale="fr-FR"
            mode="date"
            display="calendar"
            onConfirm={setBirthDate}
            onCancel={() => showBirthDatePicker(false)}
          />
        </View>

        <View style={styles.inputInlineContainer}>
          <View style={styles.input}>
            <TextInput
              style={styles.textInput}
              maxLength={100}
              placeholder={"Nom : 100 caractères maxi"}
              onChangeText={(text) => setFish({ ...fish, name: text })}
              defaultValue={fish !== null ? fish.name : ""}
            />
          </View>
        </View>

        <View style={styles.inputInlineContainer}>
          <Text>Taille</Text>
          <Picker
            style={{ height: 50, width: 150 }}
            mode="dropdown"
            selectedValue={fish.size}
            onValueChange={(itemValue) => {
              setFish({
                ...fish,
                size: itemValue as SizeType,
              });
            }}
          >
            <Picker.Item label="XS" value={SizeType.XS} />
            <Picker.Item label="S" value={SizeType.S} />
            <Picker.Item label="M" value={SizeType.M} />
            <Picker.Item label="L" value={SizeType.L} />
            <Picker.Item label="XL" value={SizeType.XL} />
          </Picker>
        </View>

        <View style={styles.inputInlineContainer}>
          <Text>Sexe</Text>
          <Picker
            style={{ height: 50, width: 150 }}
            mode="dropdown"
            selectedValue={fish.sex}
            onValueChange={(itemValue) => {
              setFish({
                ...fish,
                sex: itemValue,
              });
            }}
          >
            <Picker.Item label="Mâle" value={SexType.MALE} />
            <Picker.Item label="Femelle" value={SexType.FEMALE} />
            <Picker.Item label="Non binaire" value={SexType.UNDEFINED} />
          </Picker>
        </View>

        <View style={styles.inputInlineContainer}>
          <View style={styles.input}>
            <TextInput
              style={styles.textInput}
              maxLength={250}
              placeholder={"Notes : 250 caractères maxi"}
              onChangeText={(text) => setFish({ ...fish, note: text })}
              defaultValue={fish !== null ? fish.note : ""}
              multiline={true}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <ReefButton
            size="medium"
            title="Enregistrer"
            onPress={() => submit()}
          />
          <ReefButton
            size="medium"
            title="Annuler"
            onPress={() => showForm(false)}
          />
        </View>
      </View>
    </Modal>
  );
};

type Style = {
  modalView: ViewStyle;
  inputInlineContainer: ViewStyle;
  textInput: TextStyle;
  buttonContainer: ViewStyle;
  input: ViewStyle;
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
  input: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 2,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    marginBottom: 8,
    alignSelf: "center",
  },
  inputInlineContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInput: {
    textAlign: "center",
    height: 40,
    width: 320,
  },
  buttonContainer: {
    padding: 16,
  },
});
function setEvent(arg0: any): void {
  throw new Error("Function not implemented.");
}
