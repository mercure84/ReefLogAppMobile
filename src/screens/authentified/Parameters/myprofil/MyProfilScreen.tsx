import React, { useContext } from "react";
import { Header } from "react-native-elements";
import { View, ViewStyle, StyleSheet } from "react-native";
import { ProfilForm } from "./ProfilForm";
import RootStore from "../../../../store/RootStore";
import { GoBackButton } from "../../../../components/GoBackButton";
import { ReefHeaderTitle } from "../../../../components/ReefHeaderTitle";
import { ThemeContext } from "../../../../../App";
import { ThemeSelector } from "./ThemeSelector";

export const MyProfilScreen = () => {
  const member = RootStore.memberStore.member;
  const { darkColor } = useContext(ThemeContext).theme.theme;
  return (
    <View style={styles.page}>
      <Header
        containerStyle={{ backgroundColor: darkColor }}
        leftComponent={<GoBackButton />}
        centerComponent={<ReefHeaderTitle title="MON PROFIL" />}
      />
      {member && <ProfilForm memberToUpdate={member} />}
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
