import { Movie } from '../../interfaces/movie.interface';
import { WatchedMovie } from '../../interfaces/watched-movie.interface';

interface MoviesListItmeProps {
  movie: Movie | WatchedMovie;
  isWatched?: boolean;
  onClick: (id: string) => void;
  onRemove: (id: string) => void;
}

function isWatchedMovie(movie: Movie | WatchedMovie): movie is WatchedMovie {
  return (movie as WatchedMovie).userRating !== undefined; // Check for a property unique to WatchedMovie
}

function MoviesListItme({
  movie,
  onClick,
  onRemove,
  isWatched = false,
}: MoviesListItmeProps) {
  return (
    <li onClick={() => onClick(movie.imdbID)}>
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
            <span>{movie.Runtime}</span>
          </p>
          <button className="btn-delete" onClick={() => onRemove(movie.imdbID)}>
            X
          </button>
        </div>
      )}
    </li>
  );
}

export default MoviesListItme;
