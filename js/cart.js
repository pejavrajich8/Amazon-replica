const STORAGE_KEY = 'cart-items';

export default class Cart {
  constructor() {
    this.items = this._load();
  }

  _load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      return JSON.parse(raw);
    } catch (e) {
      return [];
    }
  }

  _save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
  }

  _find(id) {
    return this.items.find(item => item.id === id);
  }

  add(product) {
    const existing = this._find(product.id);
    if (existing) {
      existing.qty = (existing.qty || 0) + 1;
    } else {
      this.items.push({ id: product.id, name: product.name, price: Number(product.price) || 0, qty: 1 });
    }
    this._save();
  }

  remove(id) {
    this.items = this.items.filter(item => item.id !== id);
    this._save();
  }

  clear() {
    this.items = [];
    localStorage.removeItem(STORAGE_KEY);
  }

  getCount() {
    return this.items.reduce((sum, item) => sum + (item.qty || 0), 0);
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + (item.qty || 0) * Number(item.price || 0), 0);
  }

  getItems() {
    return this.items.slice();
  }
}
