import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Scan from "./Scan";
import CustomerProfile from "./CustomerProfile";

const Stack = createStackNavigator();

const ScanStack = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Scan" component={Scan} />
      <Stack.Screen name="Profile" component={CustomerProfile} />
    </Stack.Navigator>
  );
};

export default ScanStack;
