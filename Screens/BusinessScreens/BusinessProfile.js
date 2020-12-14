import React, { useState, useEffect } from "react";
import { Button, View, TextInput, Text } from "react-native"
import { API, graphqlOperation } from "aws-amplify";
import * as queries from '../../graphql/queries'
import { updateBusiness } from '../../graphql/mutations'
import Geocoder from 'react-native-geocoding'

const BusinessProfile = ({ navigation, route }) => {
  const [Bname, setBname] = useState("");
  const [Bemail, setBemail] = useState("")
  const [Bphone, setBphone] = useState("")
  const [Baddress, setBaddress] = useState("")
  const [visits, setVisits] = useState([]);

  const { businessId } = route.params;

  useEffect(()=> {
    loadProfileForm(businessId);
  })

  const loadProfileForm = async (businessId) => {
    console.log(businessId);
    const {name, address, email, phone, visits } = await getBusinessWithVisits(businessId);
    setBname(name);
    setBaddress(address);
    setBemail(email);
    setBphone(phone)
    setVisits(visits.items);
  }

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
      }
      const updatedBusiness = await API.graphql(graphqlOperation(updateBusiness, { input: updateData }))
      console.log("successfully updated business profile", updatedBusiness)
    } catch (error) {
      console.log('failed to update business profile', error)
    }
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
        <Text>{`${visits.length} total visits and ${visits.filter(visit => visit.hasSymptom.toLowerCase().includes('yes')).length} COVID case(s)`}</Text>
        <TextInput
          mode= "outlined"
          label="Business Name"
          value={Bname}
          onChangeText={(txt) => setBname(txt)}
          placeholderTextColor="#F194FF"
        />
        <TextInput
          mode= "outlined"
          label="Address"
          value={Baddress}
          onChangeText={(txt) => setBaddress(txt)}
          placeholderTextColor="#F194FF"
        />
        <TextInput
          mode= "outlined"
          label="Phone Number"
          value={Bphone}
          onChangeText={(txt) => setBphone(txt)}
          placeholderTextColor="#F194FF"
        />
        <TextInput
          mode= "outlined"
          editable = {false}
          label="Email"
          value={Bemail}
          onChangeText={(txt) => setBemail(txt)}
          placeholderTextColor="#F194FF"
        />
        <Button title="Update Profile" onPress={handleSubmit}/>
        <Button title="View Visits" onPress={() => {
          navigation.navigate("Visits", { visits })
        }}/>
    </View>
  );
};

export default BusinessProfile;

//helper functions

// get business with all its visits
const getBusinessWithVisits = async (businessId) => {
  try{
    const { data } = await API.graphql({ query: queries.getBusiness, variables: { id: businessId }});
    const businessInfo = data.getBusiness;
    return businessInfo;
  } catch (error) {
    console.log("failed to fetch business information", error);
  }
}

// formate address and convert address into coordinates
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
