import React, { useState, useEffect } from "react";
<<<<<<< HEAD
// import { Button, TextInput, View, Text, StyleSheet } from "react-native";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";
import { updateBusiness } from "../../graphql/mutations";
import Geocoder from "react-native-geocoding";
import { StyleSheet, View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";

const BusinessProfile = ({ navigation, route }) => {
  const [Bname, setBname] = useState("");
  const [Bemail, setBemail] = useState("");
  const [Bphone, setBphone] = useState("");
  const [Baddress, setBaddress] = useState("");
  const [visits, setVisits] = useState([]);
=======
import { View, StyleSheet} from "react-native"
import { TextInput, Button } from "react-native-paper";
import { API, Auth, graphqlOperation } from "aws-amplify";
import * as queries from '../../graphql/queries'
import { updateBusiness } from '../../graphql/mutations'
import Geocoder from 'react-native-geocoding'

const BusinessProfile = ({ navigation, route }) => {
  const [Bname, setBname] = useState("");
  const [Bemail, setBemail] = useState("")
  const [Bphone, setBphone] = useState("")
  const [Baddress, setBaddress] = useState("")
  const [Bvisits, setBvisits] = useState("")
>>>>>>> main

  const { businessId } = route.params;

  useEffect(() => {
    loadProfileForm(businessId);
<<<<<<< HEAD
  }, []);

  const loadProfileForm = async (businessId) => {
    // console.log(businessId);
    const { name, address, email, phone, visits } = await getBusinessWithVisits(
      businessId
    );
=======
  }, [])

  const loadProfileForm = async (businessId) => {
    console.log(businessId);
    const {name, address, email, phone, visits } = await getBusinessWithVisits(businessId);
>>>>>>> main
    setBname(name);
    setBaddress(address);
    setBemail(email);
    setBphone(phone);
<<<<<<< HEAD
    setVisits(visits.items);
  };
=======
    setBvisits(visits.items);
  }
>>>>>>> main

  const handleSubmit = async () => {
    try {
      const { formattedAddress, lat, lng } = await getCoordinates(Baddress);
      const updateData = {
        id: businessId,
        name: Bname,
        email: Bemail,
        phone: Bphone,
        address: formattedAddress,
        lat,
        lng,
      };
      const updatedBusiness = await API.graphql(
        graphqlOperation(updateBusiness, { input: updateData })
      );
      console.log("successfully updated business profile", updatedBusiness);
    } catch (error) {
      console.log("failed to update business profile", error);
<<<<<<< HEAD
=======
    }
  };

  const handlePress = async(businessId) => {
    const { visits } = await getBusinessWithVisits(businessId);
    const currentVisits = visits.items;
    if (currentVisits.length !== Bvisits.length) setBvisits(currentVisits)
    navigation.navigate("Visits", { currentVisits })
  }

  const signout = async() => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('failed to sign out', error)
>>>>>>> main
    }
  };

  return (
<<<<<<< HEAD
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Text style={styles.title}>{`${visits.length} total visits and ${
        visits.filter((visit) => visit.hasSymptom.toLowerCase().includes("yes"))
          .length
      } COVID case(s)`}</Text>
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Business Name"
        value={Bname}
        onChangeText={(txt) => setBname(txt)}
        placeholderTextColor="#F194FF"
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Address"
        value={Baddress}
        onChangeText={(txt) => setBaddress(txt)}
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Phone Number"
        value={Bphone}
        onChangeText={(txt) => setBphone(txt)}
        placeholderTextColor="#F194FF"
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        editable={false}
        label="Email"
        value={Bemail}
        onChangeText={(txt) => setBemail(txt)}
        placeholderTextColor="#F194FF"
      />

      <Button
        mode="contained"
        style={styles.button}
        color="red"
        onPress={handleSubmit}
      >
        {" "}
        Update Profile
      </Button>

      <Button
        mode="contained"
        style={styles.button}
        color="red"
        onPress={() => {
          navigation.navigate("Visits", { visits });
        }}
      >
        {" "}
        View Visits
      </Button>
=======
    <View>
        <TextInput
          style = {styles.input}
          mode= "outlined"
          label="Business Name"
          value={Bname}
          onChangeText={(txt) => setBname(txt)}
        />
        <TextInput
          style = {styles.input}
          mode= "outlined"
          label="Address"
          value={Baddress}
          onChangeText={(txt) => setBaddress(txt)}
        />
        <TextInput
          style = {styles.input}
          mode= "outlined"
          label="Phone Number"
          value={Bphone}
          onChangeText={(txt) => setBphone(txt)}
        />
        <TextInput
          style = {styles.input}
          mode= "outlined"
          editable = {false}
          label="Email"
          value={Bemail}
          onChangeText={(txt) => setBemail(txt)}
        />
        <Button mode="contained" style={styles.button} onPress={handleSubmit}>Update Profile</Button>
        <Button mode="contained" style={styles.button} onPress={() => {handlePress(businessId)}}>View Visits</Button>
        <Button mode="contained" style={styles.button} onPress={signout}>Sign Out</Button>
>>>>>>> main
    </View>
  );
};

const styles = StyleSheet.create({
<<<<<<< HEAD
  input: {
    marginBottom: 20,
    marginLeft: 3,
    marginRight: 2,
    fontWeight: "bold",
    fontSize: 17,
    justifyContent: "center",
    backgroundColor: "#e2e2ff",
    height: 40,
  },

  button: {
    backgroundColor: "#F4A261",
    color: "#FFFFFF",
    margin: 10,
    height: 50,
  },
  title: {
    margin: 20,
    height: 50,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
});
=======
  input:{
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 3,
    marginRight: 3,
  },
  button: {
    backgroundColor: "#f4a261",
    color: "#ffffff",
    margin: 10,
    height: 50,
  }
})
>>>>>>> main

export default BusinessProfile;

//helper functions

// get business with all its visits
<<<<<<< HEAD
const getBusinessWithVisits = async (businessId) => {
  try {
    const { data } = await API.graphql({
      query: queries.getBusiness,
      variables: { id: businessId },
    });
=======
export const getBusinessWithVisits = async (businessId) => {
  try{
    const { data } = await API.graphql({ query: queries.getBusiness, variables: { id: businessId }});
>>>>>>> main
    const businessInfo = data.getBusiness;
    return businessInfo;
  } catch (error) {
    console.log("failed to fetch business information", error);
  }
};

// formate address and convert address into coordinates
const getCoordinates = async (address) => {
  try {
    const data = await Geocoder.from(address);
    const formattedAddress = data.results[0].formatted_address;
    const { lat, lng } = data.results[0].geometry.location;
    return { formattedAddress, lat, lng };
  } catch (error) {
    console.log("failed to convert address to coordinates", error);
  }
};
