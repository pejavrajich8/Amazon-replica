class Cart {
    constructor() {
        this.items = [];
    }

    get total() {
        return this.items 
    }

    addItem(product) {
        this.items.push(product);
    }

    removeItem(product) {
        this.items = this.items.filter(item => item !== product);
        this.render();
    }

    getItems() {
        return this.items 
    }

    render() {
        const container = document.getElementById("cart-container");
        container.innerHTML =`
        <h2>Shopping Cart</h2>
        <div>${this.total}</div>`;
    }
};

const cart = new Cart()
export default cart;