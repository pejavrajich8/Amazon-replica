// components/header.js
// Export a renderHeader function that injects the header HTML into the page.
export function renderHeader(targetId = 'site-header') {
  const html = `
<header class="bg-gray-900 text-white">
  <!-- Header -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <!-- Brand -->
      <div class="flex items-center space-x-4">
        <div class="flex items-center space-x-2">
          <div class="text-yellow-400 text-2xl font-extrabold">Amazon</div>
          <div class="hidden sm:block text-gray-300">Marketplace</div>
        </div>
        <!-- Home button: small icon linking back to the main page -->
        <a href="/" aria-label="Home" class="ml-2 text-gray-300 hover:text-white hidden sm:inline-flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9.5L12 3l9 6.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V9.5z"></path>
          </svg>
        </a>
      </div>

      <!-- Search -->
      <div class="flex-1 px-4">
        <div class="max-w-3xl mx-auto">
          <label for="search" class="sr-only">Search</label>
          <div class="relative">
            <input id="search" name="search" class="block w-full rounded-md py-3 pl-4 pr-14 text-sm text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-300" placeholder="Search" />
            <button aria-label="Search" class="absolute right-0 top-0 bottom-0 bg-yellow-400 hover:bg-yellow-400 text-black px-4 rounded-r-md flex items-center justify-center" style="border-left:1px solid rgba(0,0,0,0.08);">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="6" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Account / Cart -->
      <div class="flex items-center space-x-4">
        <div class="hidden sm:flex sm:items-center sm:space-x-2 text-sm text-gray-300">
          <div class="text-right">
            <div class="font-medium">Returns</div>
            <div class="text-xs">& Orders</div>
          </div>
          <div class="relative">
            <a href="/cart.html" class="open-cart flex items-center space-x-2 bg-gray-800 px-3 py-2 rounded">
              <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4"></path></svg>
              <span class="ml-1">Cart</span>
              <span class="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-700 bg-white rounded-full">3</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>
`;

  const placeholder = document.getElementById(targetId);
  if (placeholder) {
    placeholder.innerHTML = html;
  } else {
    // Fallback: insert at top of body
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    document.body.insertBefore(wrapper, document.body.firstChild);
  }
}

export default renderHeader;
