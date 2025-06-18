import { useState, useEffect, useMemo } from 'react';
import { SearchParams } from '@/types';
import { api } from '@/services/api';
import { toast } from 'sonner';

interface UseFiltersReturn {
    breeds: string[];
    selectedBreeds: string[];
    breedSearch: string;
    filteredBreeds: string[]; // excludes selected
    ageMin: string;
    ageMax: string;
    sortBy: string;
    showNearby: boolean;
    locationLoading: boolean;
    nearbyZipCodes: string[];
    setBreedSearch: (search: string) => void;
    addBreed: (breed: string) => void;
    removeBreed: (breed: string) => void;
    setAgeMin: (age: string) => void;
    setAgeMax: (age: string) => void;
    setSortBy: (sort: string) => void;
    toggleNearby: (onComplete?: (zipCodes?: string[]) => void) => Promise<void>;
    getSearchParams: () => SearchParams;
    resetFilters: () => void;
}

export function useFilters(): UseFiltersReturn {
    const [breeds, setBreeds] = useState<string[]>([]);
    const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
    const [breedSearch, setBreedSearch] = useState("");
    const [ageMin, setAgeMin] = useState("");
    const [ageMax, setAgeMax] = useState("");
    const [sortBy, setSortBy] = useState("breed:asc");
    const [showNearby, setShowNearby] = useState(false);
    const [locationLoading, setLocationLoading] = useState(false);
    const [nearbyZipCodes, setNearbyZipCodes] = useState<string[]>([]);

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

    // Get user location and find nearby zip codes
    const getUserLocation = (): Promise<{ lat: number; lon: number }> => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported'));
                return;
            }
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    });
                },
                (error) => {
                    reject(error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 300000, // 5 minutes
                }
            );
        });
    };

    const findNearbyZipCodes = async (lat: number, lon: number): Promise<string[]> => {
        try {
            // Search within roughly 25 mile radius
            const radius = 0.5; // degrees (roughly 25-30 miles)

            const locationSearch = await api.searchLocations({
                geoBoundingBox: {
                    top: lat + radius,
                    bottom: lat - radius,
                    left: lon - radius,
                    right: lon + radius,
                },
                size: 100, // Get up to 100 nearby zip codes
            });

            return locationSearch.results.map(location => location.zip_code);
        } catch (error) {
            console.error('Failed to search locations:', error);
            throw error;
        }
    };

    const toggleNearby = async (onComplete?: (zipCodes?: string[]) => void) => {
        const isCurrentlyNearby = showNearby;

        // If already showing nearby, reset filters
        if (isCurrentlyNearby) {
            setShowNearby(false);
            setNearbyZipCodes([]);
            toast.success("Showing all dogs");
            // Pass empty array as zipcodes array for filter
            onComplete?.([]);
            return;
        }
        // Otherwise, fetch nearby zip codes
        setLocationLoading(true);
        try {
            const location = await getUserLocation();
            const zipCodes = await findNearbyZipCodes(location.lat, location.lon);
            if (zipCodes.length === 0) {
                toast.error("No nearby locations found");
                setLocationLoading(false);
                return;
            }
            setNearbyZipCodes(zipCodes);
            setShowNearby(true);
            toast.success(`Showing dogs near you (${zipCodes.length} areas)`);
            onComplete?.(zipCodes);
        } catch (error) {
            console.error('Location error:', error);
            if (error instanceof GeolocationPositionError) {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        toast.error("Location access denied. Please enable location permissions.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        toast.error("Location unavailable. Please try again.");
                        break;
                    case error.TIMEOUT:
                        toast.error("Location request timed out. Please try again.");
                        break;
                    default:
                        toast.error("Failed to get location. Please try again.");
                }
            } else {
                toast.error("Failed to find nearby dogs. Please try again.");
            }
        } finally {
            setLocationLoading(false);
        }
    };

    const filteredBreeds = useMemo(() => {
        return breeds.filter(
            (breed) =>
                breed.toLowerCase().includes(breedSearch.toLowerCase()) &&
                !selectedBreeds.includes(breed)
        );
    }, [breeds, breedSearch, selectedBreeds]);

    const addBreed = (breed: string) => {
        if (!selectedBreeds.includes(breed)) {
            setSelectedBreeds([...selectedBreeds, breed]);
        }
        setBreedSearch("");
    };

    const removeBreed = (breed: string) => {
        setSelectedBreeds(prev => prev.filter((b) => b !== breed));
    };

    const getSearchParams = (): SearchParams => {
        return {
            breeds: selectedBreeds.length > 0 ? selectedBreeds : undefined,
            zipCodes: showNearby && nearbyZipCodes.length > 0 ? nearbyZipCodes : undefined,
            ageMin: ageMin ? parseInt(ageMin) : undefined,
            ageMax: ageMax ? parseInt(ageMax) : undefined,
            sort: sortBy,
            size: 25,
        };
    };

    const resetFilters = () => {
        setSelectedBreeds([]);
        setAgeMin("");
        setAgeMax("");
        setSortBy("breed:asc");
        setBreedSearch("");
        setShowNearby(false);
        setNearbyZipCodes([]);
    };

    return {
        breeds,
        selectedBreeds,
        breedSearch,
        filteredBreeds,
        ageMin,
        ageMax,
        sortBy,
        showNearby,
        locationLoading,
        nearbyZipCodes,
        setBreedSearch,
        addBreed,
        removeBreed,
        setAgeMin,
        setAgeMax,
        setSortBy,
        toggleNearby,
        getSearchParams,
        resetFilters,
    };
}