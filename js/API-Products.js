import { productCardHTML } from '../components/product-card.js';
import Cart from './cart.js';

// Sample products data
const API_URL = "https://fakestoreapi.com/products"; // api will go here
const container = document.getElementById('products-container');
let PRODUCTS = []

export async function fetchAndRenderProducts() {
    if (!container) return;
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        PRODUCTS = await res.json();
        container.innerHTML = PRODUCTS.map(p => productCardHTML(p)).join('');
        attachListeners();

    } catch (err) {
        console.error('Failed to fetch products:', err);
        container.innerHTML = '<div class="text-red-600">Failed to load products. Please try again later.</div>';
    }

}

function attachListeners() {
    const cart = new Cart();
    container.querySelectorAll('.add-to-cart').forEach((btn) => {
        btn.addEventListener('click', () => {
            const prodId = btn.dataset.productId;
            const product = PRODUCTS.find(p => String(p.id) === String(prodId));
            if (!product) return;
            cart.add({ id: product.id, name: product.name, title: product.title });
            window.dispatchEvent(new CustomEvent('cart-updated'));
        });
    });
};

// start
fetchAndRenderProducts();

export default fetchAndRenderProducts;