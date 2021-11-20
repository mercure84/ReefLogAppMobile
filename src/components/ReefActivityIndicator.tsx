import React, { useContext } from "react";
import { ActivityIndicator } from "react-native";
import { ThemeContext } from "../../App";

export const ReefActivityIndicator = () => {
  const context = useContext(ThemeContext);
  return <ActivityIndicator size="large" color={context.theme.darkColor} />;
};
