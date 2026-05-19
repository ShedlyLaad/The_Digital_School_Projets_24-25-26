import React from 'react';
import MovieCard from './card';
import moviesData from './movies.json';

const Movies = () => {
  return (
    <div className="row">
      {moviesData.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default Movies;
