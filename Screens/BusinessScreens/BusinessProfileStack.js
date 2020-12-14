import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BusinessVisits from "./BusinessVisits";
import BusinessProfile from "./BusinessProfile";
import VisitorProfile from "./VisitorProfile";

const Stack = createStackNavigator();

const BusinessProfileStack = (props) => {
  const { businessId } = props;
  return (
    <Stack.Navigator>
      <Stack.Screen name="Business Profile" component = {BusinessProfile} initialParams={{ businessId: businessId }}
       />
      <Stack.Screen name="Visits" component={BusinessVisits} />
      <Stack.Screen name="Visitor Profile" component={VisitorProfile} />
    </Stack.Navigator>
  );
};

export default BusinessProfileStack;
