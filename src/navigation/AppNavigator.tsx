import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DashBoardScreen from '../screens/DashBoardScreen';
import EventsScreen from '../screens/EventsScreen';
import ParametersScreen from '../screens/ParametersScreen';
import HomeScreen from '../screens/HomeScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="DashBoard" >
        <Tab.Screen name="DashBoard" component={DashBoardScreen} />
        <Tab.Screen name="Story" component={EventsScreen} />
        <Tab.Screen name="Paramètres" component={ParametersScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
};

export const HomeNavigator = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>



  )




}