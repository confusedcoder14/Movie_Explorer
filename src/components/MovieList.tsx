import { type MovieSummary } from '@/types';
import MovieCard from './MovieCard';

interface MovieListProps {
  movies: MovieSummary[];
}

export default function MovieList({ movies }: MovieListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}
