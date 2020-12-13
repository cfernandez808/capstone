import React, { useState, useEffect } from "react";
import { View, TextInput } from "react-native";
import { API } from "aws-amplify";
import * as queries from '../../graphql/queries'

const VisitorProfile = ({route}) => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const { customerID } = route.params;
  useEffect(() => {
    fetchCustomerInfo(customerID);
  }, [])

  const fetchCustomerInfo = async (cutomerID) => {
    try {
        const customer = await getCustomerWithVisits(customerID);
        console.log("who is customer", customer);
    } catch (error) {
      console.log('failed to load customers', error)
    }
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TextInput
        value = {email}
        onChangeText={txt => setEmail(txt)}
        placeholderTextColor="#f194ff"
      />
      <TextInput
        value={phone}
        onChangeText={(txt) => setPhone(txt)}
        placeholderTextColor="#f194ff"
      />
      <TextInput
        value={firstName}
        onChangeText={(txt) => setFirstName(txt)}
        placeholderTextColor="#f194ff"
      />
      <TextInput
        value={lastName}
        onChangeText={(txt) => setLastName(txt)}
        placeholderTextColor="#f194ff"
      />
    </View>
  )
}

//helper functions

const getCustomerWithVisits = async (customerID) => {
  try {
  const { data } = await API.graphql({ query: queries.getCustomer, variables: { id: customerID }})
  return data.getCustomer;
  } catch (error) {
    console.log("failed to get customer with visits", error);
  }
}

export default VisitorProfile;
