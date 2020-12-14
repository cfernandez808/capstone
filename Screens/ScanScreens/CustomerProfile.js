import React, { useState, useEffect } from "react";
import { Button, View, TextInput, Image } from "react-native";
import { API, graphqlOperation } from "aws-amplify";
import { createVisit, createCustomer, updateCustomer } from '../../graphql/mutations'
import * as queries from '../../graphql/queries'
import config from "../../aws-exports";

import "../../secrets";

const AWS = require("aws-sdk");
const awsRegion = config["aws_cognito_region"];
const awsBucket = config["aws_user_files_s3_bucket"];

const myConfig = new AWS.Config({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCCESS_KEY,
  region: awsRegion,
});

const rekognition = new AWS.Rekognition(myConfig);

const CustomerProfile = ({ route }) => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [symptom, setSymptom] = useState('');
  const [imageId, setImageId] = useState('');

  const { image, title, matches, data, businessId } = route.params;

  useEffect(() => {
    if(!matches.length) indexFace();
    // else fetchUsers();
  }, []);

  async function handleSubmit(matches) {
    if (!matches.length) {
      const customerID = await createNewCustomer();
      await createNewVisit(customerID);
      await getCustomerWithVisits(customerID);
      // navigation.navigate("Scan");
    }
    // await addUser("test");
  }

  //index a new face to collection
  const indexFace = () => {
    const paramsIndexFace = {
      CollectionId: "irelia-faces",
      DetectionAttributes: ["ALL"],
      Image: {
        S3Object: {
          Bucket: awsBucket,
          Name: title,
        },
      },
    };
    rekognition.indexFaces(paramsIndexFace, (err, data) => {
      if (err) console.log(err, err.stack);
      else {
        console.log("successfully indexed a new face", data);
        setImageId(data["FaceRecords"][0]["Face"]["ImageId"]);
      }
    });
  }

  // create a new customer
  const createNewCustomer = async() => {
    const inputData = {
      firstName,
      lastName,
      phone,
      email,
      imageId,
    }
    const data = await API.graphql(graphqlOperation(createCustomer, {input: inputData}))
    console.log("successfully created a new customer", data);
    const customerID = data.data.createCustomer.id;
    console.log(customerID);
    return customerID;
  }

  // create a new visit
  const createNewVisit = async(customerID) => {
    const inputData = {
      hasSymptom: symptom,
      // we need to have businessID available after the business signs in
      businessID: businessId,
      customerID,
    }
    return await API.graphql(graphqlOperation(createVisit, {input: inputData}))
  }

  // get customer visits
  const getCustomerWithVisits = async (customerID) => {
    const customerVisits = await API.graphql({ query: queries.getCustomer, variables: { id: customerID }})
    console.log("Customer info", customerVisits);
    console.log("the record of visits by this customer", customerVisits.data.getCustomer.visits);
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* if there is a match display the existing photo
      if not, display the new photo */}
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <TextInput
        placeholder="email"
        onChangeText={txt => setEmail(txt)}
        placeholderTextColor="#f194ff"
      />
      <TextInput
        value={phone}
        placeholder="phone"
        onChangeText={(txt) => setPhone(txt)}
        placeholderTextColor="#f194ff"
      />
      <TextInput
        value={firstName}
        placeholder="firstName"
        onChangeText={(txt) => setFirstName(txt)}
        placeholderTextColor="#f194ff"
      />
      <TextInput
        value={lastName}
        placeholder="lastName"
        onChangeText={(txt) => setLastName(txt)}
        placeholderTextColor="#f194ff"
      />
      <TextInput
        placeholder="no/yes"
        onChangeText={txt => setSymptom(txt)}
        placeholderTextColor="#f194ff"
      />
      <Button
        onPress={() => handleSubmit(matches)}
        title= { matches.length ? "Update Profile" : "Create Profile" }
        color="#f194ff"
      />
    </View>
  );
};

export default CustomerProfile;


