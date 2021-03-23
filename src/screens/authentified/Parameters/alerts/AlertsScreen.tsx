import React, { useEffect, useState } from "react";
import { Header } from "react-native-elements";
import { View, ViewStyle, StyleSheet, ActivityIndicator } from "react-native";
import { GoBackButton } from "../../../../components/GoBackButton";
import { observer } from "mobx-react";
import RootStore from "../../../../store/RootStore";
import { AlertsForm } from "./AlertsForm";
import { ReefHeaderTitle } from "../../../../components/ReefHeaderTitle";

export const AlertsScreen = observer(() => {
  const { alertStore } = RootStore;

  useEffect(() => {
    const getAlerts = async () => {
      if (
        alertStore.updateState === "done" &&
        alertStore.fetchState === "pending"
      ) {
        await alertStore.fetchAlerts();
      }
    };
    getAlerts();
  }, [alertStore.fetchState]);

  const isAlertsLoading = alertStore.fetchState !== "done";
  const alerts = alertStore.alertsData;

  return (
    <View style={styles.page}>
      <Header
        leftComponent={<GoBackButton />}
        centerComponent={<ReefHeaderTitle title="MES ALERTES" />}
      />
      {isAlertsLoading ? (
        <ActivityIndicator />
      ) : (
        <AlertsForm existingAlerts={alerts} />
      )}
    </View>
  );
});

type Style = {
  page: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  page: {
    alignItems: "stretch",
  },
});
