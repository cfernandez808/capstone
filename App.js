import 'react-native-gesture-handler';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScanStack from './ScanStack'
import MapStack from './Maps/MapStack'
import HelloWorldSceneAR from './Viro'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
const Tab = createBottomTabNavigator();

const signUpConfig = {
  header: 'Business Owner Sign Up',
  hideAllDefaults: true,
  defaultCountryCode: '1',
  signUpFields: [
    {
      label: 'Business Name',
      key: 'name',
      required: true,
      displayOrder: 1,
      type: 'string'
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      displayOrder: 5,
      type: 'password'
    },
    {
      label: 'Phone Number',
      key: 'phone_number',
      required: true,
      displayOrder: 3,
      type: 'string'
    },
    {
      label: 'Email',
      key: 'email',
      required: true,
      displayOrder: 4,
      type: 'string'
    },
    {
      label: 'Address',
      key: 'address',
      required: true,
      displayOrder: 2,
      type: 'string'
    }
  ]
}

import { withAuthenticator } from "aws-amplify-react-native";

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Scan"
          screenOptions={({ route }) => ({
            // eslint-disable-next-line react/display-name
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Scan') {
                iconName = 'magnify';
              } else if (route.name === 'MapHub') {
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
          <Tab.Screen name="Scan" component={ScanStack} />
          <Tab.Screen name="MapHub" component={MapStack} />
          <Tab.Screen name="Viro" component={HelloWorldSceneAR} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default withAuthenticator(App, {
  includeGreetings: true,
  signUpConfig,
  usernameAttributes: 'email'
});
