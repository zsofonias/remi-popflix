import { Movie } from './movie.interface';

export interface WatchedMovie extends Movie {
  runtime: number;
  imdbRating: number;
  userRating: number;
}
