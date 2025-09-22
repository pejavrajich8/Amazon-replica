// Renders a Tailwind-styled cart + checkout page into an element with id `cart-container`.
// This module only provides markup (HTML + Tailwind classes). No cart business logic is included.
function renderCartPage() {
    const container = document.getElementById('cart-container');
    if (!container) return;

    container.innerHTML = `
        <div class="max-w-6xl mx-auto p-6">
            <div class="mb-6">
                <h1 class="text-2xl font-bold">Shopping Cart</h1>
                <p class="text-sm text-gray-500">Review your items and proceed to checkout.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Items list -->
                <section class="md:col-span-2 bg-white shadow-sm rounded p-6">
                    <h2 class="text-lg font-medium mb-4">Items</h2>

                    <!-- Example item row (duplicate for each cart item) -->
                    <div class="divide-y">
                        <div class="flex items-center justify-between py-4">
                            <div class="flex items-center gap-4">
                                <img class="w-20 h-20 object-cover rounded" src="/public/vite.svg" alt="Product" />
                                <div>
                                    <div class="font-semibold">Product name example</div>
                                    <div class="text-sm text-gray-500">Short description or variant</div>
                                </div>
                            </div>

                            <div class="flex items-center gap-4">
                                <div class="text-sm text-gray-700">$29.99</div>
                                <label class="flex items-center gap-2">
                                    <span class="text-xs text-gray-500">Qty</span>
                                    <input class="w-16 border rounded px-2 py-1 text-sm" type="number" min="1" value="1" />
                                </label>
                                <button class="text-sm text-red-600 hover:underline">Remove</button>
                            </div>
                        </div>

                        <!-- empty state example -->
                        <div class="py-6 text-center text-gray-500">Have items in your cart? They'll appear here.</div>
                    </div>
                </section>

                <!-- Summary / Checkout -->
                <aside class="bg-white shadow-sm rounded p-6">
                    <h2 class="text-lg font-medium mb-4">Order summary</h2>
                    <div class="mb-4">
                        <div class="flex justify-between text-sm text-gray-600">
                            <span>Subtotal</span>
                            <span>$0.00</span>
                        </div>
                        <div class="flex justify-between text-sm text-gray-600 mt-2">
                            <span>Shipping</span>
                            <span>$0.00</span>
                        </div>
                        <div class="flex justify-between font-semibold text-gray-800 mt-4">
                            <span>Total</span>
                            <span>$0.00</span>
                        </div>
                    </div>

                    <form class="space-y-3">
                        <div>
                            <label class="block text-xs text-gray-600">Full name</label>
                            <input class="w-full border rounded px-3 py-2 text-sm" type="text" placeholder="Jane Doe" />
                        </div>
                        <div>
                            <label class="block text-xs text-gray-600">Email</label>
                            <input class="w-full border rounded px-3 py-2 text-sm" type="email" placeholder="you@example.com" />
                        </div>
                        <div>
                            <label class="block text-xs text-gray-600">Address</label>
                            <input class="w-full border rounded px-3 py-2 text-sm" type="text" placeholder="Street, apt, etc." />
                        </div>

                        <div class="flex gap-2">
                            <input class="flex-1 border rounded px-3 py-2 text-sm" type="text" placeholder="City" />
                            <input class="w-24 border rounded px-3 py-2 text-sm" type="text" placeholder="ZIP" />
                        </div>

                        <div>
                            <label class="block text-xs text-gray-600">Card number (mock)</label>
                            <input class="w-full border rounded px-3 py-2 text-sm" type="text" placeholder="4242 4242 4242 4242" />
                        </div>

                        <div class="pt-2">
                            <button type="button" class="w-full bg-blue-600 text-white rounded px-4 py-2 font-medium">Place order</button>
                        </div>
                    </form>
                </aside>
            </div>
        </div>
    `;
}

// expose as default export
export default renderCartPage;

document.addEventListener('DOMContentLoaded', () => {
    // If a dedicated cart container exists on the page, render the cart immediately.
    const container = document.getElementById('cart-container');
    if (container) {
        renderCartPage();
        // ensure the cart is visible on load
        container.scrollIntoView({ behavior: 'auto' });
    }

    document.body.addEventListener('click', (e) => {
        const el = e.target.closest && e.target.closest('.open-cart');
        if (!el) return;

        // If there is no cart container on this page, allow the link to navigate
        // to the dedicated cart page (e.g. /cart.html). If a container exists,
        // prevent default and render the cart in-place.
        const hasContainer = !!document.getElementById('cart-container');
        if (!hasContainer) {
            // Let the link act as a normal anchor navigation
            return;
        }

        e.preventDefault();
        renderCartPage();
        // scroll to cart container
        const c = document.getElementById('cart-container');
        if (c) c.scrollIntoView({ behavior: 'smooth' });
    });
});