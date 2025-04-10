import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { CartService } from './cart.service';
import { Product } from '@shared/models/product.model';
import { generateFakeProduct } from '@shared/models/product.mock';

describe('CartService', () => {
  let spectator: SpectatorService<CartService>;
  const createService = createServiceFactory(CartService);

  beforeEach(() => spectator = createService());

  it('should not be logged in', () => {
    expect(spectator.service).toBeDefined();
  });

  it('should add a product to the cart', () => {
    const mockProduct:Product = generateFakeProduct();
    spectator.service.addToCart(mockProduct);
    expect(spectator.service.cart()).toEqual([mockProduct]);
    expect(spectator.service.total()).toEqual(mockProduct.price);
  });

  it('should calculate the total price correctly when multiple products are added', () => {
    const product1: Product =generateFakeProduct({price: 100});
    const product2: Product = generateFakeProduct({price:100});
  
    spectator.service.addToCart(product1);
    spectator.service.addToCart(product2);
  
    expect(spectator.service.cart()).toEqual([product1, product2]);
    expect(spectator.service.total()).toEqual(200);
  });
  
  it('should handle adding the same product multiple times', () => {
    const product: Product = generateFakeProduct({price: 100});
  
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
    const freeProduct: Product = generateFakeProduct({price: 0});
  
    spectator.service.addToCart(freeProduct);
  
    expect(spectator.service.cart()).toEqual([freeProduct]);
    expect(spectator.service.total()).toEqual(0);
  });
});
