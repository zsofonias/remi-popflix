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
import { WatchedMovie } from './interfaces/watched-movie.interface';
import { Movie } from './interfaces/movie.interface';

const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [watchedMovies, setWatchedMovies] = useState<WatchedMovie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [query, setQuery] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>();

  useEffect(
    function () {
      const abortController = new AbortController();

      async function fetchMovies() {
        try {
          setErrorMsg('');
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${query}`,
            {
              signal: abortController.signal,
            }
          );

          if (!res.ok)
            throw new Error('Something went wrong with fetching movies');

          const data = await res.json();

          if (data.Response === 'False') throw new Error('Movie not found');

          setMovies(data.Search);
        } catch (err: any) {
          if (err.name !== 'AbortError') {
            console.log(err);
            setErrorMsg(err.message);
          }
        } finally {
          setIsLoading(false);
          setErrorMsg('');
        }
      }

      if (query.length < 2) {
        setMovies([]);
        setErrorMsg('');
        return;
      }

      // handleCloseMovieDetails();
      fetchMovies();

      return function () {
        abortController.abort();
      };
    },
    [query]
  );

  function handleOnMovieSelect(id: string) {
    setSelectedMovieId((curr) => (id === curr ? null : id));
  }

  function handleCloseMovieDetails() {
    setSelectedMovieId(null);
  }

  function handleAddWatched(movie: WatchedMovie) {
    setWatchedMovies((curr) => [...curr, movie]);
  }

  function handleRemoveWatched(id: string) {
    setWatchedMovies((curr) => curr.filter((movie) => movie.imdbID !== id));
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
            <MoviesList
              onMovieSelect={handleOnMovieSelect}
              onMovieRemove={() => null}
              movies={movies}
            />
          )}
          {errorMsg && <ErrorMessage message={errorMsg} />}
        </MoviesBox>
        <MoviesBox>
          {selectedMovieId && (
            <MovieDetails
              movieId={selectedMovieId}
              watchedMovies={watchedMovies}
              onClose={handleCloseMovieDetails}
              onAddWatched={handleAddWatched}
            />
          )}
          {!selectedMovieId && (
            <>
              <MoviesWatchedSummary watchedMovies={watchedMovies} />
              <MoviesList
                movies={watchedMovies}
                isWatched={true}
                onMovieSelect={() => null}
                onMovieRemove={handleRemoveWatched}
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
