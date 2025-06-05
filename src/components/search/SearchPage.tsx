"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Heart,
  LogOut,
  Search,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Dog as DogIcon,
  ListFilter,
  X,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import DogCard from "../dog/DogCard";
import { useSearch } from "@/hooks/useSearch";
import { useFilters } from "@/hooks/useFilters";
import { useFavorites } from "@/hooks/useFavorites";

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

  const handleFiltersChange = () => {
    const filters = getSearchParams();
    handleSearch(filters, 1);
  };

  const handleResetFilters = () => {
    resetFilters();
    handleSearch({ sort: "breed:asc", size: 25 }, 1);
  };

  const handleFavoriteChange = (dogId: string, isFavoriteNow: boolean) => {
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

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
      {Array.from({ length: 9 }).map((_, i) => (
        <Card key={i} className="rounded-none py-0 overflow-hidden shadow-none">
          <Skeleton className="aspect-square w-full" />
          <CardContent className="p-4 space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-20" />
            </div>
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
      ))}
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <div className="text-center py-16 space-y-4">
      <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
        <Search className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900">No dogs found</h3>
      <p className="text-gray-500 max-w-md mx-auto">
        Try adjusting your search filters to discover more adorable companions
        waiting for their forever home!
      </p>
    </div>
  );

  // Pagination component
  const Pagination = () => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
      const pages = [];
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, start + 4);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    };

    return (
      <div className="flex items-center justify-center gap-2 mt-8">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || loading}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        {getPageNumbers().map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "outline"}
            size="sm"
            onClick={() => handlePageChange(page)}
            disabled={loading}
            className={
              page === currentPage
                ? "bg-gradient-to-r from-blue-600 to-purple-600"
                : ""
            }
          >
            {page}
          </Button>
        ))}

        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || loading}
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    );
  };

  // Favorites section component
  const FavoritesSection = () => {
    if (favoriteCount === 0) {
      return (
        <div className="text-center">
          <Heart className="w-8 h-8 text-gray-300 mx-auto mb-2" />
          <p className="text-xs text-gray-500">
            Like some dogs to get started!
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span className="text-sm font-medium">
              Favorites ({favoriteCount})
            </span>
          </div>
          {favoriteCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFavorites}
              className="h-6 px-2 text-xs text-gray-500 hover:text-red-500"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          )}
        </div>
        
        <p className="text-xs text-gray-600">
          Ready to find your perfect match?
        </p>
        
        <Button
          onClick={handleGenerateMatch}
          disabled={isGeneratingMatch}
          size="sm"
          className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          {isGeneratingMatch ? "Finding Match..." : "Generate Match"}
        </Button>
      </div>
    );
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {/* Sidebar with Filters */}
        <Sidebar className="border-r">
          <SidebarHeader className="border-b px-6 py-4">
            <div className="flex items-center gap-2">
              <ListFilter className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold">Filters</h2>
            </div>
          </SidebarHeader>

          <SidebarContent className="px-6 py-4 space-y-6">
            {/* Breed Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-900">
                Breeds
              </Label>

              {/* Breed Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search breeds..."
                  value={breedSearch}
                  onChange={(e) => setBreedSearch(e.target.value)}
                  className="pl-10"
                  disabled={loading}
                />
              </div>

              {/* Selected Breeds */}
              {selectedBreeds.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-xs text-gray-500">Selected:</Label>
                  <div className="flex flex-wrap gap-2">
                    {selectedBreeds.map((breed) => (
                      <Badge
                        key={breed}
                        variant="secondary"
                        className="flex items-center gap-1 text-xs"
                      >
                        {breed}
                        <button
                          type="button"
                          className="ml-1 hover:text-red-500 focus:outline-none"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            removeBreed(breed);
                          }}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Breed Suggestions */}
              {breedSearch && filteredBreeds.length > 0 && (
                <div className="max-h-32 overflow-y-auto border rounded-md bg-white">
                  {filteredBreeds.slice(0, 8).map((breed) => (
                    <div
                      key={breed}
                      className="p-2 hover:bg-gray-50 cursor-pointer text-sm border-b last:border-b-0"
                      onClick={() => addBreed(breed)}
                    >
                      {breed}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Separator />

            {/* Age Range */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-900">
                Age Range
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="ageMin" className="text-xs text-gray-500">
                    Min
                  </Label>
                  <Input
                    id="ageMin"
                    type="number"
                    placeholder="0"
                    value={ageMin}
                    onChange={(e) => setAgeMin(e.target.value)}
                    disabled={loading}
                    min="0"
                    max="20"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="ageMax" className="text-xs text-gray-500">
                    Max
                  </Label>
                  <Input
                    id="ageMax"
                    type="number"
                    placeholder="20"
                    value={ageMax}
                    onChange={(e) => setAgeMax(e.target.value)}
                    disabled={loading}
                    min="0"
                    max="20"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Sort By */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-900">
                Sort By
              </Label>
              <Select
                value={sortBy}
                onValueChange={setSortBy}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breed:asc">Breed A-Z</SelectItem>
                  <SelectItem value="breed:desc">Breed Z-A</SelectItem>
                  <SelectItem value="name:asc">Name A-Z</SelectItem>
                  <SelectItem value="name:desc">Name Z-A</SelectItem>
                  <SelectItem value="age:asc">Age (Young first)</SelectItem>
                  <SelectItem value="age:desc">Age (Old first)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-4">
              <Button
                onClick={handleFiltersChange}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Search className="w-4 h-4 mr-2" />
                Search Dogs
              </Button>
              <Button
                variant="outline"
                onClick={handleResetFilters}
                disabled={loading}
                className="w-full"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </SidebarContent>

          {/* Favorites in Footer */}
          <SidebarFooter className="border-t px-6 py-4">
            <FavoritesSection />
          </SidebarFooter>
        </Sidebar>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
            <div className="flex items-center justify-between h-15 px-4">
              <div className="flex items-center gap-3">
                <SidebarTrigger />
                <div>
                  <h1 className="text-md font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Welcome back, {user?.name}!
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-4">
                {favoriteCount > 0 && (
                  <Button
                    onClick={handleGenerateMatch}
                    disabled={isGeneratingMatch}
                    size="sm"
                    className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
                  >
                    <Sparkles className="w-4 h-4 sm:mr-2" />
                    <span className="hidden sm:inline">
                      {isGeneratingMatch ? "Finding..." : "Match"}
                    </span>
                    <span className="ml-1">({favoriteCount})</span>
                  </Button>
                )}

                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
                
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <DogIcon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 p-6 overflow-auto bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Results Summary */}
            {hasSearched && !loading && (
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {totalResults > 0 ? (
                      <>Found {totalResults.toLocaleString()} adorable dogs</>
                    ) : (
                      <>No dogs found</>
                    )}
                  </h2>
                  {favoriteCount > 0 && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      <Heart className="w-3 h-3 fill-current" />
                      {favoriteCount} favorite{favoriteCount !== 1 ? "s" : ""}
                    </Badge>
                  )}
                </div>

                {totalPages > 1 && (
                  <p className="text-sm text-gray-500 hidden sm:block">
                    Page {currentPage} of {totalPages}
                  </p>
                )}
              </div>
            )}

            {/* Dogs Grid */}
            {loading ? (
              <LoadingSkeleton />
            ) : dogs.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
                  {dogs.map((dog) => (
                    <DogCard
                      key={dog.id}
                      dog={dog}
                      isFavorite={isFavorite(dog.id)}
                      onFavoriteChange={handleFavoriteChange}
                    />
                  ))}
                </div>
                <Pagination />
              </>
            ) : hasSearched ? (
              <EmptyState />
            ) : null}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}