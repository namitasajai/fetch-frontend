import { api } from '@/services/api';

global.fetch = jest.fn();

test('should search dogs with correct parameters', async () => {
  const mockResponse = { resultIds: ['1', '2'], total: 2 };
  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => mockResponse,
  });

  const result = await api.searchDogs({ breeds: ['Golden Retriever'] });
  
  expect(fetch).toHaveBeenCalledWith(
    expect.stringContaining('breeds=Golden+Retriever'),
    expect.any(Object)
  );
  expect(result).toEqual(mockResponse);
});