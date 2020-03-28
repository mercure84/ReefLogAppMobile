import React, { useState } from "react";
import { Header, Text } from "react-native-elements";
import { View, ViewStyle, StyleSheet } from "react-native";
import { ProfilForm } from "./ProfilForm";
import RootStore from "../../../../store/RootStore";
import { GoBackButton } from "../../../../components/GoBackButton";

export const MyProfilScreen = () => {
  const [rootStore] = useState(RootStore);
  const member = rootStore.memberStore.member;

  return (
    <View style={styles.page}>
      <Header
        leftComponent={<GoBackButton />}
        centerComponent={
          <Text style={{ fontSize: 16 }}>Modifier mon profil</Text>
        }
        backgroundColor="pink"
      />

      <ProfilForm memberToUpdate={member} />
    </View>
  );
};

type Style = {
  page: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  page: {
    alignItems: "stretch"
  }
});
