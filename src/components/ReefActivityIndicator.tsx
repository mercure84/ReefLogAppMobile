import React from "react";
import { ActivityIndicator } from "react-native";
import { darkColor } from "../utils/helpers";

export const ReefActivityIndicator = () => {
  return <ActivityIndicator size="large" color={darkColor} />;
};
