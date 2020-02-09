import React from "react";

import { Text } from "react-native";

type Props = {
  message: string;
};

export const MessageInfo = ({ message }: Props) =>
  message != null && <Text>{message}</Text>;
