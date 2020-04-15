import React, { ReactNode } from "react";
import {
  StyleSheet,
  ViewStyle,
  Text,
  TouchableOpacityProps,
  TextStyle,
  ImageSourcePropType,
  Image,
  ImageStyle,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

type Props = {
  title: ReactNode | string;
  icon?: ImageSourcePropType;
} & TouchableOpacityProps;

export const ReefButton = ({ title, icon, ...props }: Props) => {
  return (
    <>
      <TouchableOpacity style={styles.button} {...props}>
        <Text style={styles.label}>{title}</Text>
        {icon !== undefined ? (
          <Image style={styles.icon} source={icon} />
        ) : null}
      </TouchableOpacity>
    </>
  );
};

type Style = {
  button: ViewStyle;
  label: TextStyle;
  icon: ImageStyle;
};

const styles = StyleSheet.create<Style>({
  button: {
    borderRadius: 8,
    padding: 8,
    backgroundColor: "grey",
    width: 160,
    margin: 4,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  label: {
    fontFamily: "verdana",
    fontSize: 16,
    color: "orange",
    textAlign: "center",
  },
  icon: {
    width: 26,
    height: 26,
  },
});
