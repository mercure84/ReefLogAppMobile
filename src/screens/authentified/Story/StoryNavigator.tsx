import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StoryScreen } from "./StoryScreen";
import { NewTestScreen } from "./waterTest/NewTestScreen";
import { EventScreen } from "./event/EventScreen";
import { WaterTestScreen } from "./waterTest/WaterTestScreen";
import { CountScreen } from "./counting/CountingScreen";

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
        name="waterTests"
        component={WaterTestScreen}
        initialParams={{ waterTest: null }}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="addTests"
        component={NewTestScreen}
        initialParams={{ waterTest: null }}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="events"
        component={EventScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="counting"
        component={CountScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
