import React from "react";
import { Text } from "react-native";
import { yellowCB } from "./colors";

type Props = {
  title: string;
};

export const ReefHeaderTitle = ({ title }: Props) => {
  return (
    <Text
      style={{
        fontSize: 22,
        flexShrink: 1,
        color: yellowCB,
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
