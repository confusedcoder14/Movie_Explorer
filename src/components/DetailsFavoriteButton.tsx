import { Heart } from 'lucide-react';
import { type MovieDetails } from '@/types';
import { useFavorites } from '@/hooks/useFavorites';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DetailsFavoriteButtonProps {
    movie: MovieDetails;
}

export default function DetailsFavoriteButton({ movie }: DetailsFavoriteButtonProps) {
    const { addFavorite, removeFavorite, isFavorite, isLoaded } = useFavorites();

    const handleClick = () => {
        if (isFavorite(movie.imdbID)) {
            removeFavorite(movie.imdbID);
        } else {
            addFavorite(movie);
        }
    };
    
    if(!isLoaded) {
        return <div className="w-10 h-10 bg-muted animate-pulse rounded-full" />
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-muted-foreground hover:bg-destructive/20 hover:text-destructive"
            onClick={handleClick}
            aria-label={isFavorite(movie.imdbID) ? 'Remove from favorites' : 'Add to favorites'}
        >
            <Heart className={cn('h-6 w-6', isFavorite(movie.imdbID) && 'fill-current text-destructive')} />
        </Button>
    );
}
