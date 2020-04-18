import React, { useState } from "react";
import { EventType } from "../../../../store/EventStore";
import { useNavigation } from "@react-navigation/native";
import {
  ViewStyle,
  TextStyle,
  ImageStyle,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import Moment from "moment";

type Props = {
  event: EventType;
  updateItemCallBack: () => void
};
import createIcon from "../../../../assets/icons/createIcon.png";
import deleteIcon from "../../../../assets/icons/deleteIcon.png";
import RootStore from "../../../../store/RootStore";
import { CustomModal } from "../../../../components/ModalDeleteConfirmation";

export const EventItem = ({ event, updateItemCallBack }: Props) => {
  const handlePress = () => {
    updateItemCallBack()
  };
  const [isModalVisible, setModalVisible] = useState(false);

  const handlePressDelete = () => {
    setModalVisible(!isModalVisible);
  };

  const confirmDelete = (pEvent: EventType) => {
    RootStore.eventStore.storeDeleteEvent(pEvent.id);
    RootStore.eventStore.fetchEvents();
    handlePressDelete();
  };

  return (
    <View style={styles.testContainer}>
      <View style={styles.header}>
        <View style={styles.item}>
          <Text style={styles.date}>
            Date :
            {Moment(event.date).format("ll")}
          </Text>
          {event.title !== undefined && (
            <Text>{event.title}</Text>
          )}

        </View>
        <TouchableOpacity onPress={handlePress}>
          <Image source={createIcon} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressDelete}>
          <Image source={deleteIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <Text>Notes : {event.description}</Text>

      <CustomModal
        isModaleVisible={isModalVisible}
        message={`Confirmez vous la suppression de l'équipement :
        ${event.title}  ?`}
        buttonYesFonction={() => confirmDelete(event)}
        buttonNoFonction={handlePressDelete}
      />
    </View>
  );
};

type Style = {
  testContainer: ViewStyle;
  header: ViewStyle;
  icon: ImageStyle;
  item: ViewStyle;
  date: TextStyle;
};

const styles = StyleSheet.create<Style>({
  testContainer: {
    borderColor: "grey",
    borderRadius: 4,
    borderWidth: 1,
    padding: 8,
    margin: 8
  },
  item: {
    flex: 3
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  icon: {
    height: 32,
    width: 32
  },
  date: {
    fontWeight: "bold"
  }
});
