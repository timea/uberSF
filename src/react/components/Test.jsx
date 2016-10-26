import React from 'react';
import ReactDOM from 'react-dom';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';

const coords = {
  lat: 37.774929,
  lng: -122.419416
};

var Test = React.createClass({

  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: true
    });
  },

  onDragEnd(e) {
    console.log('onDragEnd', e);
  },

  onCloseClick() {
    console.log('onCloseClick');
  },

  onClick(e) {
    console.log('onClick', e);
  },

  render() {
    return (
      <Gmaps
        width={'100vw'}
        height={'100vh'}
        lat={coords.lat}
        lng={coords.lng}
        zoom={14}
        loadingMessage={'Be happy'}
        params={{v: '3.exp', key: 'AIzaSyAf4Mt8-e0kvAmoKL0AhWabE3JaOBDTVAs'}}
        onMapCreated={this.onMapCreated}>
        <Marker
          lat={coords.lat}
          lng={coords.lng}
          draggable={false}
          onDragEnd={this.onDragEnd} />
      </Gmaps>
    );
  }

});

module.exports = Test;
