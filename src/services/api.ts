import { Dog, SearchParams, SearchResponse, Match, LocationSearchParams, LocationSearchResponse } from '@/types';

const BASE_URL = 'https://frontend-take-home-service.fetch.com';

export const api = {
  login: async (name: string, email: string): Promise<boolean> => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
      });
      return response.ok;
    } catch (error) {
      console.error('Login API error:', error);
      return false;
    }
  },

  logout: async (): Promise<void> => {
    try {
      await fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  getBreeds: async (): Promise<string[]> => {
    const response = await fetch(`${BASE_URL}/dogs/breeds`, {
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to fetch breeds');
    return response.json();
  },

  searchDogs: async (params: SearchParams): Promise<SearchResponse> => {
    const queryParams = new URLSearchParams();
    
    if (params.breeds?.length) {
      params.breeds.forEach(breed => queryParams.append('breeds', breed));
    }
    if (params.zipCodes?.length) {
      params.zipCodes.forEach(zip => queryParams.append('zipCodes', zip));
    }
    if (params.ageMin !== undefined) queryParams.append('ageMin', params.ageMin.toString());
    if (params.ageMax !== undefined) queryParams.append('ageMax', params.ageMax.toString());
    if (params.size) queryParams.append('size', params.size.toString());
    if (params.from) queryParams.append('from', params.from);
    if (params.sort) queryParams.append('sort', params.sort);

    const response = await fetch(`${BASE_URL}/dogs/search?${queryParams}`, {
      credentials: 'include'
    });
    
    if (!response.ok) throw new Error('Failed to search dogs');
    return response.json();
  },

  getDogs: async (dogIds: string[]): Promise<Dog[]> => {
    const response = await fetch(`${BASE_URL}/dogs`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dogIds)
    });
    
    if (!response.ok) throw new Error('Failed to fetch dogs');
    return response.json();
  },

  generateMatch: async (dogIds: string[]): Promise<Match> => {
    const response = await fetch(`${BASE_URL}/dogs/match`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dogIds)
    });
    
    if (!response.ok) throw new Error('Failed to generate match');
    return response.json();
  },

  searchLocations: async (params: LocationSearchParams): Promise<LocationSearchResponse> => {
    const response = await fetch(`${BASE_URL}/locations/search`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    
    if (!response.ok) throw new Error('Failed to search locations');
    return response.json();
  }
};