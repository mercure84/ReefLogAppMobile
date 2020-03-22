import React from "react";
import { Header, Text } from "react-native-elements";
import { View, ViewStyle, StyleSheet } from "react-native";

export const AlertsScreen = () => {
  return (
    <View style={styles.page}>
      <Header
        centerComponent={<Text style={{ fontSize: 16 }}>Mes alertes</Text>}
        backgroundColor="pink"
      />
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
