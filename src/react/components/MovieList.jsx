import React from 'react';
import Movie from './Movie';

class MovieList extends React.Component {
  constructor(props){
    super(props);
  }


  render() {
    var $that = this;
    var movies = $that.props.data.map(function(movie) {
      return (
        <Movie
          key={movie.location_id}
          movie_title={movie.movie_title}
          release_year={movie.release_year}
          imdb_url={movie.imdb_url}
          plot={movie.plot}
          />
      );
    });
    return(
      <div className="movieList">
        {movies}
      </div>
    );
  }
}

export default MovieList;
