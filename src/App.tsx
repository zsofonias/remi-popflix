import { useEffect, useState } from 'react';

import NavBar from './components/Navbar';
import Main from './components/Main';
import Search from './components/Navbar/Search';
import SearchResultCount from './components/Navbar/SearchResultCount';
import MoviesBox from './components/Main/MoviesBox';
import MoviesList from './components/Main/MoviesList';
import MoviesWatchedSummary from './components/Main/MoviesWatchedSummary';
import MovieDetails from './components/Main/MovieDetails';
import ErrorMessage from './components/ui/ErrorMessage';

const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function App() {
  const [movies, setMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [query, setQuery] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>();

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setErrorMsg('');
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${query}`
          );

          if (!res.ok)
            throw new Error('Something went wrong with fetching movies');

          const data = await res.json();

          if (data.Response === 'False') throw new Error('Movie not found');

          setMovies(data.Search);
        } catch (err) {
          if (err instanceof Error) setErrorMsg(err.message);
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 2) {
        setMovies([]);
        setErrorMsg('');
        return;
      }

      fetchMovies();
    },
    [query]
  );

  // function handleOnQueryInput(value: string) {
  //   setQuery(value);
  // }

  function handleOnMovieSelect(id: string) {
    setSelectedMovieId((curr) => (id === curr ? null : id));
  }

  function handleCloseMovieDetails() {
    setSelectedMovieId(null);
  }

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <SearchResultCount movies={movies} />
      </NavBar>
      <Main>
        <MoviesBox>
          {/* {isLoading ? <Loader /> : <MoviesList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !errorMsg && (
            <MoviesList onMovieSelect={handleOnMovieSelect} movies={movies} />
          )}
          {errorMsg && <ErrorMessage message={errorMsg} />}
        </MoviesBox>
        <MoviesBox>
          {selectedMovieId && (
            <MovieDetails
              movieId={selectedMovieId}
              onClose={handleCloseMovieDetails}
            />
          )}
          {!selectedMovieId && (
            <>
              <MoviesWatchedSummary watchedMovies={watchedMovies} />
              <MoviesList
                movies={watchedMovies}
                isWatched={true}
                onMovieSelect={handleOnMovieSelect}
              />
            </>
          )}
        </MoviesBox>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

export default App;
