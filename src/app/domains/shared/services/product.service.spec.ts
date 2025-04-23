import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import { ProductService } from './product.service';
import { environment } from '@env/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { generateFakeProduct } from '../models/product.mock';

describe('ProductService', () => {
  let spectator: SpectatorHttp<ProductService>;
  const createHttp = createHttpFactory(ProductService);

  beforeEach(() => (spectator = createHttp()));

  describe('getOne', () => {
    it('should fetch a product by ID (success)', () => {
      const mockProduct = generateFakeProduct();
      const id = '1';
      const url = `${environment.apiUrl}/api/v1/products/${id}`;

      spectator.service.getOne(id).subscribe((product) => {
        expect(product).toEqual(mockProduct);
      });

      spectator.expectOne(url, HttpMethod.GET).flush(mockProduct);
    });

    it('should handle error when fetching a product by ID', () => {
      const id = '1';
      const url = `${environment.apiUrl}/api/v1/products/${id}`;
      const errorResponse = new ErrorEvent('Network error');

      spectator.service.getOne(id).subscribe({
        error: (error) => {
          expect(error.status).toBe(404);
          expect(error.statusText).toBe('Not Found');
        },
      });

      spectator.expectOne(url, HttpMethod.GET).error(errorResponse);
    });
  });

  describe('getProducts', () => {
    it('should fetch products with category_id (success)', () => {
      const mockProducts = [generateFakeProduct(), generateFakeProduct()];
      const params = { category_id: '123' };
      const url = `${environment.apiUrl}/api/v1/products?categoryId=${params.category_id}`;

      spectator.service.getProducts(params).subscribe((products) => {
        expect(products).toEqual(mockProducts);
      });

      spectator.expectOne(url, HttpMethod.GET).flush(mockProducts);
    });

    it('should fetch products with category_slug (success)', () => {
      const mockProducts = [generateFakeProduct(), generateFakeProduct()];
      const params = { category_slug: 'electronics' };
      const url = `${environment.apiUrl}/api/v1/products?categorySlug=${params.category_slug}`;

      spectator.service.getProducts(params).subscribe((products) => {
        expect(products).toEqual(mockProducts);
      });

      spectator.expectOne(url, HttpMethod.GET).flush(mockProducts);
    });

    it('should handle error when fetching products', () => {
      const params = { category_id: '123' };
      const url = `${environment.apiUrl}/api/v1/products?categoryId=${params.category_id}`;
      const errorResponse = new ErrorEvent('Network error', {
        message: 'Internal Server Error'});

      spectator.service.getProducts(params).subscribe({
        error: (error) => {
          expect(error.status).toBe(500);
          expect(error.statusText).toBe('Internal Server Error');
        },
      });

      spectator.expectOne(url, HttpMethod.GET).error(errorResponse);
    });
  });

  describe('getOneBySlug', () => {
    it('should fetch a product by slug (success)', () => {
      const mockProduct = generateFakeProduct();
      const slug = 'sample-slug';
      const url = `${environment.apiUrl}/api/v1/products/slug/${slug}`;

      spectator.service.getOneBySlug(slug).subscribe((product) => {
        expect(product).toEqual(mockProduct);
      });

      spectator.expectOne(url, HttpMethod.GET).flush(mockProduct);
    });

    it('should handle error when fetching a product by slug', () => {
      const slug = 'sample-slug';
      const url = `${environment.apiUrl}/api/v1/products/slug/${slug}`;
      const errorResponse = new ErrorEvent('Network error');
      

      spectator.service.getOneBySlug(slug).subscribe({
        error: (error) => {
          expect(error.status).toBe(404);
          expect(error.statusText).toBe('Not Found');
        },
      });

      spectator.expectOne(url, HttpMethod.GET).error(errorResponse);
    });
  });

  describe('getRelatedProducts', () => {
    it('should fetch related products by slug (success)', () => {
      const mockProducts = [generateFakeProduct(), generateFakeProduct()];
      const slug = 'sample-slug';
      const url = `${environment.apiUrl}/api/v1/products/slug/${slug}/related`;

      spectator.service.getRelatedProducts(slug).subscribe((products) => {
        expect(products).toEqual(mockProducts);
      });

      spectator.expectOne(url, HttpMethod.GET).flush(mockProducts);
    });

    it('should handle error when fetching related products', () => {
      const slug = 'sample-slug';
      const url = `${environment.apiUrl}/api/v1/products/slug/${slug}/related`;
      const errorResponse = new ErrorEvent('Network error', {
        message: 'Internal Server Error'});

      spectator.service.getRelatedProducts(slug).subscribe({
        error: (error) => {
          expect(error.status).toBe(500);
          expect(error.statusText).toBe('Internal Server Error');
        },
      });

      spectator.expectOne(url, HttpMethod.GET).error(errorResponse);
    });
  });
});