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
    center: {lat: 39.7392, lng: -104.9903},
    zoom: 13,
    mapTypeId: 'roadmap',
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

     // marker.setPlace({
     //   placeId: place.place_id,
     //   location: location,
     // });
   });

  console.log(properties);
  // loop through parkingSpots array and display values on map
  for (let i = 0, length = properties.length; i < length; i++) {
    let data = properties[i],
        latLng = new window.google.maps.LatLng(data.lat, data.lng); 
    console.log("BLAR");
    if (properties[i].occupied == 0 ) {
    // // Creating a marker and putting it on the map
    let greenMarker = "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    let marker = new window.google.maps.Marker({
      position: latLng,
      map: map,
      icon: greenMarker,
      title: data.propertyTitle
    });
    // // Creating a closure to retain the correct data, notice how I pass the current data in the loop into the closure (marker, data)
      (function(marker, data) {
                // Attaching a click event to the current marker
                window.google.maps.event.addListener(marker, "click", function(e) {
                  window.infoWindow.setContent(`<strong>${data.propertyTitle}</strong>`);
                  window.infoWindow.open(map, marker);

                });     
              })(marker, data);
    } else {
      let redMarker = "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
      let marker = new window.google.maps.Marker({
        position: latLng,
        map: map,
        icon: redMarker,
        title: data.propertyTitle
      });
    //   // Creating a closure to retain the correct data, notice how I pass the current data in the loop into the closure (marker, data)
      (function(marker, data) {
        // Attaching a click event to the current marker
        window.google.maps.event.addListener(marker, "click", function(e) {
          window.infoWindow.setContent(`<strong>${data.propertyTitle}</strong>`);
          window.infoWindow.open(map, marker);
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

    // let marker = new window.google.maps.Marker({
    //   map: map,
    //   position: {lat: 39.7392, lng: -104.9903},
    // });

    // ________________________________ START _________________________________



    // _____________________________ END ___________________________________________










 
  }

  render() {
    return (
      <div id='app'>
        <div id='map' />
      </div>
    );
  }
};
