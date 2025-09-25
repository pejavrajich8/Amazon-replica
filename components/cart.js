// Renders the shopping cart page
export function renderCartPage(cart, targetId = 'cart-container', updateHeader = () => {}) {
  const container = document.getElementById(targetId);
  if (!container) return;

  const items = cart.getItems();
  container.innerHTML = '';

  const box = document.createElement('div');
  box.className = 'bg-white p-6 rounded shadow';

  if (!items.length) {
    box.innerHTML = '<div class="text-gray-700">Your cart is empty.</div>';
    container.appendChild(box);
    return;
  }

// List of cart items

  const list = document.createElement('div');
  list.className = 'space-y-4';

  items.forEach(it => {
    const row = document.createElement('div');
    row.className = 'flex items-center justify-between border-b pb-3';

    const left = document.createElement('div');
    left.className = 'flex-1';
    left.innerHTML = `<div class="font-medium text-gray-900">${it.name}</div>
        <div class="text-sm text-gray-500">Qty: ${it.qty}</div>`;

    const right = document.createElement('div');
    right.className = 'flex items-center gap-4';
    const price = document.createElement('div');
    price.className = 'text-right text-gray-900 font-semibold';
    price.innerText = `$${(Number(it.price) * it.qty).toFixed(2)}`;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'text-sm text-red-600 hover:underline';
    removeBtn.innerText = 'Remove';
    removeBtn.addEventListener('click', () => {
      cart.remove(it.id);
      renderCartPage(cart, targetId, updateHeader);
      updateHeader();
    });

    right.appendChild(price);
    right.appendChild(removeBtn);

    row.appendChild(left);
    row.appendChild(right);

    list.appendChild(row);
  });

// Footer with subtotal and actions

  const footer = document.createElement('div');
  footer.className = 'mt-6 flex items-center justify-between';

  const subtotal = document.createElement('div');
  subtotal.className = 'text-lg font-semibold';
  subtotal.innerText = `Subtotal: $${cart.getTotal().toFixed(2)}`;

  const actions = document.createElement('div');
  const clearBtn = document.createElement('button');
  clearBtn.className = 'bg-red-500 text-white px-3 py-1 rounded mr-2';
  clearBtn.innerText = 'Clear Cart';
  clearBtn.addEventListener('click', () => {
    cart.clear();
    renderCartPage(cart, targetId, updateHeader);
    updateHeader();
  });

  const checkout = document.createElement('a');
  checkout.className = 'bg-yellow-400 text-black px-3 py-1 rounded';
  checkout.href = '#';
  checkout.innerText = 'Proceed to Checkout';

  actions.appendChild(clearBtn);
  actions.appendChild(checkout);

  footer.appendChild(subtotal);
  footer.appendChild(actions);

  box.appendChild(list);
  box.appendChild(footer);
  container.appendChild(box);
}
