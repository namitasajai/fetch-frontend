import { useState, useEffect, useMemo } from 'react';
import { SearchParams } from '@/types';
import { api } from '@/services/api';

interface UseFiltersReturn {
  // Breed management
  breeds: string[];
  selectedBreeds: string[];
  breedSearch: string;
  filteredBreeds: string[];
  
  // Age filters
  ageMin: string;
  ageMax: string;
  
  // Sort options
  sortBy: string;
  
  // Actions
  setBreedSearch: (search: string) => void;
  addBreed: (breed: string) => void;
  removeBreed: (breed: string) => void;
  setAgeMin: (age: string) => void;
  setAgeMax: (age: string) => void;
  setSortBy: (sort: string) => void;
  
  // Filter operations
  getSearchParams: () => SearchParams;
  resetFilters: () => void;
  hasActiveFilters: boolean;
}

export function useFilters(): UseFiltersReturn {
  // Breed state
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [breedSearch, setBreedSearch] = useState("");
  
  // Age state
  const [ageMin, setAgeMin] = useState("");
  const [ageMax, setAgeMax] = useState("");
  
  // Sort state
  const [sortBy, setSortBy] = useState("breed:asc");

  // Fetch breeds on mount
  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const breedsList = await api.getBreeds();
        setBreeds(breedsList.sort());
      } catch (error) {
        console.error("Failed to fetch breeds:", error);
      }
    };
    fetchBreeds();
  }, []);

  // Computed filtered breeds
  const filteredBreeds = useMemo(() => {
    return breeds.filter(
      (breed) =>
        breed.toLowerCase().includes(breedSearch.toLowerCase()) &&
        !selectedBreeds.includes(breed)
    );
  }, [breeds, breedSearch, selectedBreeds]);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      selectedBreeds.length > 0 ||
      ageMin !== "" ||
      ageMax !== "" ||
      sortBy !== "breed:asc"
    );
  }, [selectedBreeds, ageMin, ageMax, sortBy]);

  // Breed management functions
  const addBreed = (breed: string) => {
    if (!selectedBreeds.includes(breed)) {
      setSelectedBreeds([...selectedBreeds, breed]);
    }
    setBreedSearch("");
  };

  const removeBreed = (breed: string) => {
    console.log('Removing breed:', breed); // Debug log
    setSelectedBreeds(prev => prev.filter((b) => b !== breed));
  };

  // Get current search parameters
  const getSearchParams = (): SearchParams => {
    return {
      breeds: selectedBreeds.length > 0 ? selectedBreeds : undefined,
      ageMin: ageMin ? parseInt(ageMin) : undefined,
      ageMax: ageMax ? parseInt(ageMax) : undefined,
      sort: sortBy,
      size: 25,
    };
  };

  // Reset all filters to default
  const resetFilters = () => {
    setSelectedBreeds([]);
    setAgeMin("");
    setAgeMax("");
    setSortBy("breed:asc");
    setBreedSearch("");
  };

  return {
    // Breed management
    breeds,
    selectedBreeds,
    breedSearch,
    filteredBreeds,
    
    // Age filters
    ageMin,
    ageMax,
    
    // Sort options
    sortBy,
    
    // Actions
    setBreedSearch,
    addBreed,
    removeBreed,
    setAgeMin,
    setAgeMax,
    setSortBy,
    
    // Filter operations
    getSearchParams,
    resetFilters,
    hasActiveFilters,
  };
}