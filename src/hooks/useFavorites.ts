import { useState, useCallback } from 'react';
import { api } from '@/services/api';
import { Dog } from '@/types';
import { toast } from 'sonner';

interface UseFavoritesReturn {
    favorites: Set<string>;
    favoriteCount: number;
    toggleFavorite: (dogId: string, dogName?: string) => void;
    clearFavorites: () => void;
    isFavorite: (dogId: string) => boolean;
    generateMatch: () => Promise<void>;
    isGeneratingMatch: boolean;
    matchedDog: Dog | null;
    isMatchDialogOpen: boolean;
    openMatchDialog: (dog: Dog) => void;
    closeMatchDialog: () => void;
}

export function useFavorites(): UseFavoritesReturn {
    const [favorites, setFavorites] = useState<Set<string>>(new Set());
    const [isGeneratingMatch, setIsGeneratingMatch] = useState(false);
    const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
    const [isMatchDialogOpen, setIsMatchDialogOpen] = useState(false);

    const favoriteCount = favorites.size;

    const updateFavorites = (dogId: string, action: 'add' | 'remove', dogName?: string) => {
        setFavorites(prev => {
            const newSet = new Set(prev);
            if (action === 'add') {
                newSet.add(dogId);
            } else {
                newSet.delete(dogId);
            }
            return newSet;
        });

        if (dogName) {
            const message = action === 'add'
                ? `Added ${dogName} to favorites`
                : `Removed ${dogName} from favorites`;
            toast.success(message);
        }
    };

    const toggleFavorite = useCallback((dogId: string, dogName?: string) => {
        const isCurrentlyFavorite = favorites.has(dogId);
        const action = isCurrentlyFavorite ? 'remove' : 'add';
        updateFavorites(dogId, action, dogName);
    }, [favorites]);

    const clearFavorites = useCallback(() => {
        setFavorites(new Set());
        toast.success('Cleared all favorites');
    }, []);

    const isFavorite = useCallback((dogId: string) => {
        return favorites.has(dogId);
    }, [favorites]);

    const openMatchDialog = useCallback((dog: Dog) => {
        setMatchedDog(dog);
        setIsMatchDialogOpen(true);
    }, []);

    const closeMatchDialog = useCallback(() => {
        setIsMatchDialogOpen(false);
        setMatchedDog(null);
    }, []);

    const generateMatch = useCallback(async (): Promise<void> => {
        if (favorites.size === 0) {
            toast.error("Please add some dogs to your favorites first!");
            return;
        }

        setIsGeneratingMatch(true);
        toast.loading("Finding your perfect match...", { id: "match-loading" });

        try {
            const favoriteIds = Array.from(favorites);
            const matchResponse = await api.generateMatch(favoriteIds);
            const matchedDogs = await api.getDogs([matchResponse.match]);
            const matchedDog = matchedDogs[0];
            toast.dismiss("match-loading");
            openMatchDialog(matchedDog);
        } catch (err) {
            console.error("Match error:", err);
            toast.error("Failed to generate match. Please try again.", {
                id: "match-loading",
            });
        } finally {
            setIsGeneratingMatch(false);
        }
    }, [favorites, openMatchDialog]);

    return {
        favorites,
        favoriteCount,
        toggleFavorite,
        clearFavorites,
        isFavorite,
        generateMatch,
        isGeneratingMatch,
        matchedDog,
        isMatchDialogOpen,
        openMatchDialog,
        closeMatchDialog,
    };
}