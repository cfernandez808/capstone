import React, { useState, useEffect } from 'react';
import { View, Alert, Text, TouchableOpacity, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';

console.log("what is this", ImagePicker)

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
        let source = { uri: response.uri };
        setImage(response.uri)
      }
    });
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>
        Simple Image Picker
      </Text>
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


export default App;
