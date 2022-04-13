import React, { useState} from 'react';
import ReactMapGL from 'react-map-gl';
import mapboxgl from '!mapbox-gl';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const MapGL = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoibWFydGluYm9uZGV2aWsiLCJhIjoiY2wxd2d6aGFjMDJkZDNqbXM5aDIwZGQ4YiJ9.RCaHBfTRYPm8gAmTdk1XBQ"
});

const Map= () => {
  const [viewport, setViewport] = useState({
    latitude: 7037472.01,
    longitude: 274701.05,
    zoom: 7.8,
    bearing: 0,
    pitch: 0,
  });

  return (
    <div className="mapbox-react">
     <MapGL
        style="mapbox://styles/mapbox/outdoors-v11"
        containerStyle={{
          height: "100vh",
          width: "85vw"
        }}
      >
        <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
          <Feature coordinates={[7037472.01, 274701.05]} />
        </Layer>
      </MapGL>
    </div>
  );
};

export default Map;