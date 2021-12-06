import React, { useEffect } from "react"
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps"
import "./Map.css"
import { useState } from "react";
const GMap = withScriptjs(withGoogleMap((props) => {
  const [markers, setMarkers] = useState(props.markers)
  const icon = "https://i.ibb.co/k1s3SQF/home.png"
  console.log(markers)
  //GoogleMap component center is set to props.position if a position is given, otherwise it's set to a default spot. NOTE: DO NOT USE defaultZoom or defaultCenter for dynamic maps.....
  return (
  <GoogleMap zoom={props.zoom} center={Object.keys(props.position).length === 2 ? props.position :{ lat: 39.4562, lng: -77.9639 }} options={{
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: true,
    rotateControl: true,
    fullscreenControl: true
  }}>
    {markers && markers.map((marker) => {
      return <Marker icon={icon} position={marker.position}/>
    })}
  </GoogleMap>
)}));

export default GMap;
