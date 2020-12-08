import React, { useState, useEffect } from "react";
import { Button, View, TextInput, Image } from "react-native";
import { createBusiness } from "./graphql/mutations";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import config from "./aws-exports";
import { listUsers } from "./graphql/queries";

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

const AddBusiness = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const onSubmit = async () => {
    await API.graphql(
      graphqlOperation(createBusiness, {
        input: {
          name,
          address,
          phone,
        },
      })
    );
  };

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
        placeholderTextColor="#f194ff"
      />
      <TextInput
        placeholder="Business phone"
        onChangeText={(txt) => setPhone(txt)}
        placeholderTextColor="#f194ff"
      />
      <TextInput
        placeholder="Business address"
        onChangeText={(txt) => setAddress(txt)}
        placeholderTextColor="#f194ff"
      />
      <Button title="Add Business" onPress={onSubmit} />
    </View>
  );
};

export default AddBusiness;
