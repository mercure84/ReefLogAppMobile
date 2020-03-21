import React from "react";
import { View, Text } from "react-native";
import Modal from "react-native-modal";

type Props = {
  details: string;
  id: string | number;
  kind: string;
  isVisible: boolean;
};

export const ModalDeleteConfirmation = ({
  details,
  id,
  kind,
  isVisible
}: Props) => {
  return (
    <View>
      <Modal isVisible={isVisible}>
        <View style={{ flex: 1 }}>
          <Text>Confirmez vous la suppression de bla bla bla dla Pookie</Text>
        </View>
      </Modal>
      )}
    </View>
  );
};
