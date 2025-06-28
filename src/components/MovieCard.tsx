'use client';

import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { type MovieSummary } from '@/types';
import { useFavorites } from '@/hooks/useFavorites';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';

interface MovieCardProps {
  movie: MovieSummary;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { addFavorite, removeFavorite, isFavorite, isLoaded } = useFavorites();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite(movie.imdbID)) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
    }
  };

  const posterSrc = movie.Poster !== 'N/A' ? movie.Poster : 'https://placehold.co/300x445/f3e5f5/673ab7?text=No+Image';

  return (
    <Card className="flex flex-col overflow-hidden h-full transition-all hover:shadow-lg hover:scale-105">
      <Link to={`/movie/${movie.imdbID}`} className="flex flex-col h-full">
        <CardHeader className="p-0 relative aspect-[2/3] w-full">
          <img
            src={posterSrc}
            alt={`Poster for ${movie.Title}`}
            className="object-cover w-full h-full"
          />
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="font-headline text-lg leading-tight">{movie.Title}</CardTitle>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <p className="text-sm text-muted-foreground">{movie.Year}</p>
          {isLoaded ? (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-muted-foreground hover:bg-destructive/20 hover:text-destructive"
              onClick={handleFavoriteClick}
              aria-label={isFavorite(movie.imdbID) ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={cn('h-5 w-5', isFavorite(movie.imdbID) && 'fill-current text-destructive')} />
            </Button>
          ) : (
            <Skeleton className="h-10 w-10 rounded-full" />
          )}
        </CardFooter>
      </Link>
    </Card>
  );
}
