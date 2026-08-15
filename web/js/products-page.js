document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("productGrid");
  if (!grid || typeof PRODUCTS === "undefined") return;

  grid.innerHTML = PRODUCTS.map(
    (product) => `
      <article class="product-card" data-product-id="${product.id}">
        <img src="${product.thumbnail}" alt="${product.name}" width="600" height="600" loading="lazy" />
        <div class="product-card-body">
          <h2>${product.name}</h2>
          <p class="price">${formatMoney(product.price)}</p>
          <p>${product.shortDescription}</p>
          <button type="button" class="btn btn-primary select-btn">Select</button>
          <div class="product-extra" hidden>
            <p><strong>ID:</strong> ${product.id}</p>
            <p>${product.longDescription}</p>
          </div>
        </div>
      </article>
    `
  ).join("");

  grid.querySelectorAll(".select-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".product-card");
      const extra = card.querySelector(".product-extra");
      const open = extra.hasAttribute("hidden");
      grid.querySelectorAll(".product-extra").forEach((el) => el.setAttribute("hidden", ""));
      if (open) {
        extra.removeAttribute("hidden");
        button.textContent = "Hide details";
      } else {
        button.textContent = "Select";
      }
      grid.querySelectorAll(".select-btn").forEach((btn) => {
        if (btn !== button) btn.textContent = "Select";
      });
    });
  });
});
