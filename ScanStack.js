import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Scan from "./Scan";
import Profile from "./Profile";
import Amplify, { Auth } from "aws-amplify";
import config from "./aws-exports";
import * as queries from './graphql/queries'
import Geocoder from 'react-native-geocoding'
import './secrets'

Geocoder.init(process.env.GOOGLE_MAPS_API_KEY);

// perhaps we only need to config once at the root?
Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

const Stack = createStackNavigator();

const ScanStack = () => {
  const [Bname, setBname] = useState("")
  const [Bemail, setBemail] = useState("")
  const [Bphone, setBphone] = useState("")
  const [Baddress, setBaddress] = useState("")
  const [Blat, setBlat] = useState("")
  const [Blng, setBlng] = useState("")

  const getCoordinates = async (address) => {
    try {
      const data = await Geocoder.from(address);
      const formattedAddress = data.results[0].formatted_address;
      const { lat, lng } = data.results[0].geometry.location;
      return {formattedAddress, lat, lng};
    } catch (error) {
      console.log('failed to convert address to coordinates', error);
    }
  }

  const fetchCurrentUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const { address, email, phone_number, name } = user.attributes;
      const {formattedAddress, lat, lng} = getCoordinates(address);
      setBemail(email);
      setBphone(phone_number);
      setBname(name);
      setBaddress(formattedAddress);
      setBlat(lat);
      setBlng(lng);
    } catch (error) {
      console.log('failed to retrieve authenticated user', error)
    }
  }

  const checkBusiness = async () => {

  }

  useEffect(() => {
    fetchCurrentUser();
  }, [])

  return (
    <Stack.Navigator>
      <Stack.Screen name="Scan" component={Scan} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default ScanStack;



