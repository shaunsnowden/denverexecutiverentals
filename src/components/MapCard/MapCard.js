import React from 'react';

import './MapCard.css';

export default class Map extends React.Component {
  constructor() {
    super();
    this.state = {
      zoom: 12,
      maptype: 'roadmap',
      place_formatted: '',
      place_id: '',
      place_location: '',
    };
  }

  componentDidMount() {

    console.log(this.state);
    let mapCard = new window.google.maps.Map(document.getElementById('mapCard'), {
      center: {lat: parseFloat(this.props.lat), lng: parseFloat(this.props.lng)},
      zoom: 12,
      styles: [
        {
            "featureType": "water",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#b5cbe4"
                }
            ]
        },
        {
            "featureType": "landscape",
            "stylers": [
                {
                    "color": "#efefef"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#83a5b0"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#bdcdd3"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#e3eed3"
                }
            ]
        },
        {
            "featureType": "administrative",
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
            "featureType": "road"
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
        {},
        {
            "featureType": "road",
            "stylers": [
                {
                    "lightness": 20
                }
            ]
        }
    ]
    });

    mapCard.addListener('zoom_changed', () => {
      this.setState({
        zoom: mapCard.getZoom(),
      });
    });

    mapCard.addListener('maptypeid_changed', () => {
      this.setState({
        maptype: mapCard.getMapTypeId(),
      });
    });
    
    let infoWindow = new window.google.maps.InfoWindow
    let blueMarker = "http://maps.gstatic.com/mapfiles/ms2/micons/homegardenbusiness.png"
    let marker = new window.google.maps.Marker({
      map: mapCard,
      icon: blueMarker,
      position: {lat: parseFloat(this.props.lat), lng: parseFloat(this.props.lng)},
    });

    console.log(this.props);  
    // initialize the autocomplete functionality using the #pac-input input box
    let inputNode = document.getElementById('pac-input');
    mapCard.controls[window.google.maps.ControlPosition.TOP_LEFT].push(inputNode);
    let autoComplete = new window.google.maps.places.Autocomplete(inputNode);

    autoComplete.addListener('place_changed', () => {
      let place = autoComplete.getPlace();
      let location = place.geometry.location;

      this.setState({
        place_formatted: place.formatted_address,
        place_id: place.place_id,
        place_location: location.toString(),
      });

      // bring the selected place in view on the map
      mapCard.fitBounds(place.geometry.viewport);
      mapCard.setCenter(location);

      marker.setPlace({
        placeId: place.place_id,
        location: location,
      });
    });
  }

  render() {
    return (
      <div id='appCard'>
        <div id='mapCard' />
      </div>
    );
  }
};
