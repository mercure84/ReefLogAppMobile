import React, { ReactNode } from "react";
import { View } from "react-native";
import { Button, ButtonProps } from "react-native-elements";
import { blueCB, yellowCB } from "./colors";

type Props = {
  title: ReactNode | string;
  size?: "large" | "medium" | "small";
} & ButtonProps;

export const ReefButton = ({
  title,
  onPress,
  size,
  disabled = false,
}: Props) => {
  const sizeWidth = (): number => {
    switch (size) {
      case "large":
        return 320;
      case "medium":
        return 160;
      case "small":
        return 80;
      default:
        return 320;
    }
  };

  return (
    <View style={{ margin: 4, width: sizeWidth() }}>
      <Button
        title={title}
        onPress={onPress}
        disabled={disabled}
        buttonStyle={{
          backgroundColor: yellowCB,
          borderColor: blueCB,
          borderWidth: 1,
        }}
        titleStyle={{ color: blueCB }}
      />
    </View>
  );
};
