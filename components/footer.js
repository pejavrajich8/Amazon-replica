// components/footer.js
// Renders the site footer into an element with id `site-footer` or inserts at the end of document.body.
export function renderFooter(targetId = 'site-footer') {
  const html = `
<footer class="bg-gray-100 text-gray-700">
  <div class="max-w-7xl mx-auto px-4 py-6 text-sm">
    <div class="flex items-center justify-between">
      <!-- Copyright text -->
      <div>© 2025 Demo Marketplace</div>
      <!-- Footer links (visual only) -->
      <div class="space-x-4">
        <a class="text-gray-500 hover:text-gray-900">Privacy</a>
        <a class="text-gray-500 hover:text-gray-900">Terms</a>
      </div>
    </div>
  </div>
</footer>
`;

  const placeholder = document.getElementById(targetId);
  if (placeholder) {
    placeholder.innerHTML = html;
    return;
  }

  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  document.body.appendChild(wrapper.firstElementChild);
}

export default renderFooter;
