import React, { useState } from "react";
import { Header, Text } from "react-native-elements";
import { View, ViewStyle, StyleSheet, Switch } from "react-native";
import { GoBackButton } from "../../../../components/GoBackButton";
import { TypeTest, Alert } from "../../../../services/alertsService";
import { observer } from "mobx-react";
import { ReefButton } from "../../../../components/ReefButton";

export const AlertsScreen = observer(() => {
  const listeTypeTest = TypeTest;
  const [alerts, setAlerts] = useState<Alert[]>([]);
  //construction de l'array d'alertes si celle ci est vide
  if (alerts.length === 0) {
    Object.entries(listeTypeTest).map(([key, value]) => {
      let alert: Alert = {
        typeTest: value,
        targetValue: 0,
        isActive: false,
        dayInterval: 7
      };
      setAlerts(alerts => [...alerts, alert]);
    });
  }

  const changeIsActive = (isActive: boolean, pAlert: Alert) => {
    const alertToUpdate = alerts.filter(alert => alert === pAlert)[0];
    const index = alerts.findIndex(alert => alert === pAlert);
    alertToUpdate.isActive = isActive;
    let newAlerts = [...alerts];
    newAlerts[index] = alertToUpdate;
    setAlerts(newAlerts);
  };
  return (
    <View style={styles.page}>
      <Header
        leftComponent={<GoBackButton />}
        centerComponent={<Text style={{ fontSize: 16 }}>Mes alertes</Text>}
        backgroundColor="pink"
      />
      <ReefButton title="Sauver" onPress={() => null} />

      {Object.entries(alerts).map(([key, value]) => (
        <View style={styles.switchContainer} key={key}>
          <Text>{value.typeTest}</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={true ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={change => changeIsActive(change, value)}
            value={value.isActive}
          />
        </View>
      ))}
    </View>
  );
});

type Style = {
  page: ViewStyle;
  switchContainer: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  switchContainer: {
    padding: 4,
    marginHorizontal: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center"
  },
  page: {
    alignItems: "stretch"
  }
});
