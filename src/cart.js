let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");
let basket = JSON.parse(localStorage.getItem("data")) || [];

let totalCost = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
totalCost();

let generateCartitems = () => {
  if (basket.length !== 0) {
    ShoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id);
        if (!search) return "";

        return `
<div class="cart-item">
    <img width="100" src="${search.img}" alt="${search.name}">
    <div class="details">
        <h4>${search.name}</h4>
        <p>Price: $${search.price}</p>
        <p>Quantity: ${item}</p>
    </div>
</div>
`;
      })
      .join("");
  } else {
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
<h2>Cart is Empty</h2>
<a href="index.html"><button class="HomeBtn">Back to Home</button></a>
`;
  }
};
generateCartitems();
