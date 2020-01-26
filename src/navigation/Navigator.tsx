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
        title: "Accueil"
        //tabBarIcon: () => <Ionicons name="ios-home" size={25} />
      }
    },
    DashBoard: {
      screen: DashboardScreen,
      navigationOptions: {
        title: "Mon tableau de bord"
        //tabBarIcon: () => <Ionicons name="speedometer" size={25} />
      }
    },
    Events: {
      screen: EventsScreen,
      navigationOptions: {
        title: "Mes évènements"
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
