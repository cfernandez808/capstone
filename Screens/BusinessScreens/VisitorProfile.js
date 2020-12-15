import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { API } from "aws-amplify";
import * as queries from "../../graphql/queries";
import { TextInput } from "react-native-paper";
const VisitorProfile = ({ route }) => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { customerID } = route.params;

  const fetchCustomerInfo = async (cutomerID) => {
    try {
      const customer = await getCustomerWithVisits(customerID);
      setEmail(customer.email);
      setPhone(customer.phone);
      setFirstName(customer.firstName);
      setLastName(customer.lastName);
    } catch (error) {
      console.log("failed to load customers", error);
    }
  };

  useEffect(() => {
    fetchCustomerInfo(customerID);
  }, []);

  return (
    <View>
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Email Address"
        value={email}
        onChangeText={(txt) => setEmail(txt)}
        placeholderTextColor="#f194ff"
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Phone Number"
        value={phone}
        onChangeText={(txt) => setPhone(txt)}
        placeholderTextColor="#f194ff"
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        label="First Name"
        value={firstName}
        onChangeText={(txt) => setFirstName(txt)}
        placeholderTextColor="#f194ff"
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Last Name"
        value={lastName}
        onChangeText={(txt) => setLastName(txt)}
        placeholderTextColor="#f194ff"
      />
    </View>
  );
};

//helper functions

const getCustomerWithVisits = async (customerID) => {
  try {
    const { data } = await API.graphql({
      query: queries.getCustomer,
      variables: { id: customerID },
    });
    return data.getCustomer;
  } catch (error) {
    console.log("failed to get customer with visits", error);
  }
};
const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    fontWeight: "bold",
    fontSize: 15,
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#94E2B4",
  },
});
export default VisitorProfile;
