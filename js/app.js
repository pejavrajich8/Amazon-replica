import Product from './product.js';
import Cart from './cart.js';
import { renderHeader } from '../components/header.js';
import { renderFooter } from '../components/footer.js';
import { renderCartPage } from '../components/cart.js';
import renderProducts from './renderProducts.js';

let PRODUCTS = [];
const API_URL = 'https://www.totallyrad.dev/api/v1/products';

function extractPrice(product) {
  if (!product) return 0;
  
  // The API uses priceCents, so check that first
  if (product.priceCents) {
    return Number(product.priceCents) / 100;
  }
  
  const toNumber = (value) => {
    if (value === null || value === undefined) return NaN;
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const cleaned = String(value).replace(/[^0-9.-]+/g, '');
      const num = Number(cleaned);
      return isNaN(num) ? NaN : num;
    }
    return NaN;
  };

  // Check other common price fields
  const candidates = [
    product.price,
    product.cost,
    product.amount,
    product.price_cents,
    product.list_price,
    product.price?.amount,
    product.price?.value,
    product.pricing?.price,
    product.variants?.[0]?.price,
  ];

  for (const candidate of candidates) {
    const price = toNumber(candidate);
    if (!isNaN(price) && price > 0) {
      return price;
    }
  }

  return 0;
}

async function loadProducts() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    const items = Array.isArray(data) ? data 
      : Array.isArray(data?.products) ? data.products
      : Array.isArray(data?.data) ? data.data
      : Array.isArray(data?.items) ? data.items
      : [];

    let normalized = items.map(p => {
      const title = p.title ?? p.name ?? p.productName ?? 'Untitled';
      const price = extractPrice(p);
      const image = p.image ?? p.thumbnail ?? (Array.isArray(p.images) ? p.images[0] : '') ?? '';
      
      return {
        id: p.id ?? p._id ?? String(Math.random()).slice(2),
        title,
        name: title,
        description: p.description ?? p.summary ?? p.category ?? '',
        price,
        image,
        thumbnail: p.thumbnail ?? image,
        _raw: p,
      };
    });

    PRODUCTS = normalized;
  } catch (err) {
    console.error('Failed to load products from API:', err);
    PRODUCTS = [];
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    renderHeader('site-header');
    renderFooter('site-footer');
  } catch (e) {
    console.warn('Header/footer render failed', e);
  }

  const cart = new Cart();

  window.addEventListener('cart-updated', () => {
    try {
      cart.items = cart._load();
    } catch (e) {
      const newCart = new Cart();
      cart.items = newCart.items;
    }
    updateHeader();
    renderCartPage(cart, 'cart-container', updateHeader);
  });

  await loadProducts();

  try {
    const prodById = new Map(PRODUCTS.map(p => [String(p.id), p]));
    let changed = false;
    cart.items = cart.items.map(item => {
      const product = prodById.get(String(item.id));
      if (product) {
        const productPrice = Number(product.price) || 0;
        if (!item.price || Number(item.price) !== productPrice) {
          changed = true;
          return { ...item, price: productPrice };
        }
      }
      return item;
    });
    if (changed) cart._save();
  } catch (e) {
    console.warn('Cart reconciliation failed', e);
  }

  function updateHeader() {
    const countEl = document.getElementById('cart-count');
    const totalEl = document.getElementById('cart-total');
    if (countEl) countEl.innerText = String(cart.getCount());
    if (totalEl) totalEl.innerText = `$${cart.getTotal().toFixed(2)}`;
  }

  function addItemToCart(product) {
    const item = {
      id: product.id,
      name: product.name,
      price: Number(product.price) || 0,
    };
    cart.add(item);
    updateHeader();
  }


  try {
    renderProducts(PRODUCTS, 'product-grid');
    renderProducts(PRODUCTS, 'product-container');
  } catch (e) {
    console.warn('Product rendering failed', e);
  }

  renderCartPage(cart, 'cart-container', updateHeader);
  updateHeader();
});

export {};
