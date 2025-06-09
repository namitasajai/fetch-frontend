"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";

interface BreedFilterProps {
  selectedBreeds: string[];
  breedSearch: string;
  filteredBreeds: string[];
  loading: boolean;
  onBreedSearchChange: (search: string) => void;
  onAddBreed: (breed: string) => void;
  onRemoveBreed: (breed: string) => void;
  onSearch?: () => void;
}

export default function BreedFilter({
  selectedBreeds,
  breedSearch,
  filteredBreeds,
  loading,
  onBreedSearchChange,
  onAddBreed,
  onRemoveBreed,
  onSearch,
}: BreedFilterProps) {
  const handleBreedSelect = (breed: string) => {
    onAddBreed(breed);
    onBreedSearchChange("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      // If there's a search term and filtered results, select the first one
      if (breedSearch && filteredBreeds.length > 0) {
        handleBreedSelect(filteredBreeds[0]);
      } else if (onSearch) {
        // Otherwise trigger the search
        onSearch();
      }
    }
  };

  // Show filtered breeds when searching
  const displayBreeds = breedSearch ? filteredBreeds : [];

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium text-foreground">Search</Label>

      {/* Input */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search a breed..."
            value={breedSearch}
            onChange={(e) => onBreedSearchChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-10 pr-10"
            disabled={loading}
          />
        </div>

        {/* Results List */}
        {displayBreeds.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-popover border rounded-md shadow-lg max-h-48 overflow-y-auto">
            {displayBreeds.map((breed) => (
              <button
                key={breed}
                type="button"
                className="w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none first:rounded-t-md last:rounded-b-md"
                onClick={() => handleBreedSelect(breed)}
                disabled={loading}
              >
                {breed}
              </button>
            ))}
          </div>
        )}

        {/* If no results exist */}
        {breedSearch && filteredBreeds.length === 0 && (
          <div className="absolute z-50 w-full mt-1 bg-popover border rounded-md shadow-lg">
            <div className="px-3 py-2 text-sm text-muted-foreground">
              No breeds found matching &apos;{breedSearch}&apos;
            </div>
          </div>
        )}
      </div>

      {/* Show and remove all selected breeds */}
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
                    onRemoveBreed(breed);
                  }}
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}