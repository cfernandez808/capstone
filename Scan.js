import React, { useState, useEffect } from 'react';
import { View, Alert, Text, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';

import Amplify, { Storage } from 'aws-amplify'
import config from './aws-exports'
Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});
import { withAuthenticator } from 'aws-amplify-react-native'

const Scan = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [match, setMatch] = useState(null);
  const [data, setData] = useState(null);

  useEffect(()=> {
      if(image && match !== null) {
        const title = image.split('/').slice(-1).toString();
        uploadToStorage(image, title);
        // depending on the match result, may need to pass different parameters
        navigation.navigate('Profile', { image, title, match, data })
      }
    }, [image, match])

  // upload the image to S3 for either create a collection or to search the image in collections
  async function uploadToStorage (pathToImageFile, title) {
    try {
      const response = await fetch(pathToImageFile);
      const blob = await response.blob();
      Storage.put(title, blob, {
        contentType: 'image/jpeg',
      });
    } catch (err) {
      console.log(err);
    }
  };

  //searchFacesbyImage method

  //if match a get data call should be made here

  function selectImage () {
    let options = {
      title: 'You can choose one image',
      maxWidth: 256,
      maxHeight: 256,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
        Alert.alert('You did not select any image');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setImage(response.uri)
        // temporarily setMatch to be false to trigger create a profile
        setMatch(false)
      }
    });
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity
        onPress={selectImage}
      >
        <Text>Scan</Text>
      </TouchableOpacity>
    </View>
  );
}


export default withAuthenticator(Scan);
