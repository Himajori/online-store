/* Basic cart helpers for the landing page cart badge */
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

function getCartCount() {
  return Object.values(readCart()).reduce(
    (sum, qty) => sum + Number(qty || 0),
    0
  );
}

function updateCartBadge() {
  const count = getCartCount();
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = String(count);
  });
}

document.addEventListener("DOMContentLoaded", updateCartBadge);
