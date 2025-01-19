import { useEffect, useState } from 'react';
import { Movie } from '../../interfaces/movie.interface';

const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;

interface IUseMoviesParams {
  query: string;
}

export function useMovies({ query }: IUseMoviesParams) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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

      //   handleCloseMovieDetails?.();
      fetchMovies();

      return function () {
        abortController.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, errorMsg };
}
