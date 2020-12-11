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
import Geolocation from '@react-native-community/geolocation';
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
    backgroundColor: "black"
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
        ll: ``,
        query: '',
        limit: 20,
        radius: 48280.3
      },
      fsq: [],
      userLoc: []
    }
    this.handleVis = this.handleVis.bind(this);
    this.onRegionDidChange = this.onRegionDidChange.bind(this);
  }
  componentDidMount() {
    MapboxGL.setTelemetryEnabled(true);
    Geolocation.getCurrentPosition(info => {
      const data = {...info}
      this.setState({
        params: {
          ...this.state.params,
          ll: `${data.coords.latitude}, ${data.coords.longitude}`
        },
        userLoc: [data.coords.latitude, data.coords.longitude]})
    });


  }
  async onRegionDidChange(){
    const center = await this._map.getCenter()
    this.setState({
      params: {
        ...this.state.params,
        ll: `${center[1]}, ${center[0]}`,
      }
    })
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
      return copy
    })

  }
  render() {
    const fsqArr = this.state.fsq
    const userLoc = this.state.params.ll

    return (
      <Portal.Host>
        <View style={styles.page}>
          <View style={styles.container}>
            <MapboxGL.MapView
              ref={(c) => (this._map = c)}
              style={styles.map}
              onRegionDidChange={this.onRegionDidChange}
            >
            <MapboxGL.UserLocation
              visible={true}
              showsUserHeadingIndicator={true}
            />{
              userLoc ?
                <MapboxGL.Camera
                  zoomLevel={10}
                  centerCoordinate={[this.state.userLoc[1], this.state.userLoc[0]]}
                /> : <Text>LOADING</Text>
            }
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
                  <MapboxGL.MarkerView
                    id="business"
                    key={bus.id}
                    coordinate={bus.coordinates}
                  >
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
            <Button onPress={()=> {
              foursquare.venues.getVenues(this.state.params).then(res => {
                this.setState(prevState => {
                  let copy = {...prevState}
                  copy.fsq = [...res.response.venues]
                  copy.fsq.forEach(bus => {
                    bus.visible = false
                  })
                  return copy
                });
              });
            }}>{
              !this.state.fsq[0] ? ('Start Search in Your Location') :
              ('Redo Search in New Location')
            }</Button>
          </View>
        </View>
      </Portal.Host>
    );
  }
}
