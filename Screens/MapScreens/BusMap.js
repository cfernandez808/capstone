import React, { Component } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
import {
  Portal,
  Button,
  Searchbar
} from "react-native-paper";
import Foursquare from "@foursquare/foursquare-places";
import Geolocation from "@react-native-community/geolocation";
import MarkersFsq from "./MarkersFsq"
import MarkersBus from "./MarkersBus"
import "../../secrets";

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
      businesses: [],
      params: {
        ll: ``,
        query: '',
        limit: 20,
        radius: 48280.3
      },
      fsq: [],
      userLoc: [],
    }
    this.handleVis = this.handleVis.bind(this);
    this.onRegionDidChange = this.onRegionDidChange.bind(this);
    this.busSearch = this.busSearch.bind(this)
    this.handleMarkers = this.handleMarkers.bind(this)
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
  handleMarkers () {
    foursquare.venues.getVenues(this.state.params).then(res => {
      this.setState(prevState => {
        let copy = {...prevState}
        copy.fsq = [...res.response.venues]
        copy.fsq.forEach(bus => {
          bus.visible = false
        })
        return copy
      })
    });
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
  busSearch (query) {
    this.setState({
      params: {
        ...this.state.params,
        query: query
      }
    })
    this.handleMarkers()
  }
  render() {
    const fsqArr = this.state.fsq
    const userLoc = this.state.params.ll
    return (
      <Portal.Host>
        <View style={styles.page}>
          <View style={styles.container}>
            <Searchbar
              placeholder="Business-Type Search"
              onIconPress={() => this.busSearch()}
              onChangeText={text =>this.setState({
                params: {
                  ...this.state.params,
                  query: text
                }
              })}
              value={this.state.params.query}
              icon="shopping-search" />
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
                fsqArr.map(bus => (
                  <MarkersFsq
                    key={bus.id}
                    bus={bus}
                    city={bus.location.city}
                    st={bus.location.state}
                    address={bus.location.address}
                    handleVis={this.handleVis}
                  />
                ))
              }
              {
                this.state.businesses.map( bus => (
                  <MarkersBus
                    key={bus.id}
                    bus={bus}
                    handleVis={this.handleVis}
                  />
                ))
              }
            </MapboxGL.MapView>
            <Button onPress={()=> {
              this.handleMarkers()
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
