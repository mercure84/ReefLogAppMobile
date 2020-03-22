import React from "react";
import { View, Text, ViewStyle, StyleSheet } from "react-native";
import { Header } from "react-native-elements";

export const ToolsScreen = () => {
  return (
    <View style={styles.page}>
      <Header
        centerComponent={<Text style={{ fontSize: 16 }}>Mes outils</Text>}
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
