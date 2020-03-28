import React from "react";
import goback from "../assets/icons/backIcon.png";
import { Image, ImageStyle, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export const GoBackButton = () => {
  const navigation = useNavigation();
  const onPress = () => navigation.goBack();

  return (
    <TouchableOpacity onPress={onPress}>
      <Image style={styles.icon} source={goback} />
    </TouchableOpacity>
  );
};

type Style = {
  icon: ImageStyle;
};

const styles = StyleSheet.create<Style>({
  icon: {
    width: 32,
    height: 32
  }
});
