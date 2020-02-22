import React from 'react';
import { Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/welcome/WelcomeScreen';
import DashBoardScreen from '../screens/authentified/DashBoardScreen';
import EventsScreen from '../screens/authentified/EventsScreen';
import ParametersScreen from '../screens/authentified/ParametersScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

//icons
import dashboardIcon from '../assets/icons/home.png'
import settingsIcon from '../assets/icons/settings-6.png'
import story from '../assets/icons/notepad.png'



const TabNavigator = () => {


  return (

    <Tab.Navigator initialRouteName="DashBoard">
      <Tab.Screen name="DashBoard" component={DashBoardScreen} options={{
        tabBarIcon: () => (
          <Image source={dashboardIcon} style={{ height: 24, width: 24 }} />
        ),
      }} />
      <Tab.Screen name="Story" component={EventsScreen} options={{
        tabBarIcon: () => (
          <Image source={story} style={{ height: 24, width: 24 }} />
        ),
      }} />
      <Tab.Screen name="Paramètres" component={ParametersScreen} options={{
        tabBarIcon: () => (
          <Image source={settingsIcon} style={{ height: 24, width: 24 }} />
        ),
      }} />
    </Tab.Navigator>
  )
}

export const MainNavigator = ({ isTokenOK }) => {

  console.log("isTokenOK ??? " + isTokenOK)
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {!isTokenOK ? (<Stack.Screen name="Welcome" component={WelcomeScreen} />) :
          (<Stack.Screen name="Identified">
            {

              () => TabNavigator()
            }
          </Stack.Screen>)
        }<Stack.Screen name="Signout" component={WelcomeScreen} />
        <Stack.Screen name="AuthentOk">
          {

            () => TabNavigator()
          }
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>

  )
}