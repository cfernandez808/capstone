import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BusinessVisitors from "./BusinessVisitors";
import BusinessProfile from "./BusinessProfile";

const Stack = createStackNavigator();

const BusinessProfileStack = (props) => {
  const { businessId } = props;
  return (
    <Stack.Navigator>
      <Stack.Screen name="Business Profile" children={() => <BusinessProfile businessId={businessId}/>}
       />
      <Stack.Screen name="Visitors" component={BusinessVisitors} />
    </Stack.Navigator>
  );
};

export default BusinessProfileStack;
