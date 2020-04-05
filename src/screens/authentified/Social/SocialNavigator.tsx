import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StoryScreen from "../Story/StoryScreen";

const Stack = createStackNavigator();

export const SocialNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="main"
        component={StoryScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
