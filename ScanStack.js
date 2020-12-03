import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Scan from "./Scan"
import Profile from "./Profile"

const Stack = createStackNavigator();

const ScanStack = () => {
  return (
    // <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen
          name="Scan"
          component={Scan}
        />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    // </NavigationContainer>
  )
}

export default ScanStack;
