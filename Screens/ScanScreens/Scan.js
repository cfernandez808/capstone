import React, { useState, useEffect } from "react";
import { View, Alert, Text, TouchableOpacity, Image } from "react-native";
import ImagePicker from "react-native-image-picker";

import Amplify from "aws-amplify";
import config from "../../aws-exports";
Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

const Scan = ({ navigation }) => {
  const [image, setImage] = useState(null);
  // data from DynamoDB when there is a match
  const [data, setData] = useState(null);
  const [matches, setMatches] = useState(null);

  useEffect(() => {
    if (image && matches !== null) {
      const title = image.split("/").slice(-1).toString();
      // depending on the match result, may need to pass different parameters
      navigation.navigate("Customer Profile", { image, title, matches, data });
    }
  }, [image, matches]);

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
      // console.log({ response });

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
        // generate a title based on image picker's automatically created image name
        const title = uri.split("/").slice(-1).toString();
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
          `http://10.0.0.27:8080/api/upload/${title}`,
          // `http://localhost:8080/api/upload/`,
          options
        );
        const data = await fetchResult.json();
        setMatches(data);
        console.log(data);
        setImage(response.uri);
      }
    });
  }

  // keep the image and match parts for testing
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity onPress={selectImage}>
        <Text>Scan</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Scan;
