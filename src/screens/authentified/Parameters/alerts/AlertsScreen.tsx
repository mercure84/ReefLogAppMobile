import React from "react";
import { Header, Text } from "react-native-elements";
import { View, ViewStyle, StyleSheet, ActivityIndicator } from "react-native";
import { GoBackButton } from "../../../../components/GoBackButton";
import { observer } from "mobx-react";
import RootStore from "../../../../store/RootStore";
import { AlertsForm } from "./AlertsForm";

export const AlertsScreen = observer(() => {
  console.log("Etat de mon store des alertes = ", RootStore.alertStore.alertState)
  if (RootStore.alertStore.alertState === "pending") {
    RootStore.alertStore.fetchAlerts();
  }
  const isAlertsLoading = RootStore.alertStore.alertState === "pending";
  const alerts = RootStore.alertStore.alertsData

  return (
    <View style={styles.page}>
      <Header
        leftComponent={<GoBackButton />}
        centerComponent={<Text style={{ fontSize: 16 }}>Mes alertes</Text>}
        backgroundColor="pink"
      />

      {isAlertsLoading ? (
        <ActivityIndicator />
      ) : (
          <AlertsForm
            existingAlerts={alerts}
          />
        )}
    </View>
  );
});

type Style = {
  page: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  page: {
    alignItems: "stretch"
  }
});
