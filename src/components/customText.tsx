import React, { FunctionComponent } from "react";
import { Text, TextStyle } from "react-native";

type Props = {
  style: TextStyle;
  message: String;
  display: boolean;
};

export const CustomMessage: FunctionComponent<Props> = ({
  style,
  message,
  display
}: Props) => display && <Text style={style}>{message}</Text>;
