import { productCardHTML } from '../components/product-card.js';
import Cart from './cart.js';

let PRODUCTS = [];

export function renderProducts(products = [], containerId = 'products-container') {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  PRODUCTS = Array.isArray(products) ? products : [];
  
  if (!container.classList.contains('grid')) {
    container.classList.add('grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'gap-6');
  }
  
  container.innerHTML = PRODUCTS.map(p => productCardHTML(p)).join('');
  attachListeners(container);
}

function attachListeners(container) {
  const cart = new Cart();
  container.querySelectorAll('.add-to-cart').forEach((btn) => {
    btn.addEventListener('click', () => {
      const prodId = btn.dataset.productId;
      const product = PRODUCTS.find(p => String(p.id) === String(prodId));
      if (!product) return;

      const price = product.price !== undefined ? Number(product.price) || 0
        : product.price_cents !== undefined ? (Number(product.price_cents) || 0) / 100
        : product._raw?.price_cents !== undefined ? (Number(product._raw.price_cents) || 0) / 100
        : Number(product._raw?.price) || 0;

      cart.add({ 
        id: product.id, 
        name: product.name ?? product.title, 
        price, 
        title: product.title 
      });
      window.dispatchEvent(new CustomEvent('cart-updated'));
    });
  });
}

export default renderProducts;