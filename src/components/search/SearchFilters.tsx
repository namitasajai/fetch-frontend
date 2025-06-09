"use client";

import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { ListFilter } from "lucide-react";

import BreedFilter from "./filters/BreedFilter";
import AgeFilter from "./filters/AgeFilter";
import SortFilter from "./filters/SortFilter";
import LocationFilter from "./filters/LocationFilter";
import FilterActions from "./filters/FilterActions";
import FavoritesSection from "./filters/FavoritesSection";

interface SearchFiltersProps {
  selectedBreeds: string[];
  breedSearch: string;
  filteredBreeds: string[];
  ageMin: string;
  ageMax: string;
  sortBy: string;
  loading: boolean;
  showNearby: boolean;
  locationLoading: boolean;
  nearbyZipCodes: string[];

  setBreedSearch: (search: string) => void;
  addBreed: (breed: string) => void;
  removeBreed: (breed: string) => void;
  setAgeMin: (age: string) => void;
  setAgeMax: (age: string) => void;
  setSortBy: (sort: string) => void;
  onSearch: () => void;
  onReset: () => void;
  onToggleNearby: () => void;

  favoriteCount: number;
  isGeneratingMatch: boolean;
  onGenerateMatch: () => void;
  onClearFavorites: () => void;
}

export default function SearchFilters({
  selectedBreeds,
  breedSearch,
  filteredBreeds,
  ageMin,
  ageMax,
  sortBy,
  loading,
  showNearby,
  locationLoading,
  nearbyZipCodes,
  setBreedSearch,
  addBreed,
  removeBreed,
  setAgeMin,
  setAgeMax,
  setSortBy,
  onSearch,
  onReset,
  onToggleNearby,
  favoriteCount,
  onGenerateMatch,
  onClearFavorites,
  isGeneratingMatch,
}: SearchFiltersProps) {
  return (
    <Sidebar className="border-r" data-onboarding="filters">
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <ListFilter className="w-5 h-5 text-primary" />
          <h2 className="text-md font-medium">Filter & Sort</h2>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-6 py-4 space-y-3">
        <BreedFilter
          selectedBreeds={selectedBreeds}
          breedSearch={breedSearch}
          filteredBreeds={filteredBreeds}
          loading={loading}
          onBreedSearchChange={setBreedSearch}
          onAddBreed={addBreed}
          onRemoveBreed={removeBreed}
          onSearch={onSearch}
        />
        <Separator />
        <LocationFilter
          showNearby={showNearby}
          locationLoading={locationLoading}
          nearbyZipCodes={nearbyZipCodes}
          loading={loading}
          onToggleNearby={onToggleNearby}
        />
        <Separator />
        <AgeFilter
          ageMin={ageMin}
          ageMax={ageMax}
          loading={loading}
          onAgeMinChange={setAgeMin}
          onAgeMaxChange={setAgeMax}
        />
        <Separator />
        <SortFilter
          sortBy={sortBy}
          loading={loading}
          onSortChange={setSortBy}
        />
        <FilterActions
          loading={loading}
          onSearch={onSearch}
          onReset={onReset}
        />
      </SidebarContent>
      <SidebarFooter className="border-t px-6 py-4">
        <FavoritesSection
          favoriteCount={favoriteCount}
          isGeneratingMatch={isGeneratingMatch}
          onGenerateMatch={onGenerateMatch}
          onClearFavorites={onClearFavorites}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
