import React, { useState } from "react";
import { Header, Text } from "react-native-elements";
import { View, ViewStyle, StyleSheet } from "react-native";
import { ProfilForm } from "./ProfilForm";
import RootStore from "../../../../store/RootStore";
import { GoBackButton } from "../../../../components/GoBackButton";
import { ReefHeaderTitle } from "../../../../components/ReefHeaderTitle";

export const MyProfilScreen = () => {
  const member = RootStore.memberStore.member;

  return (
    <View style={styles.page}>
      <Header
        leftComponent={<GoBackButton />}
        centerComponent={<ReefHeaderTitle title="MON PROFIL" />}
      />
      {member && <ProfilForm memberToUpdate={member} />}
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
