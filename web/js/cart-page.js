document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("cartContent");
  const confirmBox = document.getElementById("orderConfirm");
  const confirmationNumber = document.getElementById("confirmationNumber");
  const confirmDetails = document.getElementById("confirmDetails");
  if (!content) return;

  let stockMessage = "";
  let addressMessage = "";
  const addressState = {
    billName: "",
    billStreet: "",
    billCity: "",
    billState: "",
    billZip: "",
    shipName: "",
    shipStreet: "",
    shipCity: "",
    shipState: "",
    shipZip: "",
    sameAsBilling: true,
  };

  function readAddressFields() {
    const form = document.getElementById("checkoutAddresses");
    if (!form) return;
    addressState.billName = form.billName.value.trim();
    addressState.billStreet = form.billStreet.value.trim();
    addressState.billCity = form.billCity.value.trim();
    addressState.billState = form.billState.value.trim();
    addressState.billZip = form.billZip.value.trim();
    addressState.sameAsBilling = form.sameAsBilling.checked;
    if (addressState.sameAsBilling) {
      addressState.shipName = addressState.billName;
      addressState.shipStreet = addressState.billStreet;
      addressState.shipCity = addressState.billCity;
      addressState.shipState = addressState.billState;
      addressState.shipZip = addressState.billZip;
    } else {
      addressState.shipName = form.shipName.value.trim();
      addressState.shipStreet = form.shipStreet.value.trim();
      addressState.shipCity = form.shipCity.value.trim();
      addressState.shipState = form.shipState.value.trim();
      addressState.shipZip = form.shipZip.value.trim();
    }
  }

  function addressesComplete() {
    const billOk =
      addressState.billName &&
      addressState.billStreet &&
      addressState.billCity &&
      addressState.billState &&
      addressState.billZip;
    const shipOk =
      addressState.shipName &&
      addressState.shipStreet &&
      addressState.shipCity &&
      addressState.shipState &&
      addressState.shipZip;
    return Boolean(billOk && shipOk);
  }

  function formatAddress(prefix) {
    return [
      addressState[`${prefix}Name`],
      addressState[`${prefix}Street`],
      `${addressState[`${prefix}City`]}, ${addressState[`${prefix}State`]} ${addressState[`${prefix}Zip`]}`,
    ]
      .filter(Boolean)
      .join("\n");
  }

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
      addressMessage = "";
      return;
    }

    const subtotal = getCartTotal();
    const shipping = getShippingCharge(subtotal);
    const tax = getSalesTax(subtotal);
    const orderTotal = getOrderTotal(subtotal);

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

    const shipDisabled = addressState.sameAsBilling ? "disabled" : "";

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

      <form id="checkoutAddresses" class="address-grid" autocomplete="shipping">
        <fieldset class="address-card">
          <legend>Bill to</legend>
          <label>Full name<input name="billName" type="text" value="${addressState.billName}" required /></label>
          <label>Street<input name="billStreet" type="text" value="${addressState.billStreet}" required /></label>
          <label>City<input name="billCity" type="text" value="${addressState.billCity}" required /></label>
          <div class="address-row">
            <label>State<input name="billState" type="text" value="${addressState.billState}" required /></label>
            <label>ZIP<input name="billZip" type="text" value="${addressState.billZip}" required /></label>
          </div>
        </fieldset>

        <fieldset class="address-card">
          <legend>Ship to</legend>
          <label class="checkbox-line">
            <input name="sameAsBilling" type="checkbox" ${addressState.sameAsBilling ? "checked" : ""} />
            Same as bill-to address
          </label>
          <label>Full name<input name="shipName" type="text" value="${addressState.shipName}" ${shipDisabled} required /></label>
          <label>Street<input name="shipStreet" type="text" value="${addressState.shipStreet}" ${shipDisabled} required /></label>
          <label>City<input name="shipCity" type="text" value="${addressState.shipCity}" ${shipDisabled} required /></label>
          <div class="address-row">
            <label>State<input name="shipState" type="text" value="${addressState.shipState}" ${shipDisabled} required /></label>
            <label>ZIP<input name="shipZip" type="text" value="${addressState.shipZip}" ${shipDisabled} required /></label>
          </div>
        </fieldset>
      </form>
      <p id="addressErrorBanner" class="message error" ${addressMessage ? "" : "hidden"}>${addressMessage || ""}</p>

      <div class="cart-summary totals-block">
        <div class="totals-lines">
          <p>Subtotal: <strong>${formatMoney(subtotal)}</strong></p>
          <p>Shipping: <strong>${shipping === 0 ? "Free" : formatMoney(shipping)}</strong></p>
          <p>Sales tax (8%): <strong>${formatMoney(tax)}</strong></p>
          <p class="cart-total">Order total: <span id="cartTotalAmount">${formatMoney(orderTotal)}</span></p>
          <p class="shipping-hint">Shipping is $7.50, or free on merchandise of $75+. Sales tax is 8% of the merchandise subtotal.</p>
        </div>
        <div class="actions">
          <button type="button" class="btn btn-primary" id="placeOrderBtn">Place Order</button>
          <button type="button" class="btn btn-danger" id="cancelOrderBtn">Cancel Order</button>
          <a class="btn btn-secondary" href="products.html">See More Products</a>
        </div>
      </div>
    `;

    const form = document.getElementById("checkoutAddresses");
    form.addEventListener("input", () => {
      readAddressFields();
      if (addressState.sameAsBilling) {
        form.shipName.value = addressState.billName;
        form.shipStreet.value = addressState.billStreet;
        form.shipCity.value = addressState.billCity;
        form.shipState.value = addressState.billState;
        form.shipZip.value = addressState.billZip;
      }
    });
    form.sameAsBilling.addEventListener("change", () => {
      readAddressFields();
      renderCart();
    });

    content.querySelectorAll(".qty-input").forEach((input) => {
      input.addEventListener("input", () => {
        readAddressFields();
        const result = setCartQuantity(input.dataset.productId, input.value);
        stockMessage = result && result.ok === false ? result.error : "";
        renderCart();
      });
    });

    document.getElementById("placeOrderBtn").addEventListener("click", () => {
      readAddressFields();
      if (cartHasStockErrors()) {
        stockMessage =
          "Fix quantities that exceed on-hand stock before placing your order.";
        addressMessage = "";
        renderCart();
        return;
      }
      if (!addressesComplete()) {
        addressMessage = "Enter complete bill-to and ship-to addresses before placing your order.";
        renderCart();
        return;
      }

      const code = createConfirmationNumber();
      confirmationNumber.textContent = code;
      if (confirmDetails) {
        confirmDetails.innerHTML = `
          <p><strong>Bill to</strong></p>
          <pre>${formatAddress("bill")}</pre>
          <p><strong>Ship to</strong></p>
          <pre>${formatAddress("ship")}</pre>
          <p>Subtotal ${formatMoney(subtotal)} · Shipping ${shipping === 0 ? "Free" : formatMoney(shipping)} · Tax ${formatMoney(tax)} · Total ${formatMoney(orderTotal)}</p>
        `;
      }
      confirmBox.hidden = false;
      stockMessage = "";
      addressMessage = "";
      clearCart();
      renderCart();
    });

    document.getElementById("cancelOrderBtn").addEventListener("click", () => {
      clearCart();
      confirmBox.hidden = true;
      confirmationNumber.textContent = "";
      if (confirmDetails) confirmDetails.innerHTML = "";
      stockMessage = "";
      addressMessage = "";
      renderCart();
    });
  }

  renderCart();
});
