import React, { useContext } from "react";
import { Header } from "react-native-elements";
import { View, ViewStyle, StyleSheet } from "react-native";
import { GoBackButton } from "../../../../components/GoBackButton";
import { ReefHeaderTitle } from "../../../../components/ReefHeaderTitle";
import { ThemeContext } from "../../../../../App";
import { ThemeSelector } from "./ThemeSelector";

export const MyProfilScreen = () => {
  const { darkColor } = useContext(ThemeContext).theme.theme;
  return (
    <View style={styles.page}>
      <Header
        containerStyle={{ backgroundColor: darkColor }}
        leftComponent={<GoBackButton />}
        centerComponent={<ReefHeaderTitle title="MON PROFIL" />}
      />
      <ThemeSelector />
    </View>
  );
};

type Style = {
  page: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  page: {
    alignItems: "stretch",
  },
});
