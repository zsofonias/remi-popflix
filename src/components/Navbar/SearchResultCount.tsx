import { Movie } from '../../interfaces/movie.interface';

interface SearchResultCountProps {
  movies: Movie[];
}

function SearchResultCount({ movies }: SearchResultCountProps) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

export default SearchResultCount;
