import React, { useState } from "react";
import { Event } from "../../../../store/EventStore";
import { useNavigation } from "@react-navigation/native";
import {
  ViewStyle,
  TextStyle,
  ImageStyle,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import Moment from "moment";

type Props = {
  event: Event;
};
import createIcon from "../../../../assets/icons/createIcon.png";
import deleteIcon from "../../../../assets/icons/deleteIcon.png";
import RootStore from "../../../../store/RootStore";
import { CustomModal } from "../../../../components/ModalDeleteConfirmation";
import { EventFormModal } from "./EventFormModal";

export const EventItem = ({ event }: Props) => {
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
  const handlePress = () => {
    setUpdateModalVisible(true);
  };

  const handlePressDelete = () => {
    setDeleteModalVisible(!isDeleteModalVisible);
  };

  const confirmDelete = (pEvent: Event) => {
    RootStore.eventStore.storeDeleteEvent(pEvent.id);
    handlePressDelete();
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <View style={styles.item}>
          <Text style={styles.date}>{Moment(event.date).format("ll")}</Text>
          {event.title !== undefined && <Text>{event.title}</Text>}
        </View>
        <TouchableOpacity onPress={handlePress}>
          <Image source={createIcon} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressDelete}>
          <Image source={deleteIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <Text>{event.description}</Text>

      <CustomModal
        isModaleVisible={isDeleteModalVisible}
        message={`Confirmez vous la suppression de l'équipement :
        ${event.title}  ?`}
        buttonYesFonction={() => confirmDelete(event)}
        buttonNoFonction={handlePressDelete}
      />

      {isUpdateModalVisible && (
        <EventFormModal
          eventToSave={event}
          showForm={setUpdateModalVisible}
          visible={isUpdateModalVisible}
        />
      )}
    </View>
  );
};

type Style = {
  mainContainer: ViewStyle;
  header: ViewStyle;
  icon: ImageStyle;
  item: ViewStyle;
  date: TextStyle;
};

const styles = StyleSheet.create<Style>({
  mainContainer: {
    borderColor: "grey",
    borderRadius: 4,
    borderWidth: 1,
    padding: 8,
    margin: 8,
  },
  item: {
    flex: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  icon: {
    height: 32,
    width: 32,
  },
  date: {
    fontWeight: "bold",
  },
});
