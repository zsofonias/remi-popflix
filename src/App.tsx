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
import { useMovies } from './components/hooks/useMovies';
import { useLocalStorageState } from './components/hooks/useLocalStorageState';

function App() {
  const [query, setQuery] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>();

  const { movies, isLoading, errorMsg } = useMovies({
    query,
  });

  // // const [watchedMovies, setWatchedMovies] = useState<WatchedMovie[]>([]);
  // const [watchedMovies, setWatchedMovies] = useState<WatchedMovie[]>(() => {
  //   const storedValue = localStorage.getItem('watched-movies') || '[]';
  //   return JSON.parse(storedValue);
  // });
  const [watchedMovies, setWatchedMovies] = useLocalStorageState<
    WatchedMovie[]
  >({
    initialState: [],
    key: 'watched-movies',
  });

  /**
   * Save updated watched movies to local storage
   */
  useEffect(() => {
    localStorage.setItem('watched-movies', JSON.stringify(watchedMovies));
  }, [watchedMovies]);

  function handleOnMovieSelect(id: string) {
    setSelectedMovieId((curr) => (id === curr ? null : id));
  }

  function handleCloseMovieDetails() {
    setSelectedMovieId(null);
  }

  function handleAddWatched(movie: WatchedMovie) {
    setWatchedMovies((curr) => [...curr, movie]);

    // localStorage.setItem(
    //   'watched-movies',
    //   JSON.stringify([...watchedMovies, movie])
    // );
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
