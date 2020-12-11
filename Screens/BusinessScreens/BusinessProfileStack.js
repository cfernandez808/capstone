import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BusinessVisitors from "./BusinessVisitors";
import BusinessProfile from "./BusinessProfile";

const Stack = createStackNavigator();

const BusinessStack = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Your Business Profile" component={BusinessProfile} />
      <Stack.Screen name="Visitors" component={BusinessVisitors} />
    </Stack.Navigator>
  );
};

export default BusinessStack;
