import React, { useContext } from "react";
import { ActivityIndicator } from "react-native";
import { ThemeContext } from "../../App";

export const ReefActivityIndicator = () => {
  const { darkColor } = useContext(ThemeContext).theme.theme;
  return <ActivityIndicator size="large" color={darkColor} />;
};
