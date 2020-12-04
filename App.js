import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScanStack from './ScanStack'
import Scan from './Scan';
import Map from './Map'
import HelloWorldSceneAR from './Viro'
const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Scan" component={ScanStack} />
        <Tab.Screen name="Map" component={Map} />
        <Tab.Screen name="Viro" component={HelloWorldSceneAR} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App
