import { useEffect, useState } from 'react';
import ErrorMessage from '../ui/ErrorMessage';
import StarRating from '../ui/StarRating';
import { MovideDetails } from '../../interfaces/movie-details.interface';

interface MovieDetailsProps {
  movieId: string;
  onClose: () => void;
}

const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function MovieDetails({ movieId, onClose }: MovieDetailsProps) {
  const [movie, setMovie] = useState<MovideDetails | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
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
            imdbID: data.imdbId,
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
            <div className="rating">
              <StarRating
                size={24}
                maxRating={10}
                onRate={() => console.log('Rated')}
              />
            </div>
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
