import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScanStack from './Screens/ScanScreens/ScanStack'
import MapStack from './Screens/MapScreens/MapStack'
import BusinessProfileStack from './Screens/BusinessScreens/BusinessProfileStack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Amplify, { Auth, API, graphqlOperation } from "aws-amplify";
import config from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";
import { createBusiness } from './graphql/mutations'
import * as queries from './graphql/queries'
import Geocoder from 'react-native-geocoding'
import './secrets'

Geocoder.init(process.env.GOOGLE_MAPS_API_KEY);
const Tab = createBottomTabNavigator();

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

const signUpConfig = {
  header: 'Business Owner Sign Up',
  hideAllDefaults: true,
  defaultCountryCode: '1',
  signUpFields: [
    {
      label: 'Business Name',
      key: 'name',
      required: true,
      displayOrder: 1,
      type: 'string'
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      displayOrder: 5,
      type: 'password'
    },
    {
      label: 'Phone Number',
      key: 'phone_number',
      required: true,
      displayOrder: 3,
      type: 'string'
    },
    {
      label: 'Email',
      key: 'email',
      required: true,
      displayOrder: 4,
      type: 'string'
    },
    {
      label: 'Address',
      key: 'address',
      required: true,
      displayOrder: 2,
      type: 'string'
    }
  ]
}

const App = () => {
  const [businessId, setBusinessId] = useState("")

  const syncDataBase = async () => {
    try {
      const { address, email, phone_number, name } = await fetchCurrentAuthUser();
      const [matchedBusiness] = await checkBusiness(email);
      if (!matchedBusiness) {
        const {formattedAddress, lat, lng} = await getCoordinates(address);
        const { data } = await createNewBusiness({ email, phone: phone_number, name, address: formattedAddress, lat, lng })
        const createdBusiness = data.createBusiness;
        console.log("created business", createdBusiness);
        setBusinessId(createdBusiness.id)

      } else {
        console.log("matchedBusiness", matchedBusiness);
        setBusinessId(matchedBusiness.id)
      }
    } catch (error) {
      console.log("failed to sync Business mode in database", error)
    }
  }

  useEffect(() => {
    syncDataBase();
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Scan"
          screenOptions={({ route }) => ({
            // eslint-disable-next-line react/display-name
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Scan') {
                iconName = 'account-search';
              } else if (route.name === 'MapHub') {
                iconName = 'google-maps';
              } else if (route.name === 'Profile') {
                iconName = 'book';
              }

              // You can return any component that you like here!
              return <Icon name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: '#9D9589',
          }}
        >
          <Tab.Screen name="Scan" children={() => <ScanStack businessId={businessId}/>} />
          <Tab.Screen name="MapHub" component={MapStack} />
          <Tab.Screen name="Profile" children={() => <BusinessProfileStack businessId={businessId}/>}/>
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default withAuthenticator(App, {
  includeGreetings: true,
  signUpConfig,
  usernameAttributes: 'email'
});



//helper functions

//fetch current authenticated user
const fetchCurrentAuthUser = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    console.log("currentAuthenticatedUser", user.attributes);
    return user.attributes;
  } catch (error) {
    console.log('failed to retrieve authenticated user', error)
  }
}

//check if this user (business owner) exists in dynamoDB
const checkBusiness = async (email) => {
  try {
    const { data } = await API.graphql({ query: queries.listBusinesss })
    const allBusinesses = data.listBusinesss.items;
    console.log("all businesses", allBusinesses);
    const match = allBusinesses.filter(business => {
      return (business.email === email)
    })
    return match;
  } catch (error) {
    console.log('failed to list all businesses', error);
  }
}

// formate address and convert address into coordinates
const getCoordinates = async (address) => {
  try {
    const data = await Geocoder.from(address);
    const formattedAddress = data.results[0].formatted_address;
    const { lat, lng } = data.results[0].geometry.location;
    return {formattedAddress, lat, lng};
  } catch (error) {
    console.log('failed to convert address to coordinates', error);
  }
}

// if user (business owner) does not exist, to create a new business in dynamoDB
const createNewBusiness = async(business) => {
  try {
    return await API.graphql(graphqlOperation(createBusiness, {input: business}))
  } catch (error) {
    console.log('failed to create a new business', error)
  }
}
