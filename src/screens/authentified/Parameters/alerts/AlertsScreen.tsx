import React from "react";
import { Header, Text } from "react-native-elements";
import { View, ViewStyle, StyleSheet, Switch } from "react-native";
import { GoBackButton } from "../../../../components/GoBackButton";

export const AlertsScreen = () => {
  return (
    <View style={styles.page}>
      <Header
        leftComponent={<GoBackButton />}
        centerComponent={<Text style={{ fontSize: 16 }}>Mes alertes</Text>}
        backgroundColor="pink"
      />

      <Text style={{ padding: 16 }}>
        Pour quels tests souhaitez vous avoir un rappel ?
      </Text>
      <View style={styles.testContainer}>
        <Text>Température</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={true ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={null}
          value={true}
        />
      </View>
    </View>
  );
};

type Style = {
  page: ViewStyle;
  testContainer: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  testContainer: {
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  page: {
    alignItems: "stretch"
  }
});
