import { createBottomTabNavigator } from "react-navigation-tabs";
import React from "react";

import { createAppContainer } from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeScreen from "../screens/HomeScreen";
import DashboardScreen from "../screens/DashBoardScreen";
import EventsScreen from "../screens/EventsScreen";
import ParametersScreen from "../screens/ParametersScreen";

const Navigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: "Accueil",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-apps" color={tintColor} size={25} />
        )
      }
    },
    DashBoard: {
      screen: DashboardScreen,
      navigationOptions: {
        tabBarLabel: "DashBoard",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-home" color={tintColor} size={25} />
        )
      }
    },
    Events: {
      screen: EventsScreen,
      navigationOptions: {
        tabBarLabel: "Mes évènements",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-create" color={tintColor} size={25} />
        )
      }
    },
    Params: {
      screen: ParametersScreen,
      navigationOptions: {
        tabBarLabel: "Paramètres",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-options" color={tintColor} size={25} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "red",
      inactiveTintColor: "grey",
      showIcon: true
    }
  }
);

export default createAppContainer(Navigator);
