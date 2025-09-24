// Minimal Product class module
// Usage: import Product from './product.js'




export default class Product {
  constructor({ id, name, description = '', price = 0 }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = Number(price) || 0;
  }

  // render into a parent element. onAdd is a callback invoked with this product
  render(parent, onAdd) {
    const card = document.createElement('article');
    card.className = 'bg-white rounded shadow-sm overflow-hidden';
    card.innerHTML = `
      <div class="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-500">Image</div>
      <div class="p-4">
        <h3 class="text-sm font-medium text-gray-900">${this.name}</h3>
        <p class="mt-2 text-sm text-gray-500">${this.description}</p>
        <div class="mt-4 flex items-center justify-between">
          <div class="text-lg font-semibold text-gray-900">$${this.price.toFixed(2)}</div>
          <button class="bg-yellow-400 text-black px-3 py-1 rounded add-to-cart">Add to Cart</button>
        </div>
      </div>`;

    parent.appendChild(card);

    const btn = card.querySelector('.add-to-cart');
    btn.addEventListener('click', () => {
      if (typeof onAdd === 'function') onAdd(this);
    });

    return card;
  }
}
