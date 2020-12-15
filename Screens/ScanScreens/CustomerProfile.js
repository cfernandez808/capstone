import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { TextInput, Banner, Title, Button } from "react-native-paper";
import { API, graphqlOperation } from "aws-amplify";
import {
  createVisit,
  createCustomer,
  updateCustomer,
} from "../../graphql/mutations";
import * as queries from "../../graphql/queries";
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

const CustomerProfile = ({ navigation, route }) => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [symptom, setSymptom] = useState("");
  const [imageId, setImageId] = useState("");
  const [id, setId] = useState("");
  const [hasSymptom, setHasSymptom] = useState(false);

  const { image, title, matches, data, businessId } = route.params;

  useEffect(() => {
    if (!matches.length) indexFace();
    else {
      console.log(matches, data);
      fetchCustomers();
    }
  }, []);

  async function fetchCustomers() {
    try {
      const customersData = await API.graphql(
        graphqlOperation(queries.listCustomers)
      );
      const customers = customersData.data.listCustomers.items;
      const imageId = matches[0].Face.ImageId;
      const matchedCustomer = customers.find(
        (customer) => customer.imageId === imageId
      );
      const symptom = matchedCustomer.firstName.includes(":S");
      let firstName;
      if (symptom) {
        firstName = matchedCustomer.firstName.slice(0, -2);
      } else {
        firstName = matchedCustomer.firstName;
      }
      setFirstName(firstName);
      setLastName(matchedCustomer.lastName);
      setImageId(matchedCustomer.imageId);
      setId(matchedCustomer.id);
      setPhone(matchedCustomer.phone);
      setEmail(matchedCustomer.email);
      setHasSymptom(symptom);
      setSymptom(symptom ? "YES!" : "NO!");
      // console.log(customers);
      if (symptom) {
        alert("Danger! Do not enter!");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSubmit(evt) {
    if (!matches.length) {
      const customerID = await createNewCustomer();
      await createNewVisit(customerID);
      await getCustomerWithVisits(customerID);
    } else {
      await updateSameCustomer();
    }
    navigation.navigate("Scan");
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
  };

  //update Customer
  const updateSameCustomer = async () => {
    try {
      let hasSymptomTemp = false;
      if (symptom.toLowerCase().includes("y")) {
        setHasSymptom(true);
        hasSymptomTemp = true;
      } else {
        setHasSymptom(false);
        hasSymptomTemp = false;
      }
      console.log(hasSymptom);
      console.log(hasSymptomTemp);
      console.log(symptom);
      const inputData = {
        id,
        firstName: firstName + (hasSymptomTemp ? ":S" : ""),
        lastName,
        phone,
        email,
        imageId,
      };
      console.log("DATA", inputData);
      const data = await API.graphql(
        graphqlOperation(updateCustomer, { input: inputData })
      );
      console.log(data);
      if (hasSymptomTemp) {
        alert("Danger! Do not enter!");
      }
      await createNewVisit(id);
    } catch (err) {
      console.error(err);
    }
  };

  // create a new customer
  const createNewCustomer = async () => {
    const inputData = {
      firstName,
      lastName,
      phone,
      email,
      imageId,
    };
    const data = await API.graphql(
      graphqlOperation(createCustomer, { input: inputData })
    );
    console.log("successfully created a new customer", data);
    const customerID = data.data.createCustomer.id;
    customerID;
    return customerID;
  };

  // create a new visit
  const createNewVisit = async (customerID) => {
    const inputData = {
      hasSymptom: symptom,
      // we need to have businessID available after the business signs in
      businessID: businessId,
      customerID,
    };
    return await API.graphql(
      graphqlOperation(createVisit, { input: inputData })
    );
  };

  // get customer visits
  const getCustomerWithVisits = async (customerID) => {
    const customerVisits = await API.graphql({
      query: queries.getCustomer,
      variables: { id: customerID },
    });
    console.log("Customer info", customerVisits);
    console.log(
      "the record of visits by this customer",
      customerVisits.data.getCustomer.visits
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#5F9EA0",
      }}
    >
      {/* if there is a match display the existing photo
      if not, display the new photo */}
      {image && (
        <Image
          source={{ uri: image }}
          style={{
            width: 200,
            height: 200,
          }}
        />
      )}
      <TextInput
        style={styles.input}
        value={email}
        mode="outlined"
        placeholder="email"
        onChangeText={(txt) => setEmail(txt)}
        placeholderTextColor="red"
      />
      <TextInput
        mode="outlined"
        style={styles.input}
        value={phone}
        placeholder="phone"
        onChangeText={(txt) => setPhone(txt)}
        placeholderTextColor="red"
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        value={firstName}
        placeholder="firstName"
        onChangeText={(txt) => setFirstName(txt)}
        placeholderTextColor="red"
      />
      <TextInput
        mode="outlined"
        style={styles.input}
        value={lastName}
        placeholder="lastName"
        onChangeText={(txt) => setLastName(txt)}
        placeholderTextColor="red"
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        value={symptom}
        placeholder="no/yes"
        onChangeText={(txt) => setSymptom(txt)}
        placeholderTextColor="red"
      />

      <Button
        mode="contained"
        style={styles.button}
        onPress={handleSubmit}
        color="white"
      >
        {matches.length ? "Update Profile" : "Create Profile"}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
    marginLeft: 3,
    marginRight: 2,
    fontWeight: "bold",
    fontSize: 18,
    justifyContent: "center",
    backgroundColor: "#e2e2ff",
    height: 30,
  },

  button: {
    backgroundColor: "#e2ffff",
    color: "red",
    margin: 10,
    height: 50,
    backgroundColor: "#6495ED",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default CustomerProfile;
