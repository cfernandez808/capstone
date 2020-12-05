import React, { useState } from "react";
import {
  Button,
  View,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import ImagePicker from "react-native-image-picker";

import Amplify, { API } from "aws-amplify";
import config from "./aws-exports";
Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});
import { withAuthenticator } from "aws-amplify-react-native";

const Scan = () => {
  const [image, setImage] = useState(null);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [matches, setMatches] = useState(null);

  function selectImage() {
    let options = {
      title: "You can choose one image",
      maxWidth: 256,
      maxHeight: 256,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, async (response) => {
      console.log({ response });

      if (response.didCancel) {
        console.log("User cancelled photo picker");
        Alert.alert("You did not select any image");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const uri = response.uri;
        const uriParts = uri.split(".");
        let fileType = uriParts[uriParts.length - 1];
        let formData = new FormData();
        formData.append("photo", {
          uri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });

        let options = {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        };

        const fetchResult = await fetch(
          `http://10.0.0.27:8080/api/upload/${name}`,
          // `http://localhost:8080/api/upload/${name}`,
          options
        );
        const data = await fetchResult.json();
        setMatches(data);
        console.log(data);
        setImage(response.uri);
      }
    });
  }
  async function createContact() {
    const data = {
      body: {
        name: name,
        phone: phone,
        id: id,
      },
    };
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
      <TouchableOpacity onPress={selectImage}>
        <Text>Pick an image</Text>
      </TouchableOpacity>
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      {matches && (
        <Text>
          {matches.length} Matches, First Match:{" "}
          {matches.length && matches[0].Face.ImageId}
        </Text>
      )}
      <View>
        <TextInput
          placeholder="id"
          onChangeText={(txt) => setId(txt)}
          placeholderTextColor="#f194ff"
        />
        <TextInput
          placeholder="phone"
          onChangeText={(txt) => setPhone(txt)}
          placeholderTextColor="#f194ff"
        />
        <TextInput
          placeholder="name"
          onChangeText={(txt) => setName(txt)}
          placeholderTextColor="#f194ff"
        />
        <Button
          onPress={createContact}
          title="Create New Contact"
          color="#f194ff"
        />
      </View>
    </View>
  );
};
export default withAuthenticator(Scan);
