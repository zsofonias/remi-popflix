import { Movie } from './movie.interface';

type Rating = {
  Source: string;
  Value: string;
};

export interface MovideDetails extends Movie {
  Actors: string[];
  Awards: string;
  Director: string;
  Genre: string;
  Plot: string;
  Ratings: Rating[];
  Released: string;
  Writer: string;
  Runtime: string;
  runTime: number;
  imdbRating: number;
}
