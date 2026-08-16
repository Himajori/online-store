document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("cartContent");
  const confirmBox = document.getElementById("orderConfirm");
  const confirmationNumber = document.getElementById("confirmationNumber");
  if (!content) return;

  let stockMessage = "";

  function renderCart() {
    const lines = getCartLines();

    if (lines.length === 0) {
      content.innerHTML = `
        <div class="cart-table-wrap empty-cart">
          <p>Your cart is empty.</p>
          <div class="actions" style="justify-content:center">
            <a class="btn btn-primary" href="products.html">See More Products</a>
          </div>
        </div>
      `;
      stockMessage = "";
      return;
    }

    const rows = lines
      .map(
        (line) => `
        <tr class="${line.exceedsStock ? "stock-error-row" : ""}">
          <td>${line.id}</td>
          <td>${line.name}</td>
          <td>${formatMoney(line.price)}</td>
          <td>
            <input
              class="qty-input"
              type="number"
              min="0"
              max="${line.onHand}"
              step="1"
              value="${line.quantity}"
              data-product-id="${line.id}"
              aria-label="Quantity for ${line.name}"
            />
            <p class="stock-note">On hand: ${line.onHand}</p>
            ${
              line.exceedsStock
                ? `<p class="message error stock-inline">Quantity exceeds on-hand stock (${line.onHand}).</p>`
                : ""
            }
          </td>
          <td>${formatMoney(line.lineTotal)}</td>
        </tr>
      `
      )
      .join("");

    content.innerHTML = `
      <div class="cart-table-wrap">
        <table class="cart-table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Line total</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
      <p id="stockErrorBanner" class="message error" ${stockMessage ? "" : "hidden"}>${stockMessage || ""}</p>
      <div class="cart-summary">
        <p class="cart-total">Total: <span id="cartTotalAmount">${formatMoney(getCartTotal())}</span></p>
        <div class="actions">
          <button type="button" class="btn btn-primary" id="placeOrderBtn">Place Order</button>
          <button type="button" class="btn btn-danger" id="cancelOrderBtn">Cancel Order</button>
          <a class="btn btn-secondary" href="products.html">See More Products</a>
        </div>
      </div>
    `;

    content.querySelectorAll(".qty-input").forEach((input) => {
      input.addEventListener("input", () => {
        const result = setCartQuantity(input.dataset.productId, input.value);
        stockMessage = result && result.ok === false ? result.error : "";
        renderCart();
      });
    });

    document.getElementById("placeOrderBtn").addEventListener("click", () => {
      if (cartHasStockErrors()) {
        stockMessage =
          "Fix quantities that exceed on-hand stock before placing your order.";
        renderCart();
        return;
      }
      const code = createConfirmationNumber();
      confirmationNumber.textContent = code;
      confirmBox.hidden = false;
      stockMessage = "";
      clearCart();
      renderCart();
    });

    document.getElementById("cancelOrderBtn").addEventListener("click", () => {
      clearCart();
      confirmBox.hidden = true;
      confirmationNumber.textContent = "";
      stockMessage = "";
      renderCart();
    });
  }

  renderCart();
});
