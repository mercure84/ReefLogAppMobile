import React from "react";

import { Text } from "react-native";

type Props = {
  message: string;
};

export const MessageInfo = ({ message }: Props) => {
  if (message) {
    return <Text>{message}</Text>;
  }
  return <></>;
};
