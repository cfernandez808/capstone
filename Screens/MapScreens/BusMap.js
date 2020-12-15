import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
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
import { API } from "aws-amplify";
import * as queries from '../../graphql/queries'
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
    backgroundColor: "grey"
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
    //Snaps to the user's location upon render
    Geolocation.getCurrentPosition(info => {
      const data = {...info}
      this.setState({
        params: {
          ...this.state.params,
          //Initialized foursquare search at user location
          ll: `${data.coords.latitude}, ${data.coords.longitude}`
        },
        userLoc: [data.coords.latitude, data.coords.longitude]})
    });


  }
  /* CHECKS FOR THE CENTER OF THE MAP VIEW CONSTANTLY
  FOR FSQ MARKER RENDERING WHEN SEARCHING IN NEW LOCATION */
  async onRegionDidChange(){
    const center = await this._map.getCenter()
    this.setState({
      params: {
        ...this.state.params,
        ll: `${center[1]}, ${center[0]}`,
      }
    })
  }

  /* FIRST SETS TO STATE ECO SYSTEM BUSINESS MARKERS THEN FSQ BUSINESS MARKERS
  UPON CLCIKING THE 'SEARCH IN LOCATION' BUTTON. ALSO ATTACHES THE 'VISIBLE'
  PROPERTY TO EACH BUSINESS FOR THE DIALOGUE BOX */
  async handleMarkers () {
    const allBusinesses = await API.graphql({query: queries.listBusinesss})
    this.setState(prevState => {
      let copy ={...prevState}
      copy.businesses = [...allBusinesses.data.listBusinesss.items]
      copy.businesses.forEach(bus => {
        bus.visible = false
      })
      return copy
    })
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
  /*UPON CLICKING A BUSINESS MARKER, CHANGES THE VISIBLE PROPERTY
  FOR THAT MARKER TO BE OPPOSITE */
  handleVis(bus) {
    this.setState(prevState => {
      let copy = {...prevState}
      copy.businesses.forEach( (business) => {
        if (business.id == bus.id) {
          business.visible = !business.visible
        }
      })
      copy.fsq.forEach( (business) => {
        if(bus.id === business.id) {
          business.visible = !business.visible
        }
      })
      return copy
    })

  }

  /* CHANGES THE SEARCH QUERY FOR FOURSQUARE BUSINESS MARKERS */
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
            {/* SEARCHBAR FOR FOURSQUARE BUSINESSES */}
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
            {/* INITIALIZES THE MAPBOX VIEW */}
            <MapboxGL.MapView
              ref={(c) => (this._map = c)}
              style={styles.map}
              onRegionDidChange={this.onRegionDidChange}
            >
            {/* ALLOWS FOR RENDERING USER LOCATION MARKER */}
            <MapboxGL.UserLocation
              visible={true}
              showsUserHeadingIndicator={true}
            />{
              userLoc ?
                /* CENTERS CAMERA AT USER'S LOCATION */
                <MapboxGL.Camera
                  zoomLevel={10}
                  centerCoordinate={[this.state.userLoc[1], this.state.userLoc[0]]}
                /> : <Text>LOADING</Text>
            }
              {/* RENDERS FOURSQUARE MARKERS THEN BUSINESS MARKERS */}
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
            {/* START/REDO SEARCH IN AREA BUTTON */}
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
