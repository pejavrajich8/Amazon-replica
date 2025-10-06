export default class Product {
  constructor({ id, name, description = '', price = 0 }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = Number(price) || 0;
  }

  render(parent, onAdd) {
    const card = document.createElement('article');
    card.className = 'bg-white rounded shadow-sm overflow-hidden flex flex-col h-full';
    card.innerHTML = `
      <div class="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-500">Image</div>
      <div class="p-4 flex flex-col justify-between flex-1">
        <div>
          <h3 class="text-sm font-medium text-gray-900">${this.name}</h3>
          <p class="mt-2 text-sm text-gray-500" style="display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden;">${this.description}</p>
        </div>
        <div class="mt-4 flex items-center justify-between">
          <div class="text-lg font-semibold text-gray-900">$${this.price.toFixed(2)}</div>
          <button data-product-id="${this.id}" class="bg-yellow-400 text-black px-3 py-1 rounded add-to-cart">Add to Cart</button>
        </div>
      </div>
    `;

    parent.appendChild(card);

    const btn = card.querySelector('.add-to-cart');
    btn.addEventListener('click', () => {
      if (typeof onAdd === 'function') onAdd(this);
    });

    return card;
  }
}
