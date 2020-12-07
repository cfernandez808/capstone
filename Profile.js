import React, { useState, useEffect } from "react";
import { Button, View, TextInput, Image } from "react-native";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { createUser } from "./graphql/mutations";
import { listUsers } from "./graphql/queries";
import config from "./aws-exports";
Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});
import "./localSecrets";
console.log(process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_ACCCESS_KEY);

const AWS = require("aws-sdk");
const awsRegion = config["aws_cognito_region"];
const awsBucket = config["aws_user_files_s3_bucket"];

const myConfig = new AWS.Config({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCCESS_KEY,
  region: awsRegion,
});

const rekognition = new AWS.Rekognition(myConfig);

const Profile = ({ route }) => {
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [id, setId] = useState("");

  // const [symptom, setSymptom] = useState('');
  const { image, title, matches, data } = route.params;

  useEffect(() => {
    // const { data, match } = route.params;
    // if (match) {
    //   const { id, firstName, lastName, phone } = data;
    //   setPhone(phone);
    //   setId(id);
    //   setFirstName(firstName);
    //   setLastName(lastName);
    // }
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const usersData = await API.graphql(graphqlOperation(listUsers));
      const users = usersData.data.listUsers.items;
      const imageId = matches[0].Face.ImageId;
      const matchedUser = users.find((user) => user.ImageId === imageId);
      setFirstName(matchedUser.firstName);
      setLastName(matchedUser.lastName);
      setId(matchedUser.id);
      setPhone(matchedUser.phone);
      console.log(users);
      console.log(matches);
      console.log(imageId);
      console.log(matchedUser);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSubmit(matches) {
    if (!matches.length) {
      await createCollection();
      await indexFace();
      await createContact();
    }
    await addUser("test");
  }

  const createCollection = () => {
    // create a collection
    const collectionId = lastName + phone.slice(-4);
    console.log(collectionId);
    const paramsCollection = {
      CollectionId: collectionId,
    };
    rekognition.createCollection(paramsCollection, (err, data) => {
      if (err) console.log(err, err.stack);
      else console.log(data);
    });

    //list all the collections
    rekognition.listCollections({}, (err, data) => {
      if (err) console.log(err, err.stack);
      else {
        console.log(data);
      }
    });

    //delete a collection
    // rekognition.deleteCollection(paramsCollection, (err, data) => {
    //   if (err) console.log(err, err.stack);
    //   else console.log(data);
    // })
  };

  const indexFace = () => {
    //index the face
    const path = "public/" + title;
    const collectionId = lastName + phone.slice(-4);
    const paramsIndexFace = {
      CollectionId: collectionId,
      DetectionAttributes: ["ALL"],
      Image: {
        S3Object: {
          Bucket: awsBucket,
          Name: path,
        },
      },
    };

    rekognition.indexFaces(paramsIndexFace, (err, data) => {
      if (err) console.log(err, err.stack);
      else console.log(data);
    });

    //describe a particular collection's info
    rekognition.describeCollection(
      { CollectionId: collectionId },
      (err, data) => {
        if (err) console.log(err, err.stack);
        else console.log(data);
      }
    );
  };

  async function addUser(ImageId) {
    await API.graphql(
      graphqlOperation(createUser, {
        input: {
          ImageId,
          firstName,
          lastName,
          phone,
        },
      })
    );
  }

  async function createContact() {
    const collectionId = lastName + phone.slice(-4);
    const data = {
      body: {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        id: id,
        collectionId: collectionId,
      },
    };
    console.log(data);
    const apiData = await API.post("formapi", "/contact", data);
    console.log({ apiData });
  }

  // function updateFormState(key, value) {
  //   if(key === 'phone') {
  //     setPhone(value)
  //   }
  //   if(key === 'name') {
  //     setName(value)
  //   }
  // }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* if there is a match display the existing photo
      if not, display the new photo */}
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <TextInput
        value={id}
        placeholder="id"
        onChangeText={(txt) => setId(txt)}
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
      <Button
        onPress={() => handleSubmit(matches)}
        title={matches ? "Update Profile" : "Create Profile"}
        color="#f194ff"
      />
    </View>
  );
};

export default Profile;
