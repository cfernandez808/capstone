import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ScanStack from "./ScanStack";
// import Scan from './Scan';
import Map from "./Map";
import AddBusiness from "./AddBusiness";
import HelloWorldSceneAR from "./Viro";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
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

            if (route.name === "Scan") {
              iconName = "magnify";
            } else if (route.name === "Map") {
              iconName = "google-maps";
            } else if (route.name === "Viro") {
              iconName = "augmented-reality";
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "#9D9589",
        }}
      >
        <Tab.Screen name="Scan" component={ScanStack} />
        <Tab.Screen name="Map" component={Map} />
        <Tab.Screen name="Viro" component={HelloWorldSceneAR} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
