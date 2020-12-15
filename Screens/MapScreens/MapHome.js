import React, { useState, useEffect } from "react";
import {
  View
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
      navigation.navigate('Ecosystem Business Map')
      setBusMap(!busMap)
    }
  })

  /* CLUSTER MAP CARD AND BUSINESS MAP CARD */
  return (
<<<<<<< Updated upstream
    <View style={{backgroundColor: '#6200ee'}}>
        <Card style={{height: '50%'}}>
=======
    <View>
        <Card
          style={{height: '50%'}}
          onPress={()=>setHeatMap(!heatMap)}
        >
>>>>>>> Stashed changes
          <Card.Content>
            <Title>Cluster Map</Title>
            <Paragraph>Press here to interact with a cluster map on COVID-19 cases in your area, and around the world</Paragraph>
          </Card.Content>
          <Card.Cover source={{uri: 'https://www.acuriousanimal.com/static/05d6214c7f51538730dbe512db60b27c/ed75b/Screenshot-from-2012-08-11-202356.png'}} />
          <Card.Actions>
            <Button onPress={()=>setHeatMap(!heatMap)}>GO</Button>
          </Card.Actions>
        </Card>
<<<<<<< Updated upstream
        <Card style={{height: '50%'}}>
=======
        <Card
          style={{height: '50%'}}
          onPress={()=>setBusMap(!busMap)}
        >
>>>>>>> Stashed changes
        <Card.Content>
          <Title>Ecosystem's Businesses</Title>
          <Paragraph>Press here to view businesses in our ecosystem, and statistics of their virus incidences</Paragraph>
        </Card.Content>
        <Card.Cover source={{uri: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/1800x1200_virus_3d_render_red_03_other.jpg?resize=*:350px'}} />
        <Card.Actions>
          <Button onPress={()=>setBusMap(!busMap)}> GO </Button>
        </Card.Actions>
      </Card>
    </View>
  )
}

export default MapHome;
