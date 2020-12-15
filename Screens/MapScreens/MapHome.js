import React, { useState, useEffect } from "react";
import {
  View,
  Alert,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet
} from "react-native";
import {
  Button,
  Card,
  Title,
  Paragraph
} from 'react-native-paper';


const MapHome = ({navigation}) => {
  const [heatMap, setHeatMap] = useState(false)
  const [busMap, setBusMap] = useState(false)
  useEffect(() => {
    if (heatMap) {
      navigation.navigate('HeatMap')
      setHeatMap(!heatMap)
    }
    if (busMap) {
      navigation.navigate('BusMap')
      setBusMap(!busMap)
    }
  })

  //Make cards further into components later on
  return (
    <View style={styles.view}>
        <Card style={styles.card}>
          <Card.Content>
            <Title>Heat Map</Title>
            <Paragraph>Press here to interact with a heat map on COVID-19 cases in your area, and around the world</Paragraph>
          </Card.Content>
          <Card.Cover source={{uri: 'https://i.stack.imgur.com/Gc1wv.png'}} />
          <Card.Actions>
            <Button onPress={()=>setHeatMap(!heatMap)}>GO</Button>
          </Card.Actions>
        </Card>
        <Card tyle={styles.card}>
        <Card.Content>
          <Title>Business Map</Title>
          <Paragraph>Press here to view businesses in our ecosystem, and statistics of their virus incidences</Paragraph>
        </Card.Content>
        <Card.Cover style={styles.image} source={{uri: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/1800x1200_virus_3d_render_red_03_other.jpg?resize=*:350px'}} />
        <Card.Actions>
          <Button onPress={()=>setBusMap(!busMap)}> GO </Button>
        </Card.Actions>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: "#DBEFFB",
    height: 800,
  },
  card: {
    height: 300,
    margin: 10,
    padding: 2,
  }
})

export default MapHome;
