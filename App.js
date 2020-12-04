import 'react-native-gesture-handler';
import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Scan from './Scan'
import Map from './Map'
import HelloWorldSceneAR from './Viro'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Scan"
        screenOptions={({ route }) => ({
          // eslint-disable-next-line react/display-name
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Scan') {
              iconName = 'magnify';
            } else if (route.name === 'Map') {
              iconName = 'google-maps';
            } else if (route.name === 'Viro') {
              iconName = 'augmented-reality';
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: '#9D9589',
        }}
      >
        <Tab.Screen name="Scan" component={Scan} />
        <Tab.Screen name="Map" component={Map} />
        <Tab.Screen name="Viro" component={HelloWorldSceneAR} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App
