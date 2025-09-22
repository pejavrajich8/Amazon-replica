import Product from "../components/Product.js";
import { renderHeader } from "../components/header.js";

// Render the shared header into the placeholder
document.addEventListener('DOMContentLoaded', () => {
	try {
		renderHeader('site-header');
	} catch (err) {
		console.error('Header render failed:', err);
	}
});


const productContainer = document.getElementById("product-container");

const product1 = new Product("Laptop", "High ", 999);
product1.render(productContainer);


const product2 = new Product("Laptop", "High ", 999);
product1.render(productContainer);


const product3 = new Product("Laptop", "High ", 999);
product1.render(productContainer);