import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import DashBoardScreen from '../screens/DashBoardScreen';
import EventsScreen from '../screens/EventsScreen';
import ParametersScreen from '../screens/ParametersScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="DashBoard" component={DashBoardScreen} />
        <Tab.Screen name="Story" component={EventsScreen} />
        <Tab.Screen name="Parameters" component={ParametersScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;