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
import MatchDialog from "./MatchDialog";

export default function SearchPage() {
  const { user, logout } = useAuth();
  
  const {
    dogs,
    loading,
    error,
    totalResults,
    currentPage,
    hasSearched,
    totalPages,
    handleSearch,
    handlePageChange,
    scrollContainerRef
  } = useSearch();

  const {
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
    resetFilters
  } = useFilters();

  const {
    favoriteCount,
    isFavorite,
    toggleFavorite,
    generateMatch,
    isGeneratingMatch,
    clearFavorites,
    matchedDog,
    isMatchDialogOpen,
    closeMatchDialog
  } = useFavorites();

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

  const handleToggleNearby = async () => {
    const wasNearbyOn = showNearby;
    
    if (wasNearbyOn) {
      await toggleNearby();
      const filters = {
        ...getSearchParams(),
        zipCodes: undefined
      };
      handleSearch(filters, 1);
    } else {
      await toggleNearby((zipCodes?: string[]) => {
        if (zipCodes && zipCodes.length > 0) {
          const filters = {
            ...getSearchParams(),
            zipCodes: zipCodes
          };
          handleSearch(filters, 1);
        }
      });
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <SearchFilters
          selectedBreeds={selectedBreeds}
          breedSearch={breedSearch}
          filteredBreeds={filteredBreeds}
          ageMin={ageMin}
          ageMax={ageMax}
          sortBy={sortBy}
          loading={loading}
          showNearby={showNearby}
          locationLoading={locationLoading}
          nearbyZipCodes={nearbyZipCodes}
          setBreedSearch={setBreedSearch}
          addBreed={addBreed}
          removeBreed={removeBreed}
          setAgeMin={setAgeMin}
          setAgeMax={setAgeMax}
          setSortBy={setSortBy}
          onSearch={handleFiltersChange}
          onReset={handleResetFilters}
          onToggleNearby={handleToggleNearby}
          favoriteCount={favoriteCount}
          onGenerateMatch={handleGenerateMatch}
          onClearFavorites={clearFavorites}
          isGeneratingMatch={isGeneratingMatch}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <SearchHeader
            userName={user?.name}
            favoriteCount={favoriteCount}
            onGenerateMatch={handleGenerateMatch}
            onLogout={handleLogout}
            isGeneratingMatch={isGeneratingMatch}
          />

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
            scrollContainerRef={scrollContainerRef}
          />
        </div>

        <MatchDialog
          isOpen={isMatchDialogOpen}
          onClose={closeMatchDialog}
          matchedDog={matchedDog}
        />
      </div>
    </SidebarProvider>
  );
}