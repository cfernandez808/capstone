import React, { useState, useEffect } from "react";
import { Button, View, TextInput } from "react-native"
import { Auth, API, graphqlOperation } from "aws-amplify";


const BusinessProfile = () => {

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
        <Button title="Update Profile" onPress={onSubmit} />
    </View>
  );
};

export default BusinessProfile;
