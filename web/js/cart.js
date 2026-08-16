/* Cart helpers for badge, add, update, clear, and totals */
const CART_KEY = "harborline-cart";

function readCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function getCartCount() {
  return Object.values(readCart()).reduce(
    (sum, qty) => sum + Number(qty || 0),
    0
  );
}

function addToCart(productId, quantity = 1) {
  const cart = readCart();
  const next = Number(cart[productId] || 0) + Number(quantity);
  cart[productId] = Math.max(1, next);
  writeCart(cart);
  return cart;
}

function setCartQuantity(productId, quantity) {
  const cart = readCart();
  const qty = Number(quantity);
  if (!Number.isFinite(qty) || qty <= 0) {
    delete cart[productId];
  } else {
    cart[productId] = Math.floor(qty);
  }
  writeCart(cart);
  return cart;
}

function clearCart() {
  writeCart({});
}

function getCartLines() {
  const cart = readCart();
  return Object.entries(cart)
    .map(([id, quantity]) => {
      const product = getProductById(id);
      if (!product) return null;
      const qty = Number(quantity);
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: qty,
        lineTotal: product.price * qty,
      };
    })
    .filter(Boolean);
}

function getCartTotal() {
  return getCartLines().reduce((sum, line) => sum + line.lineTotal, 0);
}

function createConfirmationNumber() {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.floor(Math.random() * 900 + 100);
  return `HL-${stamp}-${rand}`;
}

function updateCartBadge() {
  const count = getCartCount();
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = String(count);
  });
}

document.addEventListener("DOMContentLoaded", updateCartBadge);
