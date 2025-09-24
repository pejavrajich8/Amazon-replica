// components/product-grid.js
// Renders a responsive grid and injects product-card instances into it.
import productCardHTML from './product-card.js';

export function renderProductGrid(targetId = 'product-grid') {
  const html = `
<section class="py-8">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Responsive grid container; adjust number of columns by breakpoint -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" id="__product-grid-inner">
      <!-- product cards will be injected here -->
    </div>
  </div>
</section>
`;

  const container = document.getElementById(targetId);
  if (!container) return;

  container.innerHTML = html;

  const inner = container.querySelector('#__product-grid-inner');
  if (!inner) return;

  // Insert a number of product cards to match the original HTML (8 instances)
  for (let i = 0; i < 8; i++) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = productCardHTML();
    inner.appendChild(wrapper.firstElementChild);
  }
}

export default renderProductGrid;
