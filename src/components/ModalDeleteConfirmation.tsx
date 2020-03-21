import React from "react";
import { View, Text, Button } from "react-native";
import Modal from "react-native-modal";
import { Card } from "react-native-elements";

type Props = {
  message: string;
  isModaleVisible: boolean;
  buttonYesFonction: () => void;
  buttonNoFonction: () => void;
};

export const CustomModal = ({
  message,
  buttonYesFonction,
  buttonNoFonction,
  isModaleVisible
}: Props) => {
  return (
    <Modal isVisible={isModaleVisible} backdropOpacity={0.5}>
      <View style={{ flex: 0.5, justifyContent: "center" }}>
        <Card>
          <Text>{message}</Text>
        </Card>
        <Button title="Oui" onPress={buttonYesFonction} />
        <Button title="Non" onPress={buttonNoFonction} />
      </View>
    </Modal>
  );
};
