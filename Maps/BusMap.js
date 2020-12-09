import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
import {
  IconButton,
  Portal,
  Dialog,
  Button,
  Paragraph
} from 'react-native-paper';
import DiaPortal from './DiaPortal'

MapboxGL.setAccessToken("pk.eyJ1IjoidGRjMDI3IiwiYSI6ImNrZnd4eWIyaDEzajMyeW85MzdtZmx2ZmUifQ.QIhkgLlH5J1JwPKiWNUe_A");

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

    }
    this.handleVis = this.handleVis.bind(this)
  }
  componentDidMount() {
    MapboxGL.setTelemetryEnabled(true);
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

      return copy
    })
  }

  render() {
    return (
      <Portal.Host>
        <View style={styles.page}>
          <View style={styles.container}>
            <MapboxGL.MapView style={styles.map}>
              <MapboxGL.Camera
                zoomLevel={15}
                centerCoordinate={[-74.009499, 40.704498]}
              />
              {
                this.state.businesses.map( (bus, idx) => (
                  <MapboxGL.MarkerView id="business" key={bus.id} coordinate={bus.coordinates}>
                  <View>
                    <IconButton
                      icon="map-marker-radius"
                      color="red"
                      size={20}
                      onPress={() => this.handleVis(bus)} />
                    <DiaPortal bus={bus} handleVis={this.handleVis}/>
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
