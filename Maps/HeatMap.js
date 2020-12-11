import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
import '../secrets'

MapboxGL.setAccessToken(process.env.MB_PUB_ACCESS_KEY);

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

export default class HeatMap extends Component {
  componentDidMount() {
    MapboxGL.setTelemetryEnabled(true);
  }

  //GET response object from Dynamo
  //Go through each object's key's and extract out the lat/lng
  //Store those pairs in a geoJSON format
  //STore that geoJSON to some AWS service
  //Retriece that data via URL
  //The data needs to


  //Upon rendering,
  render() {
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <MapboxGL.MapView style={styles.map}>
            <MapboxGL.Camera
              zoomLevel={10}
              centerCoordinate={[-74.009499, 40.704498]}
            />
            <MapboxGL.ShapeSource
              url="localhost:8080/api/covid"
             >
              {/* <MapboxGL.HeatmapLayer
                id="earthquakes"
                sourceID="earthquakes"
                style={{
                  heatmapColor: [
                    'interpolate',
                    ['linear'],
                    ['heatmap-density'],
                    0,
                    'rgba(33,102,172,0)',
                    0.2,
                    'rgb(103,169,207)',
                    0.4,
                    'rgb(209,229,240)',
                    0.6,
                    'rgb(253,219,199)',
                    0.8,
                    'rgb(239,138,98)',
                    1,
                    'rgb(178,24,43)',
                  ],
                }}
              /> */}
            </MapboxGL.ShapeSource>
          </MapboxGL.MapView>
        </View>
      </View>
    );
  }
}
