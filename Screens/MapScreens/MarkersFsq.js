import React from "react";
import {View} from 'react-native';
import {IconButton} from 'react-native-paper';
import MapboxGL from "@react-native-mapbox-gl/maps";
import DiaPortalFsq from "./DiaPortalFsq";

const MarkersFsq = props => {
  const {bus, handleVis, address, city, st} = props
  return (
    <MapboxGL.MarkerView
      id="business"
      coordinate={[bus.location.lng, bus.location.lat]}
    >
      <View>
        <IconButton
          icon="map-marker-radius"
          color="blue"
          size={20}
          onPress={() => handleVis(bus)} />
        <DiaPortalFsq
          bus={bus}
          address={address}
          handleVis={handleVis}
          city={city}
          st={st}
        />
      </View>
    </MapboxGL.MarkerView>
  )

}

export default MarkersFsq;
