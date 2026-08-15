/* Basic product list used by the store scripts */
const PRODUCTS = [
  {
    id: "HL-101",
    name: "Ceramic Pour-Over Mug",
    price: 18.0,
    shortDescription: "Matte stoneware mug sized for a slow morning pour.",
    longDescription: "Hand-finished stoneware mug for daily coffee or tea.",
    thumbnail:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&h=600&fit=crop",
  },
  {
    id: "HL-204",
    name: "Field Notebook",
    price: 12.5,
    shortDescription: "Pocket notebook with numbered pages and a cloth cover.",
    longDescription: "A5 softcover notebook with dotted pages.",
    thumbnail:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=600&fit=crop",
  },
];

function getProductById(id) {
  return PRODUCTS.find((product) => product.id === id) || null;
}

function formatMoney(amount) {
  return `$${Number(amount).toFixed(2)}`;
}
