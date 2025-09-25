// components/product-card.js
// Returns the HTML string for a single product card.
export function productCardHTML() {
  return `
<article class="bg-white rounded shadow-sm overflow-hidden">
  <!-- Product image placeholder: preserves sizing and layout -->
  <div class="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-500"></div>
  <div class="p-4">
    <!-- Product title and small meta -->
    <h3 class="text-sm font-medium text-gray-900">Product Title</h3>
    <p class="mt-2 text-sm text-gray-500">Short description or category</p>
    <div class="mt-4 flex items-center justify-between">
      <!-- Price and CTA (static) -->
      <div class="text-lg font-semibold text-gray-900">$19.99</div>
      <button class="bg-yellow-400 text-black px-3 py-1 rounded">Add to Cart</button>
    </div>
  </div>
</article>
`;
}

export default productCardHTML;
