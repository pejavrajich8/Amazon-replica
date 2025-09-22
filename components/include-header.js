// components/include-header.js
// Fetches components/header.html and injects it into any element with id 'site-header'
// This keeps the header in one file used by multiple pages.

(async function loadHeader(){
  try {
    const resp = await fetch('/components/header.html');
    if (!resp.ok) return console.warn('Could not load header:', resp.status);
    const html = await resp.text();
    const placeholder = document.getElementById('site-header');
    if (placeholder) placeholder.innerHTML = html;
  } catch (err) {
    console.error('Error loading header:', err);
  }
})();
