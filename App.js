import React, { useState } from 'react';
import { View, Alert, Text, TouchableOpacity, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';

import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});
import { withAuthenticator } from 'aws-amplify-react-native'

const App = () => {
  const [image, setImage] = useState(null);

  function selectImage() {
    let options = {
      title: 'You can choose one image',
      maxWidth: 256,
      maxHeight: 256,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, response => {
      console.log({ response });

      if (response.didCancel) {
        console.log('User cancelled photo picker');
        Alert.alert('You did not select any image');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setImage(response.uri)
      }
    });
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity
        onPress={selectImage}
      >
        <Text>Pick an image</Text>
      </TouchableOpacity>
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
}


export default withAuthenticator(App);
