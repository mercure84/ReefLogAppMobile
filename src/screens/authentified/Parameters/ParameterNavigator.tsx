import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ParameterScreen from "./ParameterScreen";
import { MyProfilScreen } from "./myprofil/MyProfilScreen";
import { AlertsScreen } from "./alerts/AlertsScreen";
import { ToolsScreen } from "./tools/ToolsScreen";

const Stack = createStackNavigator();

export const ParameterNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="main"
        component={ParameterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="myProfil"
        component={MyProfilScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="myAlerts"
        component={AlertsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="myTools"
        component={ToolsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
