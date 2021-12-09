import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const styles = [
  {
      "featureType": "administrative",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "on"
          },
          {
              "lightness": 33
          }
      ]
  },
  {
      "featureType": "landscape",
      "elementType": "all",
      "stylers": [
          {
              "color": "#f2e5d4"
          }
      ]
  },
  {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#c5dac6"
          }
      ]
  },
  {
      "featureType": "poi.park",
      "elementType": "labels",
      "stylers": [
          {
              "visibility": "on"
          },
          {
              "lightness": 20
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "all",
      "stylers": [
          {
              "lightness": 20
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#c5c6c6"
          }
      ]
  },
  {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#e4d7c6"
          }
      ]
  },
  {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#fbfaf7"
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "on"
          },
          {
              "color": "#acbcc9"
          }

          ]
  }
]

const containerStyle =  {
  width: '45%',
  height: '500px'
};

const mapOptions = {
  disableDefaultUI: true,
  streetViewControl: true,
  zoomControl: true,
  styles
}

function GoogleMapComponent(props) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCO6reNBQBx40kM_O0zam9OhwYlWYFcejQ"
  })

  return isLoaded ? (
    <GoogleMap
    mapContainerStyle={containerStyle}
    center={props.center}
    zoom={13}
    options={mapOptions}
    >
    {props?.markers?.map(
        marker => <Marker position={marker.position} />
    )}
      </GoogleMap>
  ) : <></>
}

export default GoogleMapComponent
