import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HeatMap from "./HeatMap"
import BusMap from "./BusMap"
import MapHome from "./MapHome"


const mStack = createStackNavigator();

const ScanStack = () => {
  return (
    <mStack.Navigator>
      <mStack.Screen name="MapHub" component={MapHome} />
      <mStack.Screen name="HeatMap" component={HeatMap} />
      <mStack.Screen name="Ecosystem Business Map" component={BusMap} />
    </mStack.Navigator>
  )
}

export default ScanStack;
