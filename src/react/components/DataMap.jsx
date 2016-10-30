import React from 'react';

const SF_POSITION = {
  lat: 37.7643,
  lng: -122.438
};

const PUMPKIN = "/images/jack-o-lantern-icon.png";

class WitchMap extends React.Component {
  constructor() {
    super();
    this.state = {data: []};
    this.addMarkers = this.addMarkers.bind(this);
    this.loadAllMarkersFromServer();
    var $that = this;
    window.initMap = function() {
      $that.map = new window.google.maps.Map($that.refs.map, {
        center: SF_POSITION,
        zoom: 16
      });
    }
  }

  defaultProps() {
        url: "/markers"
  };

  loadAllMarkersFromServer() {
    $.ajax({
        url: "/markers",
        dataType: 'json',
        success: (data) => {
          this.setState({data: data});
          this.addMarkers();
        },
        error: (xhr, status, err) => {
          console.error(this.props.url, status, err.toString());
        }
    });
  }

  addMarkers() {
    var data = this.state.data;
    var $that = this;
    var markers = [];
    for (var i = 0; i < data.length; i++) {
        var pos = new window.google.maps.LatLng(data[i].latitude, data[i].longitude);
        markers[i] = new google.maps.Marker({
            position: pos,
            map: $that.map,
            icon: PUMPKIN,
            description: data[i].location_description,
            id: i
        });

        google.maps.event.addListener(markers[i], 'click', function() {
            // this -> the marker on which the onclick event is being attached
            if (!this.getMap()._infoWindow) {
                this.getMap()._infoWindow = new google.maps.InfoWindow();
            }
            this.getMap()._infoWindow.close();
            this.getMap()._infoWindow.setContent(this.description);
            this.getMap()._infoWindow.open(this.getMap(), this);
        });

      }
  }

  render() {
    const mapStyle = {
      width: '80vw',
      height: '100vh',
      border: '1px solid black'
    };
    return (
      <div>
        <button onClick={this.addMarkers}>Add markers</button>
        <div ref="map" style={mapStyle}>I should be a map!</div>
      </div>
    );
  }
}

export default WitchMap;
