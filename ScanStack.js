import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Scan from "./Scan";
import Profile from "./Profile";
import AddBusiness from "./AddBusiness";

const Stack = createStackNavigator();

const ScanStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Scan" component={Scan} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="AddBusiness" component={AddBusiness} />
    </Stack.Navigator>
  );
};

export default ScanStack;
