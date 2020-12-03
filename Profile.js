import React, { useState } from 'react'
import { Button, View, TextInput } from 'react-native';
import Amplify, {API} from 'aws-amplify'
import config from './aws-exports'
Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

const Profile = ({ route }) => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [id, setId] = useState('');

  console.log("what is passed down?", route.params.image)

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

  return (
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
  )
}

export default Profile;
