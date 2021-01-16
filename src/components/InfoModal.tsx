import React from "react";
import { View, ViewStyle, StyleSheet, ModalProps } from "react-native";
import Modal from "react-native-modal";
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
    <Modal isVisible={isModaleVisible} onDismiss={onHide}>
      <Card>
        <Text>{message}</Text>
        <View style={styles.button}>
          <ReefButton title="OK" onPress={OKButtonFunction} size={"medium"} />
        </View>
      </Card>
    </Modal>
  );
};

type Style = { button: ViewStyle };

const styles = StyleSheet.create<Style>({
  button: {
    marginTop: 16,
    alignItems: "center",
  },
});
