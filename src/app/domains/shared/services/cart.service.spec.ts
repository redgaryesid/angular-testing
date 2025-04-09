import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { CartService } from './cart.service';
import { Product } from '@shared/models/product.model';

describe('CartService', () => {
  let spectator: SpectatorService<CartService>;
  const createService = createServiceFactory(CartService);

  beforeEach(() => spectator = createService());

  it('should not be logged in', () => {
    expect(spectator.service).toBeDefined();
  });

  it('should add a product to the cart', () => {
    const mockProduct:Product = {
        id: 1, title: 'Test Product', price: 100,
        description: '',
        images: [],
        creationAt: '',
        category: {
            id: 1,
            name: 'Test Category',
            image: '',
            slug: ''
        },
        slug: ''
    };
    spectator.service.addToCart(mockProduct);
    expect(spectator.service.cart()).toEqual([mockProduct]);
    expect(spectator.service.total()).toEqual(mockProduct.price);
  });

  it('should calculate the total price correctly when multiple products are added', () => {
    const product1: Product = {
      id: 1, title: 'Product 1', price: 50,
      description: '', images: [], creationAt: '',
      category: { id: 1, name: 'Category 1', image: '', slug: '' },
      slug: ''
    };
    const product2: Product = {
      id: 2, title: 'Product 2', price: 150,
      description: '', images: [], creationAt: '',
      category: { id: 2, name: 'Category 2', image: '', slug: '' },
      slug: ''
    };
  
    spectator.service.addToCart(product1);
    spectator.service.addToCart(product2);
  
    expect(spectator.service.cart()).toEqual([product1, product2]);
    expect(spectator.service.total()).toEqual(200);
  });
  
  it('should handle adding the same product multiple times', () => {
    const product: Product = {
      id: 1, title: 'Duplicate Product', price: 100,
      description: '', images: [], creationAt: '',
      category: { id: 1, name: 'Category 1', image: '', slug: '' },
      slug: ''
    };
  
    spectator.service.addToCart(product);
    spectator.service.addToCart(product);
  
    expect(spectator.service.cart()).toEqual([product, product]);
    expect(spectator.service.total()).toEqual(200);
  });
  
  it('should handle an empty cart correctly', () => {
    expect(spectator.service.cart()).toEqual([]);
    expect(spectator.service.total()).toEqual(0);
  });
  
  
  it('should handle products with a price of 0', () => {
    const freeProduct: Product = {
      id: 3, title: 'Free Product', price: 0,
      description: '', images: [], creationAt: '',
      category: { id: 3, name: 'Category 3', image: '', slug: '' },
      slug: ''
    };
  
    spectator.service.addToCart(freeProduct);
  
    expect(spectator.service.cart()).toEqual([freeProduct]);
    expect(spectator.service.total()).toEqual(0);
  });
});
