const productList = document.querySelector(".product-list");

const products = [];
const testProduct = {
  img: "img/dog_food.png",
  product: "Ração X",
  price: "R$ 12,34",
  href: "#",
};

for (let i = 0; i < 20; i++) products.push(testProduct);

products.forEach(product => {
  productList.innerHTML += `
    <div class="card">
      <img src="${product.img}" alt="dog food" class="promo-card-img" />
      <div class="product-price">
        <div class="card-product">${product.product}</div>
        <div class="card-price">${product.price}</div>
      </div>
    </div>
  `;
});
