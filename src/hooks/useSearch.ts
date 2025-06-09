import { useState, useEffect, useRef } from 'react';
import { Dog, SearchParams } from '@/types';
import { api } from '@/services/api';
import { toast } from 'sonner';

interface UseSearchReturn {
    dogs: Dog[];
    loading: boolean;
    error: string;
    totalResults: number;
    currentPage: number;
    searchParams: SearchParams;
    hasSearched: boolean;
    pageSize: number;
    totalPages: number;
    handleSearch: (params?: SearchParams, page?: number) => Promise<void>;
    handlePageChange: (page: number) => void;
    resetSearch: () => void;
    setError: (error: string) => void;
    scrollContainerRef: React.RefObject<HTMLElement>;
}

export function useSearch(): UseSearchReturn {
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [totalResults, setTotalResults] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams, setSearchParams] = useState<SearchParams>({
        sort: 'breed:asc',
        size: 25,
    });
    const [hasSearched, setHasSearched] = useState(false);

    const scrollContainerRef = useRef<HTMLElement>(null) as React.RefObject<HTMLElement>;
    const pageSize = 25;
    const totalPages = Math.ceil(totalResults / pageSize);

    // Initial Search (On-Mount)
    useEffect(() => {
        handleSearch();
    }, []);

    const handleSearch = async (params?: SearchParams, page: number = 1) => {
        setLoading(true);
        setError('');

        try {
            const searchParameters = params || searchParams;
            const from = page > 1 ? ((page - 1) * pageSize).toString() : undefined;

            const searchResponse = await api.searchDogs({
                ...searchParameters,
                from,
            });

            if (searchResponse.resultIds.length > 0) {
                const dogsData = await api.getDogs(searchResponse.resultIds);
                setDogs(dogsData);
            } else {
                setDogs([]);
            }

            setTotalResults(searchResponse.total);
            setCurrentPage(page);
            setHasSearched(true);

            if (params) {
                setSearchParams(params);
            }
        } catch (err) {
            console.error('Search error:', err);
            const errorMessage = 'Failed to search dogs. Please check your connection and try again.';
            setError(errorMessage);
            toast.error('Search failed');
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page: number) => {
        handleSearch(searchParams, page);

        setTimeout(() => {
            const resultsTop = document.getElementById('results-top');
            if (resultsTop) {
                resultsTop.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        }, 100); // Delay to ensure DOM is updated
    };

    const resetSearch = () => {
        const defaultParams: SearchParams = { sort: 'breed:asc', size: 25 };
        handleSearch(defaultParams, 1);
    };

    return {
        dogs,
        loading,
        error,
        totalResults,
        currentPage,
        searchParams,
        hasSearched,
        pageSize,
        totalPages,
        handleSearch,
        handlePageChange,
        resetSearch,
        setError,
        scrollContainerRef,
    };
}