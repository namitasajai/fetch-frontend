"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Heart,
  Search,
  Sparkles,
  ListFilter,
  X,
  RotateCcw,
  Trash2,
} from "lucide-react";

interface SearchFiltersProps {
  // Filter state
  selectedBreeds: string[];
  breedSearch: string;
  filteredBreeds: string[];
  ageMin: string;
  ageMax: string;
  sortBy: string;
  loading: boolean;
  
  // Filter actions
  setBreedSearch: (search: string) => void;
  addBreed: (breed: string) => void;
  removeBreed: (breed: string) => void;
  setAgeMin: (age: string) => void;
  setAgeMax: (age: string) => void;
  setSortBy: (sort: string) => void;
  onSearch: () => void;
  onReset: () => void;
  
  // Favorites state and actions
  favoriteCount: number;
  onGenerateMatch: () => void;
  onClearFavorites: () => void;
  isGeneratingMatch: boolean;
}

export default function SearchFilters({
  selectedBreeds,
  breedSearch,
  filteredBreeds,
  ageMin,
  ageMax,
  sortBy,
  loading,
  setBreedSearch,
  addBreed,
  removeBreed,
  setAgeMin,
  setAgeMax,
  setSortBy,
  onSearch,
  onReset,
  favoriteCount,
  onGenerateMatch,
  onClearFavorites,
  isGeneratingMatch,
}: SearchFiltersProps) {
  
  const FavoritesSection = () => {
    if (favoriteCount === 0) {
      return (
        <div className="text-center">
          <Heart className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-xs text-muted-foreground">
            Like some dogs to get started!
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-primary fill-current" />
            <span className="text-sm font-medium">
              Favorites ({favoriteCount})
            </span>
          </div>
          {favoriteCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFavorites}
              className="h-6 px-2 text-xs text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          )}
        </div>
        
        <p className="text-xs text-muted-foreground">
          Ready to find your perfect match?
        </p>
        
        <Button
          onClick={onGenerateMatch}
          disabled={isGeneratingMatch}
          size="sm"
          className="w-full bg-primary hover:bg-primary/90"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          {isGeneratingMatch ? "Finding Match..." : "Generate Match"}
        </Button>
      </div>
    );
  };

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <ListFilter className="w-5 h-5 text-primary" />
          <h2 className="text-md font-semibold">Filter & Sort</h2>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-6 py-4 space-y-6">
        {/* Breed Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">
            Breeds
          </Label>

          {/* Breed Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
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
              <Label className="text-xs text-muted-foreground">Selected:</Label>
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
                      className="ml-1 hover:text-destructive focus:outline-none"
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
            <div className="max-h-32 overflow-y-auto border rounded-md bg-card">
              {filteredBreeds.slice(0, 8).map((breed) => (
                <div
                  key={breed}
                  className="p-2 hover:bg-accent hover:text-accent-foreground cursor-pointer text-sm border-b last:border-b-0"
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
          <Label className="text-sm font-medium text-foreground">
            Age Range
          </Label>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="ageMin" className="text-xs text-muted-foreground">
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
              <Label htmlFor="ageMax" className="text-xs text-muted-foreground">
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
          <Label className="text-sm font-medium text-foreground">
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
            onClick={onSearch}
            disabled={loading}
            className="w-full"
          >
            <Search className="w-4 h-4 mr-2" />
            Search Dogs
          </Button>
          <Button
            variant="outline"
            onClick={onReset}
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
  );
}