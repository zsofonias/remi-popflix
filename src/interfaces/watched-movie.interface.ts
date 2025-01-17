import { MovideDetails } from './movie-details.interface';
import { Movie } from './movie.interface';

export interface WatchedMovie extends Movie, MovideDetails {
  userRating: number;
}
