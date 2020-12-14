import React from "react";
import {View} from 'react-native';
import {IconButton} from 'react-native-paper';
import MapboxGL from "@react-native-mapbox-gl/maps";
import DiaPortalEco from "./DiaPortalFsq";

const MarkersBus= props => {
  const {bus, handleVis} = props
  return (
    <MapboxGL.MarkerView
      id="business"
      coordinate={[bus.lng, bus.lat]}
    >
      <View>
        <IconButton
          icon="map-marker-radius"
          color="red"
          size={20}
          onPress={() => handleVis(bus)} />
        <DiaPortalEco bus={bus} handleVis={handleVis}/>
      </View>
    </MapboxGL.MarkerView>
    )

}

export default MarkersBus
