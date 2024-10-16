import React, { useEffect, useState } from 'react';
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';
import { useSelector } from 'react-redux';

const MainContainer = () => {
  const [movieIndex, setMovieIndex] = useState(0); 
  const movie = useSelector((store) => store.movie?.nowPlayingMovies);

  const selectedMovie = movie?.[movieIndex] || {};
  const { overview, id, title } = selectedMovie;

  useEffect(() => {
    if (!movie || movie.length === 0) return;

    // Interval to cycle through movies from 0 to movie.length - 1 and then start again from 0
    const interval = setInterval(() => {
      setMovieIndex((prevIndex) => (prevIndex + 1) % movie.length); 
    }, 5000); // Change movie every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }); 

  if (!id || !title || !overview) return null;

  return (
    <div>
      <VideoTitle title={title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
