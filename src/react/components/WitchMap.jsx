import React from 'react';
import Dashboard from './Dashboard';
import MovieList from './MovieList';

const SF_POSITION = {
  lat: 37.7901,
  lng: -122.4
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
      timerState: "initial",
      count: 0,
      takenOut:[],
      movieData:[]};
    this.addMarkers = this.addMarkers.bind(this);
    this.compareLocations = this.compareLocations.bind(this);
    this.setTimerState = this.setTimerState.bind(this);
    this.loadMovieFromServer = this.loadMovieFromServer.bind(this);
    this.loadHorrorMarkersFromServer();
    var $that = this;
    window.initMap = function() {
      $that.map = new window.google.maps.Map($that.refs.map, {
        center: SF_POSITION,
        zoom: 34,
        mapTypeId: 'satellite'
      });
    }
    console.log("Welcome to the game!");
    console.log("");
    console.log("Sabrina, the witch needs some help from you. She really needs to get some inspiration to figure out a spell to keep her youth, just like in the movies.");
    console.log("She can find spells spread around the city of San Fran on the locations of scenes from horror movies shot here.");
    console.log("As halloween is almost over all over the world, you have 4 minutes to find enough jack-o-lanterns in the city dropped on these movie locations.");
    console.log("To read the spell just fly over the lanterns, but BE WARNED: if you fly to high(zoomed too much out), you might not be able to read the spell!");
    console.log("");
    console.log("You can zoom in and out on the map with the usual controls.");
    console.log("Click on the map to start flying with the arrow keys.");
    console.log("");
    console.log("When the time is up, you can see if you helped her to get enough inspired.");
    console.log("");
    console.log("Best of LUCK and have a safe flight!");

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
    if(this.state.timerState != "stopped") {
      setInterval(this.compareLocations, 100);
      setInterval(this.setTimerState, 100);
    }
  }

  compareLocations() {
    if(this.state.timerState != "stopped"){
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
          console.log("Bummmmmm, found some spell inspiration!");
          $that.setState({takenOut: $that.state.takenOut.concat(markers[i].id)});
          score += Math.round(markers[i].position.lat());
        }
      }
      var diff = $(markers).not(toTakeOut).get();

      $that.setState({markers: diff, score: score});
      $that.loadMovieFromServer();
    }
  }

  setTimerState() {
    var $that = this;
    if($that.state.timerState == "initial") {
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
    if(this.state.timerState != "stopped"){
      this.timer = setInterval(() => {
        if(this.state.count<240){
           this.setState({
             count: this.state.count + 1
           });
         } else {
           this.setState({
             timerState: "stopped"
           });
           clearInterval(this.timer);
           console.log("");
           console.log("The game is OVER");
           if(this.state.score > 600) {
             console.log("");
             console.log("You managed to get so many pumkins, you gotta be part of the top 1% of humanity.");
             console.log("");
             console.log("Sabrina is so happy, she decided to be only a good witch from here on!");
             console.log("");
             console.log("Keep in mind: 'Magic is where you find it.' Tom Ryan");
             console.log("");
             console.log("Have a lovely day!");
           }
           if(this.state.score > 300 &&
              this.state.score < 600) {
             console.log("");
             console.log("You managed to inspire Sabrina with the spells found, she can keep her young looks!");
             console.log("");
             console.log("Keep in mind: 'Magic is where you find it.' Tom Ryan");
             console.log("");
             console.log("Have a lovely day!");

           }
           if(this.state.score > 200 &&
              this.state.score < 300) {
             console.log("");
             console.log("You missed only by a little bit. Keep trying to save the day!");
           }
           if(this.state.score > 0 &&
              this.state.score < 200) {
             console.log("");
             console.log("Keep flying around. You might want to zoom out more to get an overview. :).");
             console.log("");
             console.log("(F5 to replay and save the say!)");
           }
         }
      }, 1000);
    }
  }

  loadMovieFromServer() {
    var url = "/movies/" + this.state.takenOut.toString();
    if( url != "/movies/")
    {
      var $that = this;
      $.ajax({
          url: url,
          dataType: 'json',
          success: (data) => {
            this.setState({movieData: data});
          },
          error: (xhr, status, err) => {
            console.error(this.props.url, status, err.toString());
          }
      });
    }
  }

  render() {
    const mapStyle = {
      height: '100vh'
    };
    // switch (this.state.timerState){
    //   case "stopped":
    //     console.log("The game is over");
    //     break;
    // }
    return (
      <div>
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
            />
        </div>
        <div>
          <MovieList data={this.state.movieData} key="key"/>
        </div>
      </div>
    );
  }
}

export default WitchMap;
