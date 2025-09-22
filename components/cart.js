class Cart {
    constructor() {
        this.items = [];
    }

    get total() {
        // return numeric total of item prices
        return this.items.reduce((sum, item) => sum + (item.price || 0), 0);
    }

    // legacy method kept for compatibility
    addItem(product) {
        this.items.push(product);
    }

    // used by Product.js (cart.addToCart(...))
    addToCart(product) {
        this.addItem(product);
        this.render();
    }

    removeItem(product) {
        this.items = this.items.filter(item => item !== product);
        this.render();
    }

    getItems() {
        return this.items;
    }

    render() {
        const container = document.getElementById("cart-container");
        if (!container) return; // nothing to render

        const itemsHtml = this.items.length
            ? this.items.map((it, idx) => `
                <div class="cart-item" data-idx="${idx}">
                    <span class="cart-name">${it.name}</span>
                    <span class="cart-price">$${(it.price || 0).toFixed(2)}</span>
                    <button class="cart-remove" data-idx="${idx}">Remove</button>
                </div>`).join("")
            : '<div class="cart-empty">Cart is empty</div>';

        container.innerHTML = `
        <h2>Shopping Cart</h2>
        <div class="cart-items">${itemsHtml}</div>
        <div class="cart-total">Total: $${this.total.toFixed(2)}</div>`;

        // attach remove handlers
        container.querySelectorAll('.cart-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = Number(btn.dataset.idx);
                const item = this.items[idx];
                if (item) this.removeItem(item);
            });
        });
    }
};

const cart = new Cart()
export default cart;