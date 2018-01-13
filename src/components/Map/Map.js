import React from 'react';
import $ from 'jquery';
import './Map.css';

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

propertiesArray(properties) {
  
  let map = new window.google.maps.Map(document.getElementById('map'), {
    center: {lat: 39.801414, lng: -105.489014},
    zoom: 9,
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

  map.addListener('zoom_changed', () => {
    this.setState({
      zoom: map.getZoom(),
    });
  });

  map.addListener('maptypeid_changed', () => {
    this.setState({
      maptype: map.getMapTypeId(),
    });
  });

   // initialize the autocomplete functionality using the #pac-input input box
   let inputNode = document.getElementById('pac-input');
   map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(inputNode);
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
     map.fitBounds(place.geometry.viewport);
     map.setCenter(location);
   });
  let infoWindow = new window.google.maps.InfoWindow
  console.log(properties);
  // loop through parkingSpots array and display values on map
  for (let i = 0, length = properties.length; i < length; i++) {
    let data = properties[i],
        latLng = new window.google.maps.LatLng(data.lat, data.lng); 
    if (properties[i].occupied == 0 ) {
    // // Creating a marker and putting it on the map
    let occupiedStatus = "Available for Rent!";
    let url = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${parseFloat(data.lat)},${parseFloat(data.lng)}&heading=0&pitch=0&fov=80"`;
    let greenMarker = "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_green.png"
    let marker = new window.google.maps.Marker({
      position: latLng,
      map: map,
      icon: greenMarker,
      title: data.propertyTitle,
    });
    // // Creating a closure to retain the correct data, notice how I pass the current data in the loop into the closure (marker, data)
      (function(marker, data) {
                // Attaching a click event to the current marker
                window.google.maps.event.addListener(marker, "click", function(e) {
                  infoWindow.setContent(`<h4>${data.propertyTitle}</h4><p style="color:green"><b>${occupiedStatus}</b></p><p><a href=${url} target="_blank"><img src=${data.image} height="100" width="150"></a></p><p>${data.propertyAddress}</p><p><b>Monthly Rent:</b> $${data.monthlyRent} </p>`);
                  infoWindow.open(map, marker);

                });     
              })(marker, data);
    } else {
      let occupiedStatus = "Currently Unavailable";
      let url = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${parseFloat(data.lat)},${parseFloat(data.lng)}&heading=0&pitch=0&fov=80"`;
      let redMarker = "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_red.png"
      let marker = new window.google.maps.Marker({
        position: latLng,
        map: map,
        icon: redMarker,
        title: data.propertyTitle,
      });
    //   // Creating a closure to retain the correct data, notice how I pass the current data in the loop into the closure (marker, data)
      (function(marker, data) {
        // Attaching a click event to the current marker
        window.google.maps.event.addListener(marker, "click", function(e) {
            infoWindow.setContent(`<h4>${data.propertyTitle}</h4><p style="color:red"><b>${occupiedStatus}</b></p></p><p><a href=${url} target="_blank"><img src=${data.image} height="100" width="150"></a></p><p>${data.propertyAddress}</p><p><b>Monthly Rent:</b> $${data.monthlyRent} </p>`);
            infoWindow.open(map, marker);
        });     
      })(marker, data);
    }     
  }
}

  componentDidMount() {
    
    let properties = [];
    
    $.get("/api/properties", data => {
      this.propertiesArray(data);
    });
  }

  render() {
    return (
      <div id='app'>
        <div id='map' />
      </div>
    );
  }
};
