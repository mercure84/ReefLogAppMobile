import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StoryScreen from "./StoryScreen";
import { NewTestScreen } from "./NewTestScreen";

const Stack = createStackNavigator();

export const StoryNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="mainStory" component={StoryScreen} />
      <Stack.Screen name="addTests" component={NewTestScreen} />
    </Stack.Navigator>
  );
};