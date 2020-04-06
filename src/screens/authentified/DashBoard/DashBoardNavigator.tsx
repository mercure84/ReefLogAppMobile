import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DashBoardScreen from "./DashBoardScreen";
import { PopulationScreen } from "./population/PopulationScreen";
import { EquipmentScreen } from "./equipment/EquipmentScreen";
import { NewAnimalScreen } from "./population/NewAnimalScreen";
import { UpdateAnimalScreen } from "./population/UpdateAnimalScreen";
import { NewEquipmentScreen } from "./equipment/NewEquipmentScreen";

const Stack = createStackNavigator();

export const DashBoardNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="main"
        component={DashBoardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="handlePopulation"
        component={PopulationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="handleEquipment"
        component={EquipmentScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="newAnimal"
        component={NewAnimalScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="updateAnimal"
        component={UpdateAnimalScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="saveEquipment"
        component={NewEquipmentScreen}
        options={{ headerShown: false }}
        initialParams={{ equipment: null }}
      />
    </Stack.Navigator>
  );
};
