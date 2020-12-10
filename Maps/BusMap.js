import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
import {
  IconButton,
  Portal,
  Dialog,
  Button,
  Paragraph
} from "react-native-paper";
import DiaPortalEco from "./DiaPortalEco";
import DiaPortalFsq from "./DiaPortalFsq";
import Foursquare from "@foursquare/foursquare-places";
import "../secrets";
const FSQ_KEY = process.env.FOURSQ_ID
const FSQ_SECRET = process.env.FOURSQ_SECRET
MapboxGL.setAccessToken(process.env.MB_PUB_ACCESS_KEY);
const foursquare = new Foursquare(FSQ_KEY, FSQ_SECRET);
const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: "tomato"
  },
  map: {
    flex: 1
  },
});
export default class BusMap extends Component {
  constructor(props){
    super(props)
    this.state = {
      businesses: [
        {
          id: "0",
          name: "Fullstack Academy",
          coordinates: [-74.009499, 40.704498],
          cases: 0,
          visible: false
        },
        {
          id: "1",
          name: "HackReactor Academy",
          coordinates: [-74.007320, 40.710860],
          cases: 9001,
          visible: false
        }
      ],
      params: {
        ll: '40.704498, -74.009499',
        query: 'code academy',
        limit: 10
      },
      fsq: []
    }
    this.handleVis = this.handleVis.bind(this)
  }
  componentDidMount() {
    MapboxGL.setTelemetryEnabled(true);
    //state empty upon load
    //conditional rendering during loading... put text 'still loading'...
    //paper loading wheel :D.... this happens in the render
    foursquare.venues.getVenues(this.state.params).then(res => {
      this.setState(prevState => {
        let copy = {...prevState}
        copy.fsq = [...res.response.venues]
        copy.fsq.forEach(bus => {
          bus.visible = false
        })
        console.log(copy)
        return copy
      });
    });
  }
  componentDidUpdate () {
    this.setState()
  }
  handleVis(bus) {
    this.setState(prevState => {
      let copy = {...prevState}
      copy.businesses.forEach( (business, idx) => {
        if (idx == bus.id) {
          business.visible = !business.visible
        }
      })
      copy.fsq.forEach( (business, idx) => {
        if(bus.id === business.id) {
          business.visible = !business.visible
        }
      })
      console.log(bus)
      return copy
    })
  }
  render() {
    const fsqArr = this.state.fsq
    return (
      // <View>
      // {this.state.fsq[0] ? <Text>{this.state.fsq[0].name}</Text> : <Text>Oop</Text>}
      //   <Text>Items:</Text>
      // </View>
      <Portal.Host>
        <View style={styles.page}>
          <View style={styles.container}>
            <MapboxGL.MapView style={styles.map}>
              <MapboxGL.Camera
                zoomLevel={10}
                centerCoordinate={[-74.009499, 40.704498]}
              />
              {
                fsqArr.map( (bus, idx) => (
                  <MapboxGL.MarkerView id="business" key={bus.id} coordinate={[bus.location.lng, bus.location.lat]}>
                  <View>
                    <IconButton
                      icon="map-marker-radius"
                      color="blue"
                      size={20}
                      onPress={() => this.handleVis(bus)} />
                    <DiaPortalFsq bus={bus} handleVis={this.handleVis}/>
                    </View>
                  </MapboxGL.MarkerView>
                ))
              }
              {
                this.state.businesses.map( (bus, idx) => (
                  <MapboxGL.MarkerView id="business" key={bus.id} coordinate={bus.coordinates}>
                  <View>
                    <IconButton
                      icon="map-marker-radius"
                      color="red"
                      size={20}
                      onPress={() => this.handleVis(bus)} />
                    <DiaPortalEco bus={bus} handleVis={this.handleVis}/>
                    </View>
                  </MapboxGL.MarkerView>
                ))
              }
            </MapboxGL.MapView>
          </View>
        </View>
      </Portal.Host>
    );
  }
}
