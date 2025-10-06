// Deprecated product-grid helper (kept as a small compatibility shim).
// Prefer using `js/renderProducts.js` which centralizes rendering.
import { productCardHTML } from './product-card.js';

export function renderProductGrid(targetId = 'product-grid', products = []) {
  const container = document.getElementById(targetId);
  if (!container) return;
  if (!container.classList.contains('grid')) {
    container.classList.add('grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'gap-6');
  }
  container.innerHTML = (Array.isArray(products) ? products : []).map(p => productCardHTML(p)).join('');
}

export default renderProductGrid;
