import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeScreen from "../screens/HomeScreen";
import DashboardScreen from "../screens/DashBoardScreen";
import EventsScreen from "../screens/EventsScreen";

const Navigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: "Accueil"
      }
    },
    DashBoard: {
      screen: DashboardScreen,
      navigationOptions: {
        tabBarLabel: "Mon tableau de bord"
      }
    },
    Events: {
      screen: EventsScreen,
      navigationOptions: {
        tabBarLabel: "Mes évènements"
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "red",
      inactiveTintColor: "grey"
    }
  }
);

export default createAppContainer(Navigator);
