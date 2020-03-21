import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DashBoardScreen from "./DashBoardScreen";
import { PopulationScreen } from "./PopulationScreen";
import { EquipmentScreen } from "./EquipmentScreen";
import { NewAnimalScreen } from "./NewAnimalScreen";
import { UpdateAnimalScreen } from "./UpdateAnimalScreen";
import { NewEquipmentScreen } from "./NewEquipmentScreen";

const Stack = createStackNavigator();

export const DashBoardNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="main" component={DashBoardScreen} />
      <Stack.Screen name="handlePopulation" component={PopulationScreen} />
      <Stack.Screen name="handleEquipment" component={EquipmentScreen} />
      <Stack.Screen name="newAnimal" component={NewAnimalScreen} />
      <Stack.Screen name="updateAnimal" component={UpdateAnimalScreen} />
      <Stack.Screen
        name="newEquipment"
        component={NewEquipmentScreen}
        initialParams={{ equipment: null }}
      />
    </Stack.Navigator>
  );
};
