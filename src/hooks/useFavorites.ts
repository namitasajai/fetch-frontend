import { useState, useCallback } from 'react';
import { api } from '@/services/api';
import { Dog } from '@/types';
import { toast } from 'sonner';

interface UseFavoritesReturn {
  // State
  favorites: Set<string>;
  favoriteCount: number;
  
  // Actions
  addToFavorites: (dogId: string, dogName?: string) => void;
  removeFromFavorites: (dogId: string, dogName?: string) => void;
  toggleFavorite: (dogId: string, dogName?: string) => void;
  clearFavorites: () => void;
  isFavorite: (dogId: string) => boolean;
  
  // Match generation
  generateMatch: () => Promise<Dog | null>;
  isGeneratingMatch: boolean;
}

export function useFavorites(): UseFavoritesReturn {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isGeneratingMatch, setIsGeneratingMatch] = useState(false);
  
  const favoriteCount = favorites.size;

  const addToFavorites = useCallback((dogId: string, dogName?: string) => {
    setFavorites(prev => new Set(prev).add(dogId));
    if (dogName) {
      toast.success(`Added ${dogName} to favorites! 💖`);
    }
  }, []);

  const removeFromFavorites = useCallback((dogId: string, dogName?: string) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      newSet.delete(dogId);
      return newSet;
    });
    if (dogName) {
      toast(`Removed ${dogName} from favorites`);
    }
  }, []);

  const toggleFavorite = useCallback((dogId: string, dogName?: string) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      const isCurrentlyFavorite = newSet.has(dogId);
      
      if (isCurrentlyFavorite) {
        newSet.delete(dogId);
      } else {
        newSet.add(dogId);
      }
      
      return newSet;
    });

    // Handle toast after state update to avoid duplicates
    const isCurrentlyFavorite = favorites.has(dogId);
    if (dogName) {
      if (isCurrentlyFavorite) {
        toast(`Removed ${dogName} from favorites`);
      } else {
        toast.success(`Added ${dogName} to favorites! 💖`);
      }
    }
  }, [favorites]);

  const clearFavorites = useCallback(() => {
    setFavorites(new Set());
    toast.success('Cleared all favorites');
  }, []);

  const isFavorite = useCallback((dogId: string) => {
    return favorites.has(dogId);
  }, [favorites]);

  const generateMatch = useCallback(async (): Promise<Dog | null> => {
    if (favorites.size === 0) {
      toast.error("Please add some dogs to your favorites first! 💖");
      return null;
    }

    setIsGeneratingMatch(true);
    toast.loading("Finding your perfect match...", { id: "match-loading" });

    try {
      const favoriteIds = Array.from(favorites);
      const matchResponse = await api.generateMatch(favoriteIds);

      const matchedDogs = await api.getDogs([matchResponse.match]);
      const matchedDog = matchedDogs[0];

      toast.success(`🎉 Perfect match found: ${matchedDog.name}!`, {
        id: "match-loading",
      });
      
      return matchedDog;
    } catch (err) {
      toast.error("Failed to generate match. Please try again.", {
        id: "match-loading",
      });
      console.error("Match error:", err);
      return null;
    } finally {
      setIsGeneratingMatch(false);
    }
  }, [favorites]);

  return {
    // State
    favorites,
    favoriteCount,
    
    // Actions
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    clearFavorites,
    isFavorite,
    
    // Match generation
    generateMatch,
    isGeneratingMatch,
  };
}