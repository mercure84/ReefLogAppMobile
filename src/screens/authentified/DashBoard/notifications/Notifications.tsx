import React from "react";
import { View, Text } from "react-native";
import { Alert } from "../../../../store/AlertStore";

type Props = {
  notifications: Alert[];
};

export const Notifications = ({ notifications }: Props) => {
  return notifications != null && notifications.length > 0 ? (
    <View style={{ padding: 8 }}>
      <Text>
        Vous avez actuellement {notifications.length} alerte(s) sur vos tests.
      </Text>
      <Text>{`Il faut tester : ${notifications
        .map((alert) => alert.typeTest)
        .join(", ")}`}</Text>
    </View>
  ) : null;
};
