import React, { useState } from "react";

import RootStore from "../../../../store/RootStore";
import {
  ActivityIndicator,
  View,
  ViewStyle,
  TextStyle,
  StyleSheet,
  Text,
  Modal,
  ModalProps,
} from "react-native";

import { TextInput } from "react-native-gesture-handler";
import Moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ReefButton } from "../../../../components/ReefButton";
import { Event } from "../../../../store/EventStore";

type Props = {
  eventToSave: Event | null;
  showForm: React.Dispatch<React.SetStateAction<boolean>>;
} & ModalProps;

export const EventFormModal = ({ eventToSave, showForm, visible }: Props) => {
  const myEvent: Event = eventToSave ?? { id: "" };
  const toUpdate = eventToSave !== null;

  const [event, setEvent] = useState<Event>(myEvent);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [infoMessage, setInfoMessage] = useState(
    "Décrivez votre nouvel évènement... !"
  );
  const isUpdating = eventToSave !== null;
  const [isLoading, setLoading] = useState(false);

  const checkForm = () => {
    if (event.title !== "") {
      return true;
    } else {
      setInfoMessage("Oups il ya un problème dans votre formulaire");
      return false;
    }
  };

  const submitEvent = async () => {
    setLoading(true);
    if (event !== undefined && checkForm()) {
      setInfoMessage("Le formulaire est valide ! Enregistrement en cours...");
      const response = RootStore.eventStore.saveEvent(event, isUpdating);
      if (response != null) {
        setInfoMessage("L'évènement a été enregistré !");
        setLoading(false);
        showForm(false);
      } else {
        setInfoMessage("Un problème est survenu");
      }
      setLoading(false);
    }
  };

  const setDate = (date: Date) => {
    setDatePickerVisible(false);

    setEvent({
      ...event,
      date: date,
    });
    setDatePickerVisible(false);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalView}>
        {isLoading && <ActivityIndicator />}
        <View style={styles.inputInlineContainer}>
          <Text>Date</Text>
          <ReefButton
            size="medium"
            title={
              event !== null
                ? Moment(event.date).format("ll").toString()
                : Moment(new Date()).format("ll").toString()
            }
            onPress={() => setDatePickerVisible(true)}
          />

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            date={new Date()}
            locale="fr-FR"
            mode="date"
            display="calendar"
            onConfirm={setDate}
            onCancel={() => setDatePickerVisible(false)}
          />
        </View>

        <View style={styles.inputInlineContainer}>
          <View style={styles.input}>
            <TextInput
              style={styles.textInput}
              maxLength={100}
              placeholder={"Titre : 100 caractères maxi"}
              onChangeText={(text) => setEvent({ ...event, title: text })}
              defaultValue={event !== null ? event.title : ""}
            />
          </View>
        </View>

        <View style={styles.inputInlineContainer}>
          <View style={styles.input}>
            <TextInput
              style={styles.textInput}
              maxLength={250}
              placeholder={"Notes : 250 caractères maxi"}
              onChangeText={(text) => setEvent({ ...event, description: text })}
              defaultValue={event !== null ? event.description : ""}
              multiline={true}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <ReefButton
            size="medium"
            title="Enregistrer"
            onPress={() => submitEvent()}
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
