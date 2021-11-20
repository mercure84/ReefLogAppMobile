import React from "react";
import { View, Text, ViewStyle, StyleSheet, Modal } from "react-native";
import { ReefButton } from "./ReefButton";

type Props = {
  message: string;
  isModaleVisible: boolean;
  buttonYesFonction: () => void;
  buttonNoFonction: () => void;
};

export const DeleteModal = ({
  message,
  buttonYesFonction,
  buttonNoFonction,
  isModaleVisible,
}: Props) => {
  return (
    <Modal visible={isModaleVisible} animationType="slide" transparent>
      <View style={styles.modalView}>
        <Text>{message}</Text>
        <ReefButton size="small" title="Oui" onPress={buttonYesFonction} />
        <ReefButton size="small" title="Non" onPress={buttonNoFonction} />
      </View>
    </Modal>
  );
};

type Style = { button: ViewStyle; modalView: ViewStyle };

const styles = StyleSheet.create<Style>({
  button: {
    margin: 8,
  },
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
});
