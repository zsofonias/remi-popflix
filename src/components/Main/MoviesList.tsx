import { Movie } from '../../interfaces/movie.interface';
import MoviesListItem from './MoviesListItem';

interface MoviesListProps {
  movies: Movie[];
  isWatched?: boolean;
  onMovieSelect: (id: string) => void;
}

function MoviesList({
  movies,
  onMovieSelect,
  isWatched = false,
}: MoviesListProps) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <MoviesListItem
          key={movie.imdbID}
          isWatched={isWatched}
          movie={movie}
          onClick={onMovieSelect}
        />
      ))}
    </ul>
  );
}

export default MoviesList;
