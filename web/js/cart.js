/* Cart helpers — badge + add to cart */
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

function updateCartBadge() {
  const count = getCartCount();
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = String(count);
  });
}

document.addEventListener("DOMContentLoaded", updateCartBadge);
