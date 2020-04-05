import React from "react";
import { Text } from "react-native";

type Props = {
  title: string;
};

export const ReefHeaderTitle = ({ title }: Props) => {
  return (
    <Text
      style={{
        fontSize: 24,
        color: "white",
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
