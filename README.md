# Simple Online Store (Harborline)

HTML / CSS / JavaScript store: landing page → products → details → cart → place or cancel order.

## Open the site

Open `web/index.html` in a browser (or use Live Server).

## Pages

| Page | File | What it does |
|------|------|----------------|
| Landing | `web/index.html` | Brand hero + **View Products** + **Shopping Cart** |
| Products | `web/products.html` | Product cards (thumbnail, name, price, short description, **Select**) |
| Product Details | `web/product.html?id=...` | Full details, **Add to Cart**, **See More Products** |
| Shopping Cart | `web/cart.html` | Quantities, addresses, payment, totals, **Place Order** / **Cancel Order** |

## Inventory

Products live in `web/js/products-data.js` as an array of JavaScript objects. The cart is saved in `localStorage`.

## Stack

**HTML, CSS, and JavaScript** (plus a small React CDN cart widget). No backend database.
