import { useEffect, useRef, useState } from 'react';
import ErrorMessage from '../ui/ErrorMessage';
import StarRating from '../ui/StarRating';
import { MovideDetails } from '../../interfaces/movie-details.interface';
import { WatchedMovie } from '../../interfaces/watched-movie.interface';
import { useKeydownListener } from '../hooks/useKeydownListener';

interface MovieDetailsProps {
  movieId: string;
  watchedMovies: WatchedMovie[];
  onClose: () => void;
  onAddWatched: (movie: WatchedMovie) => void;
}

const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function MovieDetails({
  movieId,
  watchedMovies = [],
  onClose,
  onAddWatched,
}: MovieDetailsProps) {
  const [movie, setMovie] = useState<MovideDetails | undefined>();
  const [userRating, setUserRating] = useState<number | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [errorMsgTwo, setErrorMsgTwo] = useState('');

  const isMovieWatched = watchedMovies
    .map((watchedMovie) => watchedMovie.imdbID)
    .includes(movieId);

  const isUserRated = Boolean(userRating && userRating > 0);
  const watchedMovieRating = watchedMovies.find(
    (wm) => wm.imdbID === movieId
  )?.userRating;

  const countRef = useRef(0);

  useEffect(() => {
    if (userRating) countRef.current += 1;
  }, [userRating]);

  /**
   * fetch movie details
   */
  useEffect(
    function () {
      async function fetchMovieDetails() {
        try {
          setIsLoading(true);
          setErrorMsg('');
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${movieId}`
          );

          if (!res.ok)
            throw new Error('Something went wrong with fetching movies');

          const data = await res.json();

          if (data.Response === 'False') throw new Error('Movie not found');

          const movieData: MovideDetails = {
            imdbID: data.imdbID,
            Title: data.Title,
            Year: data.Year,
            Plot: data.Plot,
            Awards: data.Awards,
            Director: data.Director,
            Actors: data.Actors,
            Genre: data.Genre,
            Poster: data.Poster,
            Ratings: data.Ratings,
            Writer: data.Writer,
            imdbRating: data.imdbRating,
            Released: data.Released,
            Runtime: data.Runtime,
            runTime: Number(data.Runtime.split(' ')[0]),
          };

          setMovie(movieData);
        } catch (err) {
          if (err instanceof Error) setErrorMsg(err.message);
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      }

      fetchMovieDetails();
    },
    [movieId]
  );

  /**
   * Change Document Title
   */
  useEffect(
    function () {
      if (!movie?.Title) return;
      document.title = `Popflix: ${movie.Title}`;

      return function () {
        document.title = 'Popflix';
      };
    },
    [movie?.Title]
  );

  /**
   * Listen for keydown event
   */
  // useEffect(
  //   function () {
  //     function callback(e: KeyboardEvent) {
  //       if (e.code === 'Escape') {
  //         onClose();
  //       }
  //     }
  //     document.addEventListener('keydown', callback);

  //     return () => {
  //       document.removeEventListener('keydown', callback);
  //     };
  //   },
  //   [onClose]
  // );
  useKeydownListener({ key: 'Escape', action: onClose });

  function handleAdd(movie: MovideDetails) {
    if (!userRating) {
      setTimeout(() => {
        setErrorMsgTwo('');
      }, 3000);
      return setErrorMsgTwo(
        'You are required to rate the movie before adding to list'
      );
    }
    const watchedMovie: WatchedMovie = { ...movie, userRating };
    onAddWatched(watchedMovie);
    onClose();
  }
  return (
    <div className="details">
      {isLoading && <p className="loader">Loading...</p>}
      {errorMsg && <ErrorMessage message={errorMsg} />}
      {!isLoading && !errorMsg && movie && (
        <>
          <header>
            <button className="btn-back" onClick={onClose}>
              &larr;
            </button>

            <img src={movie.Poster} alt={`${movie.Title} movie poster`} />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐️</span>
                {movie.imdbRating} IMDB Rating
              </p>
            </div>
          </header>

          <section>
            {errorMsgTwo && <ErrorMessage message={errorMsgTwo} />}
            {!isMovieWatched ? (
              <div className="rating">
                <StarRating size={24} maxRating={10} onRate={setUserRating} />

                {isUserRated && (
                  <button className="btn-add" onClick={() => handleAdd(movie)}>
                    {' '}
                    Add to list
                  </button>
                )}
              </div>
            ) : (
              <p>
                You have rated this movie {watchedMovieRating} <span>🌟</span>
              </p>
            )}
            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>Starring {movie.Actors}</p>
            <p>Directed by {movie.Director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
