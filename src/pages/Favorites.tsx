import { useFavorites } from '@/hooks/useFavorites';
import MovieList from '@/components/MovieList';
import Spinner from '@/components/Spinner';

export default function FavoritesPage() {
  const { favorites, isLoaded } = useFavorites();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-headline font-bold text-center">Your Favorite Movies</h1>
      {!isLoaded ? (
        <div className="flex justify-center items-center h-64">
          <Spinner />
        </div>
      ) : favorites.length > 0 ? (
        <MovieList movies={favorites} />
      ) : (
        <div className="text-center text-muted-foreground py-10">
          <p>You haven't added any favorites yet.</p>
          <p>Click the heart icon on a movie to save it here.</p>
        </div>
      )}
    </div>
  );
} 