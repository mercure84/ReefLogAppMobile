import React, { ReactNode } from "react";
import {
  StyleSheet,
  ViewStyle,
  Text,
  TouchableOpacityProps,
  TextStyle
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

type Props = {
  title: ReactNode | string;
} & TouchableOpacityProps;

export const ReefButton = ({ title, ...props }: Props) => {
  return (
    <TouchableOpacity style={styles.button} {...props}>
      <Text style={styles.label}>{title}</Text>
    </TouchableOpacity>
  );
};

type Style = {
  button: ViewStyle;
  label: TextStyle;
};

const styles = StyleSheet.create<Style>({
  button: {
    borderRadius: 8,
    padding: 8,
    backgroundColor: "grey",
    width: 160,
    margin: 4,
    alignSelf: "center"
  },
  label: {
    fontFamily: "verdana",
    fontSize: 16,
    color: "orange",
    textAlign: "center"
  }
});
