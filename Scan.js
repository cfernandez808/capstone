import React, { useState } from 'react';
import { Button, View, Alert, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';

import Amplify, {API} from 'aws-amplify'
import config from './aws-exports'
Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});
import { withAuthenticator } from 'aws-amplify-react-native'

const Scan = () => {
  const [image, setImage] = useState(null);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [id, setId] = useState('');

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
  async function createContact() {
    const data = {
      body: {
        name: name,
        phone: phone,
        id: id
      }
    };
    const apiData = await API.post('formapi', '/contact', data);
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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity
        onPress={selectImage}
      >
        <Text>Pick an image</Text>
      </TouchableOpacity>
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <View>
        <TextInput
          placeholder="id"
          onChangeText={txt => setId(txt)}
          placeholderTextColor="#f194ff"
        />
        <TextInput
          placeholder="phone"
          onChangeText={txt => setPhone(txt)}
          placeholderTextColor="#f194ff"
        />
        <TextInput
          placeholder="name"
          onChangeText={txt => setName(txt)}
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
}


export default withAuthenticator(Scan);
