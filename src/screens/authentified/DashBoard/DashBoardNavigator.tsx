import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DashBoardScreen from "./DashBoardScreen";

const Stack = createStackNavigator();

export const DashBoardNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="main"
        component={DashBoardScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
