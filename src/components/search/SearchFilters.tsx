'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Search, X, Filter, RotateCcw } from 'lucide-react';
import { SearchParams } from '@/types';
import { api } from '@/services/api';

interface SearchFiltersProps {
  onFiltersChange: (filters: SearchParams) => void;
  loading: boolean;
}

export default function SearchFilters({ onFiltersChange, loading }: SearchFiltersProps) {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [ageMin, setAgeMin] = useState('');
  const [ageMax, setAgeMax] = useState('');
  const [sortBy, setSortBy] = useState('breed:asc');
  const [breedSearch, setBreedSearch] = useState('');

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const breedsList = await api.getBreeds();
        setBreeds(breedsList.sort());
      } catch (error) {
        console.error('Failed to fetch breeds:', error);
      }
    };
    fetchBreeds();
  }, []);

  const filteredBreeds = breeds.filter(breed =>
    breed.toLowerCase().includes(breedSearch.toLowerCase()) &&
    !selectedBreeds.includes(breed)
  );

  const handleSearch = () => {
    const filters: SearchParams = {
      breeds: selectedBreeds.length > 0 ? selectedBreeds : undefined,
      ageMin: ageMin ? parseInt(ageMin) : undefined,
      ageMax: ageMax ? parseInt(ageMax) : undefined,
      sort: sortBy,
      size: 25
    };
    onFiltersChange(filters);
  };

  const handleReset = () => {
    setSelectedBreeds([]);
    setAgeMin('');
    setAgeMax('');
    setSortBy('breed:asc');
    setBreedSearch('');
    onFiltersChange({ sort: 'breed:asc', size: 25 });
  };

  const addBreed = (breed: string) => {
    if (!selectedBreeds.includes(breed)) {
      setSelectedBreeds([...selectedBreeds, breed]);
    }
    setBreedSearch('');
  };

  const removeBreed = (breed: string) => {
    setSelectedBreeds(selectedBreeds.filter(b => b !== breed));
  };

  return (
    <Card className="shadow-lg border-0 bg-white">
      {/* <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Filter className="w-5 h-5" />
          Search Filters
        </CardTitle>
      </CardHeader> */}
      
      <CardContent className="space-y-6">
        {/* Breed Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Dog Breeds</Label>
          
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
              <Label className="text-xs text-gray-500">Selected breeds:</Label>
              <div className="flex flex-wrap gap-2">
                {selectedBreeds.map((breed) => (
                  <Badge key={breed} variant="secondary" className="flex items-center gap-1 text-xs">
                    {breed}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-red-500"
                      onClick={() => removeBreed(breed)}
                    />
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
          <Label className="text-sm font-medium">Age Range</Label>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="ageMin" className="text-xs text-gray-500">Min Age</Label>
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
            
            <div className="space-y-2">
              <Label htmlFor="ageMax" className="text-xs text-gray-500">Max Age</Label>
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

        {/* Sort */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Sort By</Label>
          <Select value={sortBy} onValueChange={setSortBy} disabled={loading}>
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
        <div className="space-y-3 pt-4">
          <Button 
            onClick={handleSearch}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Search className="w-4 h-4 mr-2" />
            Search Dogs
          </Button>
          <Button 
            variant="outline" 
            onClick={handleReset}
            disabled={loading}
            className="w-full"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}