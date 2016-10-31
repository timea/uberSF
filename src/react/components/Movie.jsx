import React from 'react';

class Movie extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className = "movie">
        <h2 className = "movieName">
          {this.props.movie_title}
        </h2>
        <p>{this.props.release_year}</p>
        <img src={this.props.image_url}/>
        <p>{this.props.imdb_url}</p>
      </div>
    );
  }
}

export default Movie;
