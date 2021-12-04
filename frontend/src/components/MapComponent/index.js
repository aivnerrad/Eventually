import React from "react"
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps"
import "./Map.css"



const MyMapComponent = withScriptjs(withGoogleMap((props) => {
  return (
  <GoogleMap defaultZoom={10} defaultCenter={{ lat: 39.4562, lng: -77.9639 }}/>
)}));

export default MyMapComponent;
