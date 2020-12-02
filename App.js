import 'react-native-gesture-handler';
import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Scan from './Scan'
import Map from './Map'
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Scan" component={Scan} />
        <Tab.Screen name="Map" component={Map} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App
