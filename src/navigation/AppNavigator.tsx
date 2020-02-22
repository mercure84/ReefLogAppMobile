import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/welcome/WelcomeScreen';
import DashBoardScreen from '../screens/authentified/DashBoardScreen';
import EventsScreen from '../screens/authentified/EventsScreen';
import ParametersScreen from '../screens/authentified/ParametersScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const MainNavigator = ({ isTokenOK }) => {

  console.log("isTokenOK ??? " + isTokenOK)
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {!isTokenOK ? (<Stack.Screen name="Welcome" component={WelcomeScreen} />) :
          (<Stack.Screen name="Identified">
            {

              () => (<Tab.Navigator initialRouteName="DashBoard">
                <Tab.Screen name="DashBoard" component={DashBoardScreen} />
                <Tab.Screen name="Story" component={EventsScreen} />
                <Tab.Screen name="Paramètres" component={ParametersScreen} />
              </Tab.Navigator>)
            }
          </Stack.Screen>)
        }<Stack.Screen name="Signout" component={WelcomeScreen} />
        <Stack.Screen name="AuthentOk">
          {

            () => (<Tab.Navigator initialRouteName="DashBoard">
              <Tab.Screen name="DashBoard" component={DashBoardScreen} />
              <Tab.Screen name="Story" component={EventsScreen} />
              <Tab.Screen name="Paramètres" component={ParametersScreen} />
            </Tab.Navigator>)
          }
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>

  )
}