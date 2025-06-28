import { useState, useCallback } from 'react';
import { type MovieSummary } from '@/types';
import { searchMovies } from '@/lib/omdb';
import SearchBar from '@/components/SearchBar';
import MovieList from '@/components/MovieList';
import Pagination from '@/components/Pagination';
import Spinner from '@/components/Spinner';

export default function Home() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<MovieSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);

  const handleSearch = useCallback(async (searchQuery: string, searchPage: number = 1) => {
    if (!searchQuery.trim()) {
      setMovies([]);
      setTotalResults(0);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    setPage(searchPage);

    try {
      const result = await searchMovies(searchQuery, searchPage);
      if (result.Response === 'True') {
        setMovies(result.Search);
        setTotalResults(parseInt(result.totalResults, 10));
      } else {
        setMovies([]);
        setTotalResults(0);
        setError(result.Error || 'An unknown error occurred.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch movies.';
      setError(errorMessage);
      setMovies([]);
      setTotalResults(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handlePageChange = (newPage: number) => {
    handleSearch(query, newPage);
  };

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div className="space-y-8">
      <SearchBar
        query={query}
        setQuery={setQuery}
        onSearch={() => handleSearch(query)}
      />
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner />
        </div>
      ) : error ? (
        <div className="text-center text-destructive py-10">
          <p className="text-xl">Error: {error}</p>
          <p>Please try another search.</p>
        </div>
      ) : movies.length > 0 ? (
        <>
          <MovieList movies={movies} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <div className="text-center text-muted-foreground py-10">
          <p className="text-2xl font-headline mb-2">Welcome to Movie Explorer</p>
          <p>Search for a movie to get started.</p>
        </div>
      )}
    </div>
  );
} 
