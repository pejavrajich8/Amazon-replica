import Product from "./product.js";
import Cart from "./cart.js";

import { renderHeader } from "../components/header.js";
import { renderFooter } from "../components/footer.js";

// Single DOMContentLoaded handler: render header/footer first, then wire product UI (if present)
document.addEventListener('DOMContentLoaded', () => {
	try {
		renderHeader('site-header');
		renderFooter('site-footer');
	} catch (err) {
		console.error('Header/Footer render failed:', err);
	}

	// If there's no product container on this page, nothing more to do
	const productContainer = document.getElementById("product-container");
	if (!productContainer) return;

	// Create a cart instance and wire UI
	const cart = new Cart();

	// Sample products (small and easy to read)
	const products = [
		new Product({ id: 'p1', name: 'Laptop', description: 'High performance laptop', price: 999 }),
		new Product({ id: 'p2', name: 'Headphones', description: 'Noise cancelling', price: 199 }),
		new Product({ id: 'p3', name: 'Mouse', description: 'Wireless mouse', price: 29.99 }),
	];

	function updateCartUI() {
		const countEl = document.getElementById('cart-count');
		const totalEl = document.getElementById('cart-total');
		if (countEl) countEl.innerText = String(cart.getCount());
		if (totalEl) totalEl.innerText = cart.getTotal().toFixed(2);
	}

	// Render products and pass callback that adds to cart
	products.forEach(p => p.render(productContainer, (prod) => {
		cart.add(prod);
		updateCartUI();
	}));

	// Initialize header badge from stored cart
	updateCartUI();
});