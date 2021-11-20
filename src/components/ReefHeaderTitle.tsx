import React, { useContext } from "react";
import { Text } from "react-native";
import { ThemeContext } from "../../App";

type Props = {
  title: string;
};

export const ReefHeaderTitle = ({ title }: Props) => {
  const { clearColor } = useContext(ThemeContext).theme;

  return (
    <Text
      style={{
        fontSize: 22,
        flexShrink: 1,
        color: clearColor,
        textShadowColor: "black",
        fontWeight: "bold",
        textShadowOffset: { width: 1, height: 4 },
        textShadowRadius: 5,
        padding: 4,
      }}
    >
      {title}
    </Text>
  );
};
