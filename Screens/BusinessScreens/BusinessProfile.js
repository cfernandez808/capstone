import React, { useState, useEffect } from "react";
import { Button, View, TextInput } from "react-native"
import { Auth, API, graphqlOperation } from "aws-amplify";


const BusinessProfile = ({ navigation, route }) => {
  const { businessId } = route.params;
  console.log(businessId);
  useEffect(()=> {

  })

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
        <TextInput
          placeholder="Name"
          onChangeText={(txt) => setName(txt)}
          placeholderTextColor="#F194FF"
        />
        <TextInput
          placeholder="Phone Number"
          onChangeText={(txt) => setPhone(txt)}
          placeholderTextColor="#F194FF"
        />
        <TextInput
          placeholder="Email"
          onChangeText={(txt) => setEmail(txt)}
          placeholderTextColor="#F194FF"
        />
        <TextInput
          placeholder="Address"
          onChangeText={(txt) => setAddress(txt)}
          placeholderTextColor="#F194FF"
        />
        <Button title="Update Profile" />
    </View>
  );
};

export default BusinessProfile;
