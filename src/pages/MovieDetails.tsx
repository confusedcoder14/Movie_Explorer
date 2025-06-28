import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieDetails } from '@/lib/omdb';
import { Badge } from '@/components/ui/badge';
import DetailsFavoriteButton from '@/components/DetailsFavoriteButton';
import Spinner from '@/components/Spinner';
import type { MovieDetails } from '@/types';

export default function MovieDetailsPage() {
  const { imdbID } = useParams<{ imdbID: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!imdbID) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const movieData = await getMovieDetails(imdbID);
        setMovie(movieData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch movie details.';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [imdbID]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="text-center text-destructive py-10">
        <p className="text-xl">Error: {error || 'Movie not found'}</p>
        <Link to="/" className="text-primary hover:underline mt-4 inline-block">
          Back to Home
        </Link>
      </div>
    );
  }

  const posterSrc = movie.Poster !== 'N/A' ? movie.Poster : 'https://placehold.co/500x750/f3e5f5/673ab7?text=No+Image';

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        <div className="md:col-span-1">
          <img
            src={posterSrc}
            alt={`Poster for ${movie.Title}`}
            className="rounded-lg shadow-xl w-full"
          />
        </div>
        <div className="md:col-span-2 space-y-4">
          <div className="space-y-2">
             <div className="flex flex-wrap items-center gap-4">
               <h1 className="text-4xl font-headline font-bold">{movie.Title}</h1>
                <DetailsFavoriteButton movie={movie} />
             </div>
            <p className="text-lg text-muted-foreground">
              {movie.Year} &middot; {movie.Rated} &middot; {movie.Runtime}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {movie.Genre.split(', ').map((genre) => (
              <Badge key={genre} variant="secondary">{genre}</Badge>
            ))}
          </div>
          
          <div className="space-y-6 pt-4">
             <div className="space-y-1">
                <h2 className="font-semibold text-lg font-headline">Plot</h2>
                <p className="text-muted-foreground">{movie.Plot}</p>
            </div>
             <div className="space-y-1">
                <h2 className="font-semibold text-lg font-headline">Actors</h2>
                <p className="text-muted-foreground">{movie.Actors}</p>
            </div>
            <div className="space-y-1">
                <h2 className="font-semibold text-lg font-headline">Director</h2>
                <p className="text-muted-foreground">{movie.Director}</p>
            </div>
          </div>
          
          <div className="border-t pt-4 mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
            {movie.Ratings && movie.Ratings.map(rating => (
                <div key={rating.Source}>
                    <p className="font-semibold">{rating.Source}</p>
                    <p className="text-muted-foreground">{rating.Value}</p>
                </div>
            ))}
            <div>
                 <p className="font-semibold">IMDB Rating</p>
                 <p className="text-muted-foreground">{movie.imdbRating}/10 ({movie.imdbVotes} votes)</p>
            </div>
             <div>
                 <p className="font-semibold">Metascore</p>
                 <p className="text-muted-foreground">{movie.Metascore}</p>
            </div>
             <div>
                 <p className="font-semibold">Box Office</p>
                 <p className="text-muted-foreground">{movie.BoxOffice || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 