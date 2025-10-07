import Cart from '../js/cart.js';

describe('Cart', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should start empty', () => {
    const cart = new Cart();
    expect(cart.getItems().length).toBe(0);
    expect(cart.getCount()).toBe(0);
    expect(cart.getTotal()).toBe(0);
  });

  it('should add items and persist to localStorage', () => {
    const cart = new Cart();
    cart.add({ id: 'p1', name: 'Product 1', price: '10' });
    expect(cart.getCount()).toBe(1);
    expect(cart.getTotal()).toBe(10);

    // new instance should load from localStorage
    const cart2 = new Cart();
    expect(cart2.getCount()).toBe(1);
    expect(cart2.getTotal()).toBe(10);
  });
});
