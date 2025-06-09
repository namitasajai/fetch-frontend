import { render, screen, fireEvent } from '@testing-library/react';
import BreedFilter from '@/components/search/filters/BreedFilter';

test('should filter breeds when typing', () => {
  const mockProps = {
    selectedBreeds: [],
    breedSearch: '',
    filteredBreeds: ['Golden Retriever', 'Samoyed'],
    loading: false,
    onBreedSearchChange: jest.fn(),
    onAddBreed: jest.fn(),
    onRemoveBreed: jest.fn(),
  };

  render(<BreedFilter {...mockProps} />);
  
  const input = screen.getByPlaceholderText('Search a breed...');
  fireEvent.change(input, { target: { value: 'Golden' } });
  
  expect(mockProps.onBreedSearchChange).toHaveBeenCalledWith('Golden');
});