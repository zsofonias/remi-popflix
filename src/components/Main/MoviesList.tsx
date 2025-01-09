import { Movie } from '../../interfaces/movie.interface';
import MoviesListItme from './MoviesListItem';

interface MoviesListProps {
  movies: Movie[];
  isWatched?: boolean;
}

function MoviesList({ movies, isWatched = false }: MoviesListProps) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <MoviesListItme
          key={movie.imdbID}
          isWatched={isWatched}
          movie={movie}
        />
      ))}
    </ul>
  );
}

export default MoviesList;
