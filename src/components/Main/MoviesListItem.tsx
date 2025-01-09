import { Movie } from '../../interfaces/movie.interface';
import { WatchedMovie } from '../../interfaces/watched-movie.interface';

interface MoviesListItmeProps {
  movie: Movie | WatchedMovie;
  isWatched?: boolean;
}

function isWatchedMovie(movie: Movie | WatchedMovie): movie is WatchedMovie {
  return (movie as WatchedMovie).runtime !== undefined; // Check for a property unique to WatchedMovie
}

function MoviesListItme({ movie, isWatched = false }: MoviesListItmeProps) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      {!isWatched && (
        <div>
          <p>
            <span>🗓</span>
            <span>{movie.Year}</span>
          </p>
        </div>
      )}

      {isWatched && isWatchedMovie(movie) && (
        <div>
          <p>
            <span>⭐️</span>
            <span>{movie.imdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{movie.userRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{movie.runtime} min</span>
          </p>
        </div>
      )}
    </li>
  );
}

export default MoviesListItme;
