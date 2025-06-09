import { renderHook, act } from '@testing-library/react';
import { useFilters } from '@/hooks/useFilters';

// Mock the API
jest.mock('@/services/api', () => ({
  api: {
    getBreeds: jest.fn().mockResolvedValue(['Golden Retriever', 'Labrador', 'Poodle'])
  }
}));

describe('useFilters', () => {
  test('should add and remove breeds', async () => {
    const { result } = renderHook(() => useFilters());
    
    // Wait for breeds to load
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    act(() => {
      result.current.addBreed('Golden Retriever');
    });
    
    expect(result.current.selectedBreeds).toContain('Golden Retriever');
    
    act(() => {
      result.current.removeBreed('Golden Retriever');
    });
    
    expect(result.current.selectedBreeds).not.toContain('Golden Retriever');
  });
});