import React from 'react';
import Movie from './Movie';

class MovieList extends React.Component {
  constructor(props){
    super(props);
  }


  render() {
    var $that = this;
    console.log("properties in movielist " + $that.props.data);
    var movies = $that.props.data.map(function(movie) {
      return (
        <Movie
          key={movie.location_id}
          movie_title={movie.movie_title}
          release_year={movie.release_year}
          image_url={movie.image_url}
          imdb_url={movie.imdb_url}
          />
      );
    });
    return(
      <div clasName="movieList">
        {movies}
      </div>
    );
  }
}

export default MovieList;
