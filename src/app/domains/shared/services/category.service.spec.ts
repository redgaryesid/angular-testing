import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp,
} from '@ngneat/spectator/jest';
import { CategoryService } from './category.service';
import { environment } from '@env/environment';
import { generateFakeCategory } from '../models/category.mock';
import { Category } from '../models/category.model';

import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();

describe('CategoryService', () => {
  let spectator: SpectatorHttp<CategoryService>;
  const createHttp = createHttpFactory(CategoryService);

  beforeEach(() => {
    spectator = createHttp();
    global.fetch = jest.fn(); // Reset fetch mock
  });

  describe('getAll', () => {
    const url = `${environment.apiUrl}/api/v1/categories`;

    it('should get all categories', () => {
      const mockCategories: Category[] = [
        generateFakeCategory(),
        generateFakeCategory(),
      ];

      spectator.service.getAll().subscribe(categories => {
        expect(categories).toEqual(mockCategories);
      });

      const req = spectator.expectOne(url, HttpMethod.GET);
      req.flush(mockCategories);
    });

    it('should handle empty categories list', () => {
      const mockCategories: Category[] = [];

      spectator.service.getAll().subscribe(categories => {
        expect(categories).toEqual([]);
      });

      const req = spectator.expectOne(url, HttpMethod.GET);
      req.flush(mockCategories);
    });

    it('should handle error when API fails', () => {
      const errorMessage = 'API Error';

      spectator.service.getAll().subscribe({
        error: error => {
          expect(error.statusText).toBe(errorMessage);
        },
      });

      const req = spectator.expectOne(url, HttpMethod.GET);
      req.flush(null, { status: 500, statusText: errorMessage });
    });
  });

  describe('getAllPromise', () => {
    const url = `${environment.apiUrl}/api/v1/categories`;

    it('should get all categories using Promise', async () => {
      const mockCategories: Category[] = [
        generateFakeCategory(),
        generateFakeCategory(),
      ];

      // Mock global fetch
      global.fetch = jest.fn().mockResolvedValueOnce({
        json: async () => mockCategories,
      } as Response);

      const result = await spectator.service.getAllPromise();
      expect(result).toEqual(mockCategories);
      expect(global.fetch).toHaveBeenCalledWith(url);
    });

    it('should handle empty categories list with Promise', async () => {
      const mockCategories: Category[] = [];

      // Mock global fetch
      global.fetch = jest.fn().mockResolvedValueOnce({
        json: async () => mockCategories,
      } as Response);

      const result = await spectator.service.getAllPromise();
      expect(result).toEqual([]);
      expect(global.fetch).toHaveBeenCalledWith(url);
    });

    it('should handle network error in Promise', async () => {
      const errorMessage = 'Network Error';

      // Mock global fetch to throw error
      global.fetch = jest.fn().mockRejectedValueOnce(new Error(errorMessage));

      try {
        await spectator.service.getAllPromise();
      } catch (error) {
        expect(error).toEqual(new Error(errorMessage));
      }
      expect(global.fetch).toHaveBeenCalledWith(url);
    });

    it('should handle JSON parsing error in Promise', async () => {
      // Mock global fetch with invalid JSON
      global.fetch = jest.fn().mockResolvedValueOnce({
        json: async () => {
          throw new Error('Invalid JSON');
        },
      } as unknown as Response);

      try {
        await spectator.service.getAllPromise();
      } catch (error) {
        expect(error).toEqual(new Error('Invalid JSON'));
      }
      expect(global.fetch).toHaveBeenCalledWith(url);
    });
  });
});
