'use client';

import { useState, useEffect, useCallback } from 'react';
import { type MovieSummary } from '@/types';

const FAVORITES_KEY = 'cinescope-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<MovieSummary[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(FAVORITES_KEY);
      if (item) {
        setFavorites(JSON.parse(item));
      }
    } catch (error) {
      console.error('Error reading from localStorage', error);
      setFavorites([]);
    }
    setIsLoaded(true);
  }, []);

  const saveFavorites = (items: MovieSummary[]) => {
    try {
      setFavorites(items);
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error writing to localStorage', error);
    }
  };

  const addFavorite = useCallback(
    (movie: MovieSummary) => {
      const newFavorites = [...favorites, movie];
      saveFavorites(newFavorites);
    },
    [favorites]
  );

  const removeFavorite = useCallback(
    (imdbID: string) => {
      const newFavorites = favorites.filter((fav) => fav.imdbID !== imdbID);
      saveFavorites(newFavorites);
    },
    [favorites]
  );

  const isFavorite = useCallback(
    (imdbID: string) => {
      return favorites.some((fav) => fav.imdbID === imdbID);
    },
    [favorites]
  );

  return { favorites, addFavorite, removeFavorite, isFavorite, isLoaded };
}
