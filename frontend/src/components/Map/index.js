import React from "react"
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps"
import "./Map.css"
import { useState } from "react";
const GMap = withScriptjs(withGoogleMap((props) => {
  const [markers, setMarkers] = useState(props.markers)
  const [center, setCenter] = useState(props.center)
  const icon = "https://i.ibb.co/k1s3SQF/home.png"
  return (
  <GoogleMap defaultZoom={10} defaultCenter={ center }>
    {markers && markers.map((marker) => {
      console.log("marker.position in map", marker.position)
      return <Marker icon={icon} position={marker.position}/>
    })}
  </GoogleMap>
)}));

export default GMap;
