// import React, {useState, useRef, useCallback} from 'react';
// import DeckGL from '@deck.gl/react';
// // import {ScatterplotLayer} from '@deck.gl/layers'; //2843
// import { View, Text } from "react-native";
// // import {StaticMap} from 'react-map-gl'; //document prob

// // import {MapboxLayer} from '@deck.gl/mapbox'; //metro prob

// const INITIAL_VIEW_STATE = {
//   longitude: -74.50,
//   latitude: 40,
//   zoom: 9
// };

// const data = [
//   {position: [-74.5, 40], size: 100}
// ];

// const DeckGLMap = () => {
//   // DeckGL and mapbox will both draw into this WebGL context
//   const [glContext, setGLContext] = useState();
//   const deckRef = useRef(null);
//   const mapRef = useRef(null);

//   const onMapLoad = useCallback(() => {
//     const map = mapRef.current.getMap();
//     const deck = deckRef.current.deck;

//     // You must initialize an empty deck.gl layer to prevent flashing
//     map.addLayer(
//       // This id has to match the id of the deck.gl layer
//       new MapboxLayer({ id: "my-scatterplot", deck }),
//       // Optionally define id from Mapbox layer stack under which to add deck layer
//       'beforeId'
//     );
//   }, []);

//   const layers = [
//     new ScatterplotLayer({
//       id: 'my-scatterplot',
//       data,
//       getPosition: d => d.position,
//       getRadius: d => d.size,
//       getFillColor: [255, 0, 0]
//     })
//   ];

//   return (
//     // <View>

//     //   <DeckGL
//     //     ref={deckRef}
//     //     layers={layers}
//     //     initialViewState={INITIAL_VIEW_STATE}
//     //     controller={true}
//     //     onWebGLInitialized={setGLContext}
//     //     glOptions={{
//     //       /* To render vector tile polygons correctly */
//     //       stencil: true
//     //     }}
//     //   >
//     //     {glContext && (
//     //       /* This is important: Mapbox must be instantiated after the WebGLContext is available */
//     //       <StaticMap
//     //       ref={mapRef}
//     //       gl={glContext}
//     //       mapStyle="mapbox://styles/mapbox/light-v9"
//     //       mapboxApiAccessToken={"pk.eyJ1IjoidGRjMDI3IiwiYSI6ImNrZnd4eWIyaDEzajMyeW85MzdtZmx2ZmUifQ.QIhkgLlH5J1JwPKiWNUe_A"}
//     //       onLoad={onMapLoad}
//     //     />
//     //     )}
//     //   </DeckGL>
//     // </View>
//     <View>
//       <Text>Deck GL Page</Text>
//     </View>
//   );
// }

// export default DeckGLMap;
