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
      center: {lat: 39.7392, lng: -104.9903},
      zoom: 13,
      mapTypeId: 'roadmap',
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

    let marker = new window.google.maps.Marker({
      mapCard: mapCard,
      position: {lat: 39.7392, lng: -104.9903},
    });

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
