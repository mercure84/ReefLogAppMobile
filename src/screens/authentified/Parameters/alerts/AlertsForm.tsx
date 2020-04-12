import React, { useState } from "react";
import { View, Text, Switch, ViewStyle, StyleSheet } from "react-native";
import { ReefButton } from "../../../../components/ReefButton";
import { NumericStepper } from "../../../../components/NumericStepper";
import { Alert } from "../../../../services/alertsService";
import RootStore from "../../../../store/RootStore";

type Props = {
  existingAlerts: Alert[];
};

export const AlertsForm = ({ existingAlerts }: Props) => {
  const [alerts, setAlerts] = useState<Alert[]>(existingAlerts);

  const changeIsActive = (isActive: boolean, pAlert: Alert) => {
    const index = alerts.findIndex(alert => alert === pAlert);
    pAlert.active = isActive;
    let updatedAlerts = [...alerts];
    updatedAlerts[index] = pAlert;
    setAlerts(updatedAlerts);
  };

  const changeDayInterval = (newInterval: number, pAlert: Alert) => {
    const index = alerts.findIndex(alert => alert === pAlert);
    pAlert.dayInterval = newInterval;
    let updatedAlerts = [...alerts];
    updatedAlerts[index] = pAlert;
    setAlerts(updatedAlerts);
  };

  const submitAlert = () => {
    //RootStore.alertStore.;
  };

  return (
    <>
      <ReefButton title="Sauver" onPress={() => submitAlert()} />

      {Object.entries(alerts).map(([key, value]) => (
        <View style={styles.switchContainer} key={key}>
          <View style={styles.leftContainer}>
            <Text>{value.typeTest}</Text>
            <NumericStepper
              value={value.dayInterval}
              minValue={0}
              maxValue={60}
              onChange={change => changeDayInterval(change, value)}
            />
          </View>
          <Text> jours </Text>

          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={value.active ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={change => changeIsActive(change, value)}
            value={value.active}
          />
        </View>
      ))}
    </>
  );
};

type Style = {
  switchContainer: ViewStyle;
  leftContainer: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  switchContainer: {
    padding: 4,
    marginHorizontal: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center"
  },
  leftContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    flex: 2
  }
});
