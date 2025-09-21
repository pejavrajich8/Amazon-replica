# Marketplace Dashboard (Tailwind-only)

This workspace contains a simple Tailwind-styled dashboard layout with inlined page HTML (components were inlined to keep the project simple).

Files of interest:
- `index.html` - main product listing page (styled with Tailwind)
- `Product.html` - single product detail page (styled only)

Preview locally with Vite (already in package.json):

```bash
npm install
npm run dev
```

Open `http://localhost:5173` (or the URL Vite prints) and navigate to `/Product.html` to see the product page.

Notes:
- Styling uses Tailwind CDN for simplicity; no Tailwind build step is required.
- Components were inlined and the small include loader removed as requested.
