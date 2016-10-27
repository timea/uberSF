var React = require('react');

const ARC_DE_TRIOMPHE_POSITION = {
  lat: 48.873947,
  lng: 2.295038
};

const EIFFEL_TOWER_POSITION = {
  lat: 48.858608,
  lng: 2.294471
};

class Map extends React.Component {
  constructor() {
    super();
    this.addMarkers = this.addMarkers.bind(this);
    var $that = this;
    window.initMap = function() {
      console.log(this)
      $that.map = new window.google.maps.Map($that.refs.map, {
        center: EIFFEL_TOWER_POSITION,
        zoom: 16
      });
    }
  }

  componentDidMount() {
  }

  addMarkers() {
    var markerTriomphe = new google.maps.Marker({
      position: ARC_DE_TRIOMPHE_POSITION,
      map: this.map,
      title: 'Arc de Triomphe',
      icon: 'http://www.megaicons.net/static/img/icons_sizes/311/1029/24/jack-o-lantern-icon.png'
    });
    var markerEiffel = new google.maps.Marker({
      position: EIFFEL_TOWER_POSITION,
      map: this.map,
      title: 'Eiffel',
      icon: 'http://www.megaicons.net/static/img/icons_sizes/311/1029/24/jack-o-lantern-icon.png'
    });
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

module.exports = Map;
