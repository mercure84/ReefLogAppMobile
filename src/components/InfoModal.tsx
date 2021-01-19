import React from "react";
import { View, ViewStyle, StyleSheet, Modal } from "react-native";
import { Card, Text } from "react-native-elements";
import { ReefButton } from "./ReefButton";

type Props = {
  message: string;
  isModaleVisible: boolean;
  OKButtonFunction: () => void;
  onHide?: () => void;
};

export const InfoModal = ({
  message,
  OKButtonFunction,
  isModaleVisible,
  onHide,
}: Props) => {
  return (
    <Modal visible={isModaleVisible} onDismiss={onHide} transparent>
      <View style={styles.modalView}>
        <Text>{message}</Text>
        <View style={styles.button}>
          <ReefButton title="OK" onPress={OKButtonFunction} size={"medium"} />
        </View>
      </View>
    </Modal>
  );
};

type Style = {
  button: ViewStyle;
  modalView: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  button: {
    marginTop: 16,
    alignItems: "center",
  },

  modalView: {
    marginVertical: "65%",
    alignItems: "center",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
