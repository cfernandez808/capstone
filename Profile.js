import React, { useState, useEffect } from 'react'
import { Button, View, TextInput, Image } from 'react-native';
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { createBusiness, createVisit, createCustomer, updateCustomer } from './graphql/mutations'
import * as queries from './graphql/queries'
import config from './aws-exports'
Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});
import './localSecrets'
console.log(process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_ACCCESS_KEY)

const AWS = require('aws-sdk')
const awsRegion = config["aws_cognito_region"]
const awsBucket = config["aws_user_files_s3_bucket"]

const myConfig = new AWS.Config({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCCESS_KEY,
  region: awsRegion
});

const rekognition = new AWS.Rekognition(myConfig);

const Profile = ({ route }) => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [symptom, setSymptom] = useState('');

  const { image, title, matches, data } = route.params;

  // useEffect(() => {
  //   const { data, matches } = route.params;
  //   if (match) {
  //     const { id, firstName, lastName, phone } = data;
  //     setPhone(phone);
  //     setId(id);
  //     setFirstName(firstName);
  //     setLastName(lastName)
  //   }
  // }, [])

  async function handleSubmit (matches) {
    if (!matches.length) {
      await createCollection();
      await indexFace();
      const customerID = await createNewCustomer();
      await createNewVisit(customerID);
      await getCustomerWithVisits(customerID);
    }
  }

  const createCollection = () => {

    // create a collection
    const collectionId = lastName + phone.slice(-4);
    console.log(collectionId);
    const paramsCollection = {
      CollectionId: collectionId
    }
    rekognition.createCollection(paramsCollection, (err, data) => {
      if (err) console.log(err, err.stack);
      else console.log(data);
    })

    //list all the collections
    rekognition.listCollections({}, (err, data) => {
      if (err) console.log(err, err.stack);
      else {
        console.log(data);
      }
    })

    //delete a collection
    // rekognition.deleteCollection(paramsCollection, (err, data) => {
    //   if (err) console.log(err, err.stack);
    //   else console.log(data);
    // })
  }

  const indexFace = () => {
    //index the face
    const path = 'public/' + title;
    const collectionId = lastName + phone.slice(-4);
    const paramsIndexFace = {
      CollectionId: collectionId,
      DetectionAttributes: ["ALL"],
      Image: {
        S3Object: {
          Bucket: awsBucket,
          Name: path
        }
      },
    }

    rekognition.indexFaces(paramsIndexFace, (err, data) => {
      if (err) console.log(err, err.stack);
      else console.log(data);
    })

    //describe a particular collection's info
    rekognition.describeCollection({ CollectionId: collectionId }, (err, data) => {
      if (err) console.log(err, err.stack);
      else console.log(data);
    })

  }

  // create a new customer
  const createNewCustomer = async() => {
    const collectionId = firstName + lastName + phone.slice(-4);
    const inputData = {
      firstName,
      lastName,
      phone,
      email,
      collectionId
    }
    const data = await API.graphql(graphqlOperation(createCustomer, {input: inputData}))
    console.log(data);
    const customerID = data.createCustomer.id;
    console.log(customerID);
    return customerID;
  }

  // create a new visit
  const createNewVisit = async(customerID) => {
    const inputData = {
      hasSymptom: symptom,
      // we need to have businessID available after the business signs in
      businessID: "B1",
      customerID,
    }
    return await API.graphql(graphqlOperation(createVisit, {input: inputData}))
  }

  // get customer visits
  const getCustomerWithVisits = async (customerID) => {
    const customerVisits = await API.graphql({ query: queries.getCustomer, variables: { id: customerID }})
    console.log("Customer info", customerVisits);
    console.log("the record of visits by this customer", customerVisits.data.getCustomer.businesses);
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
        placeholder="phone"
        onChangeText={txt => setPhone(txt)}
        placeholderTextColor="#f194ff"
      />
      <TextInput
        placeholder="firstName"
        onChangeText={txt => setFirstName(txt)}
        placeholderTextColor="#f194ff"
      />
       <TextInput
        placeholder="lastName"
        onChangeText={txt => setLastName(txt)}
        placeholderTextColor="#f194ff"
      />
      <TextInput
        placeholder="no symptom"
        onChangeText={txt => setSymptom(txt)}
        placeholderTextColor="#f194ff"
      />
      <Button
        onPress={() => handleSubmit(matches)}
        title= { matches.length ? "Update Profile" : "Create Profile" }
        color="#f194ff"
      />
    </View>
  )
}

export default Profile;


// seed business data
// const seed = async () => {

  // const createNewBusiness = async() => {
  //   const businesses = [
  //     { id: "B1", name: "Business 1", address: "Philadelphia", phone: "888-888-8888" },
  //     { id: "B2", name: "Business 2", address: "Chicago", phone: "666-666-6666"},
  //   ];

  //   businesses.map( async (business) => {
  //     return await API.graphql(graphqlOperation(createBusiness, {input: business}))
  //   })
  // }
  // createNewBusiness();
// }

// check all the visits of a business (for heatmap)
  // const getBusinessesWithVisits = async () => {
  //   const businessVisits = await API.graphql({ query: queries.getBusiness, variables: { id: "B1" }})
  //   console.log("the record of visits at B1", businessVisits.data.getBusiness.visitors)
  // }
