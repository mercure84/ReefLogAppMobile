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
      <Stack.Screen name="main" component={DashBoardScreen} />
      <Stack.Screen name="handlePopulation" component={PopulationScreen} />
      <Stack.Screen name="handleEquipment" component={EquipmentScreen} />
      <Stack.Screen name="newAnimal" component={NewAnimalScreen} />
      <Stack.Screen name="updateAnimal" component={UpdateAnimalScreen} />
      <Stack.Screen
        name="saveEquipment"
        component={NewEquipmentScreen}
        initialParams={{ equipment: null }}
      />
    </Stack.Navigator>
  );
};
