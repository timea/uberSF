import React from 'react';
import Score from './Score';
import Timer from './Timer';
import MovieList from './MovieList';

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
    this.loadMovieFromServer = this.loadMovieFromServer.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if ((this.props === nextProps) && (this.state === nextState)){
            return false;
        }
          console.log("dashboard will update now");
          this.loadMovieFromServer();
          return true;
    }


  loadMovieFromServer() {
    if( this.props.url != "/movies/")
    {
      console.log("ajac call is called");
      var $that = this;
      $.ajax({
          url: this.props.url,
          dataType: 'json',
          success: (data) => {
            this.setState({data: data});
            console.log("data from dashboard "+$that.state.data);
          },
          error: (xhr, status, err) => {
            console.error(this.props.url, status, err.toString());
          }
      });
    }
  }

  render () {
    console.log("url from dashboard " + this.props.url );
    console.log("state of data from dashboard "+ this.state.data);
    return(
      <div className="dashboard">
        <Score score={this.props.score}/>
        <Timer timerStatus={this.props.timerState} count={this.props.count}/>
        <MovieList data={this.state.data}/>
      </div>
    );
  }
}
export default Dashboard;
