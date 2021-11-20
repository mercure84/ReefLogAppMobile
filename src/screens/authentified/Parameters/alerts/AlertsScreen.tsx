import React, { useContext, useEffect } from "react";
import { Header } from "react-native-elements";
import { View, ViewStyle, StyleSheet } from "react-native";
import { GoBackButton } from "../../../../components/GoBackButton";
import { observer } from "mobx-react";
import RootStore from "../../../../store/RootStore";
import { AlertsForm } from "./AlertsForm";
import { ReefHeaderTitle } from "../../../../components/ReefHeaderTitle";
import { ReefActivityIndicator } from "../../../../components/ReefActivityIndicator";
import { ThemeContext } from "../../../../../App";

export const AlertsScreen = observer(() => {
  const { darkColor } = useContext(ThemeContext).theme;
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
        containerStyle={{ backgroundColor: darkColor }}
        leftComponent={<GoBackButton />}
        centerComponent={<ReefHeaderTitle title="MES ALERTES" />}
      />
      {isAlertsLoading ? (
        <ReefActivityIndicator />
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
