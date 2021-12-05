import React from "react"
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps"
import "./Map.css"
import { useState } from "react";
const GMap = withScriptjs(withGoogleMap((props) => {
  const [markers, setMarkers] = useState(props.markers)
  console.log("GMAP MARKERS", markers)
  return (
  <GoogleMap defaultZoom={13} defaultCenter={{ lat: 39.4562, lng: -77.9639 }}>
    {markers && markers.map((marker) => {
      console.log("marker.position in map", marker.position)
      return <Marker position={marker.position}/>
    })}
  </GoogleMap>
)}));

export default GMap;
