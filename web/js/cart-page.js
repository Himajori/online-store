document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("cartContent");
  const confirmBox = document.getElementById("orderConfirm");
  const confirmationNumber = document.getElementById("confirmationNumber");
  if (!content) return;

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
      return;
    }

    const rows = lines
      .map(
        (line) => `
        <tr>
          <td>${line.id}</td>
          <td>${line.name}</td>
          <td>${formatMoney(line.price)}</td>
          <td>
            <input
              class="qty-input"
              type="number"
              min="0"
              step="1"
              value="${line.quantity}"
              data-product-id="${line.id}"
              aria-label="Quantity for ${line.name}"
            />
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
        setCartQuantity(input.dataset.productId, input.value);
        renderCart();
      });
    });

    document.getElementById("placeOrderBtn").addEventListener("click", () => {
      const code = createConfirmationNumber();
      confirmationNumber.textContent = code;
      confirmBox.hidden = false;
      clearCart();
      renderCart();
    });

    document.getElementById("cancelOrderBtn").addEventListener("click", () => {
      clearCart();
      confirmBox.hidden = true;
      confirmationNumber.textContent = "";
      renderCart();
    });
  }

  renderCart();
});
