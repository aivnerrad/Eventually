import React from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

const GoogleMapComponent = ({google, locations = []}) => {
  return (
  <Map
    google={google}
    containerStyle={{
      width: '100%',
      height: '100%'
    }}
    style={{
      width: '100%',
      height: '100%'
    }}
    center={locations[0]}
    zoom={13}
    disableDefaultUI={true}>
       {locations.map(
                coords => <Marker position={coords} />
            )}
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCO6reNBQBx40kM_O0zam9OhwYlWYFcejQ"
})(GoogleMapComponent);
