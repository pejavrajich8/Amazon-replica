export function productCardHTML(p = {}) {
  const id = p.id ?? '';
  const title = p.title ?? 'Product Title';
  const description = p.description ?? 'Short description or category';
  const price = typeof p.price === 'number' ? p.price : (p.price ? Number(p.price) : null);
  const priceText = price != null ? `$${price.toFixed(2)}` : (p.price ?? '0.00');
  const img = p.image ?? p.thumbnail ?? '';
  const safeImg = img ? `<img src="${img}" alt="${title}" class="object-contain h-full w-full" />` : '';
  
  return `
    <article class="bg-white rounded shadow-sm overflow-hidden flex flex-col h-full">
      <div class="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-500">
        ${safeImg}
      </div>
      <div class="p-4 flex flex-col justify-between flex-1">
        <div>
          <h3 class="text-sm font-medium text-gray-900">${title}</h3>
          <p class="mt-2 text-sm text-gray-500" style="display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden;">${description}</p>
        </div>
        <div class="mt-4 flex items-center justify-between">
          <div class="text-lg font-semibold text-gray-900">${priceText}</div>
          <button data-product-id="${id}" class="add-to-cart bg-yellow-400 text-black px-3 py-1 rounded">Add to Cart</button>
        </div>
      </div>
    </article>
  `;
}

export default productCardHTML;
