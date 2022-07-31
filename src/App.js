import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MoviesList from "./components/MoviesList";
import MoviesListHeading from "./components/MoviesListHeading";
import Search from "./components/Search";
import MoveToFavourites from "./components/MoveToFavourites";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [favourites, setFavourites] = useState([]);

  const getMovieRequest = async () => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=ff9cb379`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MoviesListHeading heading="Movies" />
        <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <MoviesList movies={movies} favouriteComponent={MoveToFavourites} handleFavouritesClick={addFavouriteMovie} />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
      <MoviesListHeading heading='Favourites' />
      </div>
      <div className='row'>
      <MoviesList movies={favourites} favouriteComponent={MoveToFavourites} />
      </div>
    </div>
  );
};

export default App;
