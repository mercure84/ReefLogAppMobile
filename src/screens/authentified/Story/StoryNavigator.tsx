import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StoryScreen from "./StoryScreen";
import { NewTestScreen } from "./waterTest/NewTestScreen";

const Stack = createStackNavigator();

export const StoryNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="mainStory"
        component={StoryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="addTests"
        component={NewTestScreen}
        initialParams={{ waterTest: null }}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
