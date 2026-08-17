/* Cart helpers for badge, add, update, clear, totals, and stock checks */
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
  window.dispatchEvent(new CustomEvent("cart-updated"));
}

function getOnHand(productId) {
  const product = getProductById(productId);
  const onHand = product ? Number(product.onHand) : 0;
  return Number.isFinite(onHand) ? Math.max(0, onHand) : 0;
}

function getCartCount() {
  return Object.values(readCart()).reduce(
    (sum, qty) => sum + Number(qty || 0),
    0
  );
}

function addToCart(productId, quantity = 1) {
  const cart = readCart();
  const onHand = getOnHand(productId);
  const current = Number(cart[productId] || 0);
  const requested = current + Number(quantity);
  if (requested > onHand) {
    return {
      ok: false,
      error: `Only ${onHand} on hand. You already have ${current} in your cart.`,
      onHand,
    };
  }
  cart[productId] = Math.max(1, requested);
  writeCart(cart);
  return { ok: true, onHand };
}

function setCartQuantity(productId, quantity) {
  const cart = readCart();
  const qty = Number(quantity);
  const onHand = getOnHand(productId);

  if (!Number.isFinite(qty) || qty <= 0) {
    delete cart[productId];
    writeCart(cart);
    return { ok: true, onHand };
  }

  const next = Math.floor(qty);
  if (next > onHand) {
    cart[productId] = onHand;
    writeCart(cart);
    return {
      ok: false,
      error: `Only ${onHand} on hand for this product. Quantity was limited to ${onHand}.`,
      onHand,
      quantity: onHand,
    };
  }

  cart[productId] = next;
  writeCart(cart);
  return { ok: true, onHand, quantity: next };
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
      const onHand = getOnHand(id);
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: qty,
        onHand,
        exceedsStock: qty > onHand,
        lineTotal: product.price * qty,
      };
    })
    .filter(Boolean);
}

function cartHasStockErrors() {
  return getCartLines().some((line) => line.exceedsStock);
}

function getCartTotal() {
  return getCartLines().reduce((sum, line) => sum + line.lineTotal, 0);
}

/** Flat shipping: $7.50, free when merchandise subtotal is $75+ */
function getShippingCharge(subtotal = getCartTotal()) {
  const amount = Number(subtotal) || 0;
  if (amount <= 0) return 0;
  if (amount >= 75) return 0;
  return 7.5;
}

/** Sales tax on merchandise subtotal (not shipping) */
const SALES_TAX_RATE = 0.08;

function getSalesTax(subtotal = getCartTotal()) {
  const amount = Number(subtotal) || 0;
  if (amount <= 0) return 0;
  return Math.round(amount * SALES_TAX_RATE * 100) / 100;
}

function getDiscountAmount(subtotal, discountValue = 0) {
  const amount = Number(subtotal) || 0;
  const discount = Math.max(0, Number(discountValue) || 0);
  return Math.min(amount, Math.round(discount * 100) / 100);
}

function getCreditAmount(creditValue = 0) {
  return Math.max(0, Math.round((Number(creditValue) || 0) * 100) / 100);
}

function getOrderTotal(
  subtotal = getCartTotal(),
  discountValue = 0,
  creditValue = 0
) {
  const shipping = getShippingCharge(subtotal);
  const tax = getSalesTax(subtotal);
  const discount = getDiscountAmount(subtotal, discountValue);
  const credit = getCreditAmount(creditValue);
  const total = Number(subtotal) - discount + shipping + tax - credit;
  return Math.max(0, Math.round(total * 100) / 100);
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
  document.querySelectorAll(".react-cart-toggle span").forEach((el) => {
    el.textContent = String(count);
  });
}

document.addEventListener("DOMContentLoaded", updateCartBadge);
