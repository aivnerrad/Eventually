import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};


function GoogleMapComponent(props) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCO6reNBQBx40kM_O0zam9OhwYlWYFcejQ"
  })

  return isLoaded ? (
    <GoogleMap
    mapContainerStyle={containerStyle}
    center={props.center}
    zoom={12}

    >
    {props?.markers?.map(
        coords => <Marker position={coords} />
    )}
      </GoogleMap>
  ) : <></>
}

export default GoogleMapComponent
