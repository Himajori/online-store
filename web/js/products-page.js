document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("productGrid");
  if (!grid || typeof PRODUCTS === "undefined") return;

  grid.innerHTML = PRODUCTS.map(
    (product) => `
      <article class="product-card">
        <img src="${product.thumbnail}" alt="${product.name}" width="600" height="600" loading="lazy" />
        <div class="product-card-body">
          <h2>${product.name}</h2>
          <p class="price">${formatMoney(product.price)}</p>
          <p>${product.shortDescription}</p>
          <a class="btn btn-primary" href="product.html?id=${encodeURIComponent(product.id)}">Select</a>
        </div>
      </article>
    `
  ).join("");
});
