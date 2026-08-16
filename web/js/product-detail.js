document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("productDetail");
  if (!root) return;

  const params = new URLSearchParams(window.location.search);
  const product = getProductById(params.get("id"));

  if (!product) {
    root.innerHTML = `
      <div class="page-head">
        <h1>Product not found</h1>
        <p>That item is not in the catalog.</p>
        <div class="actions">
          <a class="btn btn-primary" href="products.html">See More Products</a>
        </div>
      </div>
    `;
    return;
  }

  document.title = `${product.name} — Harborline`;
  const onHand = getOnHand(product.id);

  root.innerHTML = `
    <article class="detail">
      <div class="detail-media">
        <img src="${product.thumbnail}" alt="${product.name}" width="800" height="800" />
      </div>
      <div class="detail-body">
        <h1>${product.name}</h1>
        <p class="price">${formatMoney(product.price)}</p>
        <div class="meta">
          <span>Product ID: <strong>${product.id}</strong></span>
          <span>On hand: <strong>${onHand}</strong></span>
        </div>
        <p class="detail-copy">${product.shortDescription}</p>
        <p class="detail-copy detail-long">${product.longDescription}</p>
        <div class="actions">
          <button type="button" class="btn btn-primary" id="addToCartBtn">Add to Cart</button>
          <a class="btn btn-secondary" href="products.html">See More Products</a>
        </div>
        <p id="cartMessage" class="message" hidden>Added to your shopping cart.</p>
        <p id="stockMessage" class="message error" hidden></p>
      </div>
    </article>
  `;

  const message = document.getElementById("cartMessage");
  const stockMessage = document.getElementById("stockMessage");
  document.getElementById("addToCartBtn").addEventListener("click", () => {
    const result = addToCart(product.id, 1);
    if (result && result.ok === false) {
      message.hidden = true;
      stockMessage.textContent = result.error;
      stockMessage.hidden = false;
      return;
    }
    stockMessage.hidden = true;
    message.hidden = false;
  });
});
