import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Scan from "./Scan";
import CustomerProfile from "./CustomerProfile";

const Stack = createStackNavigator();

const ScanStack = (props) => {
  const { businessId } = props;

  return (
    <Stack.Navigator>
      <Stack.Screen name="Scan" component={Scan} />
      <Stack.Screen name="Customer Profile" component={CustomerProfile} initialParams={{ businessId: businessId }}/>
    </Stack.Navigator>
  );
};

export default ScanStack;
