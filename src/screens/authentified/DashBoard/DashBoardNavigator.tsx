import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DashBoardScreen from "./DashBoardScreen";
import { PopulationScreen } from "./PopulationScreen";
import { EquipmentScreen } from "./EquipmentScreen";

const Stack = createStackNavigator();

export const DashBoardNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="main" component={DashBoardScreen} />
      <Stack.Screen name="handlePopulation" component={PopulationScreen} />
      <Stack.Screen name="handleEquipment" component={EquipmentScreen} />
    </Stack.Navigator>
  );
};
