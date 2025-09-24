import Product from './product.js';
import Cart from './cart.js';

import { renderHeader } from '../components/header.js';
import { renderFooter } from '../components/footer.js';
import { renderCartPage } from '../components/cart.js';

// Simple in-memory product data (could be fetched from an API)
const PRODUCTS = [
  { id: 'p1', name: 'Laptop', description: 'High performance laptop', price: 999.0 },
  { id: 'p2', name: 'Headphones', description: 'Noise cancelling', price: 199.0 },
  { id: 'p3', name: 'Mouse', description: 'Wireless mouse', price: 29.99 },
  { id: 'p4', name: 'Plain Hooded Fleece Sweatshirt', description: 'Comfortable cotton blend', price: 24.0 },
  { id: 'p5', name: 'Nonstick Oven Bakeware', description: 'Durable and easy to clean', price: 34.99 },
  { id: 'p6', name: '2 Slot Toaster - Black', description: 'Fast and compact', price: 18.99 },
  { id: 'p7', name: 'Luxury Towel Set - Graphite', description: 'Soft and absorbent', price: 35.99 },
  { id: 'p8', name: '6 Piece White Dinner Plate Set', description: 'Dishwasher safe', price: 20.67 },
];

// App bootstrap
document.addEventListener('DOMContentLoaded', () => {
  // Render shared header/footer
  try {
    renderHeader('site-header');
    renderFooter('site-footer');
  } catch (e) {
    // Best-effort: continue even if components fail
    // console.warn('Header/footer render failed', e);
  }

  const cart = new Cart();

  // Utilities to update header badges
  function updateHeader() {
    const countEl = document.getElementById('cart-count');
    const totalEl = document.getElementById('cart-total');
    if (countEl) countEl.innerText = String(cart.getCount());
    if (totalEl) totalEl.innerText = `$${cart.getTotal().toFixed(2)}`;
  }


  function addItemToCart(prod) {
   const item = {
      id: prod.id,
      name: prod.name,
      price: Number(prod.price) || 0,
    };


    cart.add(item);
    updateHeader();
  }



  // Render products into a grid. Supports either index page or product page containers.
  function renderProductsGrid(targetId = 'product-grid') {
    const container = document.getElementById(targetId);
    if (!container) return;

    // Build a responsive inner grid so we don't rely on static HTML
    container.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.className = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';

    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6';

    PRODUCTS.forEach(pd => {
      const p = new Product(pd);
      p.render(grid, addItemToCart);
    });

    wrapper.appendChild(grid);
    container.appendChild(wrapper);
  }

  // Render product listing on product detail page (single product container)
  function renderProductList(targetId = 'product-container') {
    const container = document.getElementById(targetId);
    if (!container) return;
    container.innerHTML = '';
    PRODUCTS.forEach(pd => {
      const p = new Product(pd);
      p.render(container, addItemToCart);
    });
  }

  // cart rendering is implemented in components/cart.js

  // Initialize UI on whichever page we're on
  renderProductsGrid('product-grid');
  renderProductList('product-container');
  renderCartPage(cart, 'cart-container', updateHeader);
  updateHeader();
});

export {};
