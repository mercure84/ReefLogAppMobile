import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import DashboardScreen from "../screens/DashBoardScreen";

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: "Accueil"
    }
  },
  DashBoard: {
    screen: DashboardScreen,
    navigationOptions: {
      title: "Mon tableau de bord"
    }
  },
  Events: {
    screen: DashboardScreen,
    navigationOptions: {
      title: "Mes évènements"
    }
  }
});

export default createAppContainer(AppNavigator);
