import React from 'react';
import Dashboard from './Dashboard';

const SF_POSITION = {
  lat: 37.7643,
  lng: -122.438
};

const PUMPKIN = "/images/pumpkin-evil-icon-glow.png";

class WitchMap extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      markers: [],
      score: 0,
      cent:{},
      timerState: "stopped",
      count: 0,
      takenOut:[]};
    this.addMarkers = this.addMarkers.bind(this);
    this.compareLocations = this.compareLocations.bind(this);
    this.setTimerState = this.setTimerState.bind(this);
    this.loadHorrorMarkersFromServer();
    var $that = this;
    window.initMap = function() {
      $that.map = new window.google.maps.Map($that.refs.map, {
        center: SF_POSITION,
        zoom: 34,
        mapTypeId: 'satellite',
        zoomControl: false
      });
    }
  }



  loadHorrorMarkersFromServer() {
    var $that = this;
    $.ajax({
        url: "/genre-markers/Horror",
        dataType: 'json',
        success: (data) => {
          this.setState({data: data});
          setTimeout(function(){
            $that.addMarkers();
          }, 400);
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
            id: data[i].movie_id
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
    this.setState({markers: markers});
  }

  componentDidMount() {
    $('.witch-container>div').focus();
    var direction = 1; // 1 - top, 2 - right, 3 - bottom, 4 - left
    function getRotationDegrees(obj) {
      var matrix = obj.css("-webkit-transform") ||
      obj.css("-moz-transform")    ||
      obj.css("-ms-transform")     ||
      obj.css("-o-transform")      ||
      obj.css("transform");
      if(matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
      } else { var angle = 0; }
      return (angle < 0) ? angle +=360 : angle;
    }

    function rotateWitch(angle) {
        var $elem = $('#witch');
        var $start = getRotationDegrees($elem);

        $({deg: $start}).animate({deg: angle}, {
            duration: 500,
            step: function(now) {
                $elem.css({
                    transform: 'rotate(' + now + 'deg)'
                });
            }
        });
    }

    $('body').on('keydown', function(e) {
      if (e.keyCode == 39) {
          if (direction != 2) {
            rotateWitch(90);
            direction = 2;
          }
        }
    });
    $('body').on('keyup', function(e) {
      if (e.keyCode == 39) {
        rotateWitch(0);
        direction = 1;
      }
    });

    $('body').on('keydown', function(e) {
      if (e.keyCode == 37) {
          if (direction != 4) {
            rotateWitch(-90);
            direction = 4;
          }
        }
    });
    $('body').on('keyup', function(e) {
      if (e.keyCode == 37) {
        rotateWitch(360);
        direction = 1;
      }
    });
    setInterval(this.compareLocations, 100);
    setInterval(this.setTimerState, 100);
  }

  compareLocations() {
    var $that = this;
    var markers = this.state.markers;
    var toTakeOut = [];
    var score = $that.state.score;

    for (var i = 0; i < markers.length; i++) {

      if (markers[i].position.lat()-0.0002 < $that.map.getCenter().lat() &&
          markers[i].position.lat()+0.0002 > $that.map.getCenter().lat() &&
          markers[i].position.lng()-0.0002 < $that.map.getCenter().lng() &&
          markers[i].position.lng()+0.0002 > $that.map.getCenter().lng()) {
        toTakeOut.push(markers[i]);
        markers[i].setMap(null)
        console.log("Bummmmmm");
        console.log(markers[i].id);
        $that.setState({takenOut: $that.state.takenOut.concat(markers[i].id)});
        score += Math.round(markers[i].position.lat());
      }
    }
    var diff = $(markers).not(toTakeOut).get();

    $that.setState({markers: diff, score: score});
    console.log("state " + $that.state.takenOut);
  }

  setTimerState() {
    var $that = this;
    if($that.state.timerState != "started") {
      $that.setState({cent: new window.google.maps.LatLng(SF_POSITION['lat'], SF_POSITION['lng'])});
      if ($that.state.cent.lat()-0.000001 < $that.map.getCenter().lat() &&
          $that.state.cent.lat()+0.000001 > $that.map.getCenter().lat() &&
          $that.state.cent.lng()-0.000001 < $that.map.getCenter().lng() &&
          $that.state.cent.lng()+0.000001 > $that.map.getCenter().lng()){
      } else {
        $that.setState({timerState: 'started'});
        $that.startTimer();
      }
    }
  }

  startTimer() {
      this.timer = setInterval(() => {
        this.setState({
          count: this.state.count + 1
        });
      }, 1000);
  }

  render() {
    const mapStyle = {
      height: '100vh',
      border: '1px solid black'
    };
    console.log("Witchmap rerendered state " + this.state.takenOut);
    var url = "/movies/" + this.state.takenOut.toString();
    return (
      <div>
        <div className="witch-container">
          <div ref="map" style={mapStyle}>I should be a map!</div>
          <img id="witch" src="/images/witch-color-s.png" />
        </div>
        <Dashboard
          score={this.state.score}
          timerState={this.state.timerState}
          count={this.state.count}
          takenOut={this.state.takenOut}
          url={url}/>
      </div>
    );
  }
}

export default WitchMap;
