import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StoryScreen } from "./StoryScreen";
import { EventScreen } from "./event/EventScreen";
import { WaterTestScreen } from "./waterTest/WaterTestScreen";
import { GraphScreen } from "./graph/GraphScreen";
import { CountScreen } from "./counting/CountScrean";

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
        name="events"
        component={EventScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="counting"
        component={CountScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="graph"
        component={GraphScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
