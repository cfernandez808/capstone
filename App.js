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

// const Stack = createStackNavigator();

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
                iconName = 'account-search';
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

export default App;
