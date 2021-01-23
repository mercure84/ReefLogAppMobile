import React, { useState } from "react";
import {
  View,
  Text,
  ViewStyle,
  TextStyle,
  StyleSheet,
  ActivityIndicator,
  Modal,
  ModalProps,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { WaterTest } from "../../../../store/WaterTestStore";
import { MessageInfo } from "../../../../components/MessageInfo";
import { useNavigation } from "@react-navigation/native";
import RootStore from "../../../../store/RootStore";
import Moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ReefButton } from "../../../../components/ReefButton";
import { formatStringToFloat } from "../../../../utils/helpers";
import { waterTestFormInputs } from "./constants";

type Props = {
  waterTestToSave: WaterTest | null;
  showForm: React.Dispatch<React.SetStateAction<boolean>>;
} & ModalProps;

export const WaterTestFormModal = ({
  waterTestToSave,
  showForm,
  visible,
}: Props) => {
  const newTest: WaterTest = waterTestToSave ?? { id: "" };
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const toUpdate = waterTestToSave !== null;
  const [isLoading, setLoading] = useState(false);
  const [waterTest, setWaterTest] = useState<WaterTest>(newTest);
  const [infoMessage, setInfoMessage] = useState(
    "Saisissez les données de vos tests !"
  );
  const navigation = useNavigation();

  const checkForm = () => {
    let goodValues = 0;
    Object.keys(waterTest).forEach(function (key) {
      let value = waterTest[key];
      isNaN(value) ? (value = null) : null;
      if (value !== undefined && value !== null && typeof value === "number") {
        goodValues++;
      }
    });
    if (goodValues > 0) {
      return true;
    } else {
      return false;
    }
  };

  const submitWaterTest = async () => {
    if (waterTest !== undefined && checkForm()) {
      setLoading(true);
      setInfoMessage(
        "Votre formulaire est correct, nous allons l'enregistrer... "
      );
      const response = RootStore.waterTestStore.saveWaterTest(
        waterTest,
        toUpdate
      );

      if (response != null) {
        RootStore.waterTestStore.fetchWaterTestList();
        setInfoMessage("Le test a bien été enregistré !");
        setLoading(false);
        showForm(false);
      } else {
        setInfoMessage("Un problème est survenu");
        setLoading(true);
      }
    } else {
      setInfoMessage("Votre formulaire est incorrect, merci de le vérifier !");
    }
  };

  const setDate = (date: Date) => {
    setDatePickerVisible(false);

    setWaterTest({
      ...waterTest,
      date: date,
    });
    setDatePickerVisible(false);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalView}>
        {isLoading && <ActivityIndicator />}
        <MessageInfo message={infoMessage} />
        <View style={styles.inputInlineContainer}>
          <Text>Horodatage :</Text>
          <ReefButton
            size="medium"
            title={
              waterTest !== null
                ? Moment(waterTest.date).format("lll").toString()
                : Moment(new Date()).format("lll").toString()
            }
            onPress={() => setDatePickerVisible(true)}
          />

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            date={
              waterTest !== null
                ? new Date(Moment(waterTest.date).toString())
                : new Date()
            }
            locale="fr-FR"
            mode="datetime"
            onConfirm={setDate}
            onCancel={() => setDatePickerVisible(false)}
          />
        </View>

        {Object.entries(waterTestFormInputs).map(([key, value]) => (
          <View style={styles.inputInlineContainer} key={key}>
            {value.map((item) => (
              <View style={styles.inputInline} key={item.kind}>
                <Text>{item.label}</Text>
                <TextInput
                  style={styles.textInputSmall}
                  maxLength={item.maxLength}
                  placeholder={item.placeHolder}
                  keyboardType={item.keyBoard}
                  onChangeText={(text) =>
                    setWaterTest({
                      ...waterTest,
                      [item.kind]: formatStringToFloat(text),
                    })
                  }
                  defaultValue={waterTest[item.kind]?.toString() ?? ""}
                />
              </View>
            ))}
          </View>
        ))}

        <View style={styles.buttonContainer}>
          <ReefButton
            size="medium"
            title="Enregistrer"
            onPress={() => submitWaterTest()}
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
  inputInline: ViewStyle;
  textInput: TextStyle;
  textInputSmall: TextStyle;
  buttonContainer: ViewStyle;
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
  inputInlineContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputInline: {
    alignItems: "center",
    marginHorizontal: 4,
  },
  textInput: {
    backgroundColor: "lightgrey",
    textAlign: "center",
    height: 40,
    width: "65%",
    borderRadius: 1,
  },

  textInputSmall: {
    backgroundColor: "lightgrey",
    textAlign: "center",
    height: 40,
    width: "100%",
    borderRadius: 10,
  },
  buttonContainer: {
    padding: 16,
    flexDirection: "row",
  },
});
