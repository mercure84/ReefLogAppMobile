import React from "react";
import { View, Text, Button, ViewStyle, StyleSheet, Modal } from "react-native";

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
  isModaleVisible,
}: Props) => {
  return (
    <Modal visible={isModaleVisible}>
      <View style={{ justifyContent: "center" }}>
        <Text>{message}</Text>
        <View style={styles.button}>
          <Button title="Oui" onPress={buttonYesFonction} />
        </View>
        <View style={styles.button}>
          <Button title="Non" onPress={buttonNoFonction} />
        </View>
      </View>
    </Modal>
  );
};

type Style = { button: ViewStyle };

const styles = StyleSheet.create<Style>({
  button: {
    margin: 8,
  },
});
