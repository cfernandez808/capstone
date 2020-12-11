import React, { useState, useEffect } from "react";
import { Button, View, TextInput } from "react-native"
import { API } from "aws-amplify";
import * as queries from '../../graphql/queries'


const BusinessProfile = ({ navigation, route }) => {
  const [Bname, setBname] = useState("");
  const [Bemail, setBemail] = useState("")
  const [Bphone, setBphone] = useState("")
  const [Baddress, setBaddress] = useState("")
  const [visitors, setVisitors] = useState([]);

  const { businessId } = route.params;

  const populateForm = async (businessId) => {
    const businessInfo = await getBusinessWithVisits(businessId);
    console.log("business information", businessInfo);
    const {name, address, email, phone, visitors } = businessInfo;
    setBname(name);
    setBaddress(address);
    setBemail(email);
    setBphone(phone);
    console.log("who are the visitors", visitors);
    setVisitors(visitors);
  }

  useEffect(()=> {
    populateForm(businessId);
  }, [])

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
          onChangeText={(txt) => setBname(txt)}
          placeholderTextColor="#F194FF"
        />
        <TextInput
          placeholder="Phone Number"
          onChangeText={(txt) => setBphone(txt)}
          placeholderTextColor="#F194FF"
        />
        <TextInput
          placeholder="Email"
          onChangeText={(txt) => setBemail(txt)}
          placeholderTextColor="#F194FF"
        />
        <TextInput
          placeholder="Address"
          onChangeText={(txt) => setBaddress(txt)}
          placeholderTextColor="#F194FF"
        />
        <Button title="Update Profile" />
    </View>
  );
};

export default BusinessProfile;


const getBusinessWithVisits = async (businessId) => {
  try{
    const { data } = await API.graphql({ query: queries.getBusiness, variables: { id: businessId }});
    const businessInfo = data.getBusiness;
    return businessInfo;
  } catch (error) {
    console.log("failed to fetch business information", error);
  }
}
