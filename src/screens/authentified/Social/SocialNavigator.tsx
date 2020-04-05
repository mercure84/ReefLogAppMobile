import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SocialScreen } from "./SocialScreen";

const Stack = createStackNavigator();

export const SocialNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="main"
        component={SocialScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
