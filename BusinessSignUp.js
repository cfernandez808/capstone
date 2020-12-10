import React, { useState, useEffect, Fragment } from "react";
import { Button, View, TextInput } from "react-native"
import Amplify, { Auth, API, graphqlOperation } from "aws-amplify";
import config from "./aws-exports";
import Geocoder from "react-native-geocoding";
import './secrets.js'

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

Geocoder.init(process.env.GOOGLE_MAPS_API_KEY);

const BusinessSignUp = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [businessId, setBusinessId] = useState("");
  const [step, setStep] = useState(0);

  const signUp = async () => {
    try {
      const { user } = await Auth.signUp({
        username: name,
        password,
        attributes: {
          phone_number: phone,
          email,
          address,
        }
      })
      console.log("signed up successfully", user)
      setStep(1);
    } catch (error) {
      console.log("failed to sign up", error)
    }
  }

  const confirmSignUp = async () => {
    try {
      await Auth.confirmSignUp(username, code)
    } catch (error) {
      console.log("failed to conform sign up", error);
    }
  }

  const createNewBusiness = async() => {
    try {
      const business = {
        name,
        phone,
        address,
        lat,
        lng
      };

      await API.graphql(graphqlOperation(createBusiness, {input: business}))

    } catch (error) {
      console.log("failed to send business owner info to database", error);
    }
  }

  // const getCoordinates = () => {

  // }

  const onSubmit = async () => {

  };


  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      { step === 0 ?
      <Fragment>
        <TextInput
          placeholder="Business name"
          onChangeText={(txt) => setName(txt)}
          placeholderTextColor="#F194FF"
        />
        <TextInput
          placeholder="Business phone"
          onChangeText={(txt) => setPhone(txt)}
          placeholderTextColor="#F194FF"
        />
        <TextInput
          placeholder="Business email"
          onChangeText={(txt) => setEmail(txt)}
          placeholderTextColor="#F194FF"
        />
        <TextInput
          placeholder="Business address"
          onChangeText={(txt) => setAddress(txt)}
          placeholderTextColor="#F194FF"
        />
        <Button title="Add Business" onPress={onSubmit} />
      </Fragment> :
      <Fragment>

      </Fragment> }
    </View>
  );
};
export default BusinessSignUp;
