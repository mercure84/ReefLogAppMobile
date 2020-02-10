import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import {createAppContainer} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import DashboardScreen from '../screens/DashBoardScreen';
import EventsScreen from '../screens/EventsScreen';
import ParametersScreen from '../screens/ParametersScreen';

const Navigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: 'Accueil',
        tabBarIcon: ({tintColor}) => null,
      },
    },
    DashBoard: {
      screen: DashboardScreen,
      navigationOptions: {
        tabBarLabel: 'DashBoard',
        tabBarIcon: ({tintColor}) => null,
      },
    },
    Events: {
      screen: EventsScreen,
      navigationOptions: {
        tabBarLabel: 'Mes évènements',
        tabBarIcon: ({tintColor}) => null,
      },
    },
    Params: {
      screen: ParametersScreen,
      navigationOptions: {
        tabBarLabel: 'Paramètres',
        tabBarIcon: ({tintColor}) => null,
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'grey',
      showIcon: true,
    },
  },
);

export default createAppContainer(Navigator);
