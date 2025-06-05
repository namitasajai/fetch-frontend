"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useSearch } from "@/hooks/useSearch";
import { useFilters } from "@/hooks/useFilters";
import { useFavorites } from "@/hooks/useFavorites";
import SearchHeader from "./SearchHeader";
import SearchFilters from "./SearchFilters";
import SearchResults from "./SearchResults";

export default function SearchPage() {
  const { user, logout } = useAuth();
  
  // Use custom hooks
  const {
    dogs,
    loading,
    error,
    totalResults,
    currentPage,
    hasSearched,
    totalPages,
    handleSearch,
    handlePageChange
  } = useSearch();

  const {
    selectedBreeds,
    breedSearch,
    filteredBreeds,
    ageMin,
    ageMax,
    sortBy,
    setBreedSearch,
    addBreed,
    removeBreed,
    setAgeMin,
    setAgeMax,
    setSortBy,
    getSearchParams,
    resetFilters
  } = useFilters();

  const {
    favoriteCount,
    isFavorite,
    toggleFavorite,
    generateMatch,
    isGeneratingMatch,
    clearFavorites
  } = useFavorites();

  // Event handlers
  const handleFiltersChange = () => {
    const filters = getSearchParams();
    handleSearch(filters, 1);
  };

  const handleResetFilters = () => {
    resetFilters();
    handleSearch({ sort: "breed:asc", size: 25 }, 1);
  };

  const handleFavoriteChange = (dogId: string) => {
    const dog = dogs.find(d => d.id === dogId);
    toggleFavorite(dogId, dog?.name);
  };

  const handleGenerateMatch = async () => {
    await generateMatch();
  };

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {/* Sidebar with Filters */}
        <SearchFilters
          selectedBreeds={selectedBreeds}
          breedSearch={breedSearch}
          filteredBreeds={filteredBreeds}
          ageMin={ageMin}
          ageMax={ageMax}
          sortBy={sortBy}
          loading={loading}
          setBreedSearch={setBreedSearch}
          addBreed={addBreed}
          removeBreed={removeBreed}
          setAgeMin={setAgeMin}
          setAgeMax={setAgeMax}
          setSortBy={setSortBy}
          onSearch={handleFiltersChange}
          onReset={handleResetFilters}
          favoriteCount={favoriteCount}
          onGenerateMatch={handleGenerateMatch}
          onClearFavorites={clearFavorites}
          isGeneratingMatch={isGeneratingMatch}
        />

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <SearchHeader
            userName={user?.name}
            favoriteCount={favoriteCount}
            onGenerateMatch={handleGenerateMatch}
            onLogout={handleLogout}
            isGeneratingMatch={isGeneratingMatch}
          />

          {/* Search Results with integrated pagination */}
          <SearchResults
            dogs={dogs}
            loading={loading}
            error={error}
            hasSearched={hasSearched}
            totalResults={totalResults}
            currentPage={currentPage}
            totalPages={totalPages}
            favoriteCount={favoriteCount}
            onFavoriteChange={handleFavoriteChange}
            isFavorite={isFavorite}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </SidebarProvider>
  );
}