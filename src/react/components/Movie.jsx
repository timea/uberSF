import React from 'react';

class Movie extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className = "movie">
        <h2 className = "movieName">
          <a href={this.props.imdb_url}>{this.props.movie_title}</a>
        </h2>
        <p>{this.props.release_year}</p>
        <div>{this.props.plot}</div>
      </div>
    );
  }
}

export default Movie;
