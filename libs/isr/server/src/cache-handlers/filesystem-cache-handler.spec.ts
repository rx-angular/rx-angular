import {
  convertCacheKeyToFileName,
  convertFileNameToCacheKey,
} from './filesystem-cache-handler';

// Use the functions as needed
describe('Route and File Name Conversion', () => {
  describe('convertCacheKeyToFileName', () => {
    it('should convert a simple route without query parameters', () => {
      const route = '/users/profile';
      const expectedFileName = '__users__profile';
      expect(convertCacheKeyToFileName(route)).toEqual(expectedFileName);
    });

    it('should convert a route with query parameters', () => {
      const route = '/search?query=test';
      const expectedFileName = '__search++query=test';
      expect(convertCacheKeyToFileName(route)).toEqual(expectedFileName);
    });
  });

  describe('convertFileNameToCacheKey', () => {
    it('should convert a simple file name back to a route', () => {
      const fileName = '__users__profile';
      const expectedRoute = '/users/profile';
      expect(convertFileNameToCacheKey(fileName)).toEqual(expectedRoute);
    });

    it('should convert a file name with "++" back to a route with a query parameter', () => {
      const fileName = '__search++query=test';
      const expectedRoute = '/search?query=test';
      expect(convertFileNameToCacheKey(fileName)).toEqual(expectedRoute);
    });
  });
});
