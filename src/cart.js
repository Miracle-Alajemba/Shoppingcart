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
        let search = shopItemsData.find((y) => y.id === id) || [];
        let { img, name, price } = search;
        if (!search) return "";

        return `
<div class="cart-item">
    <img width="100" src="${img}" alt="${name}">
    <div class="details">
    <div class="tittle-price-x">

    <h4 class="title-price">
    <p>${name}</p>
    <p class="cart-item-price">$ ${price}</p>
     </h4>
<i onclick="removeitem(${id})" class="bi bi-x-lg"></i>
    </div>
                     <div class="buttons">
                          <i onclick="decrement('${id}')" class="bi bi-dash-lg"></i>
                          <div id ="${id}" class="quantity">${item}
                         </div>
                          <i onclick="increment('${id}')" class="bi bi-plus-lg"></i>
                      </div>
    <h3>Quantity  $${item * price}</h3>
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

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem);
  if (search === undefined) {
    basket.push({
      id: selectedItem,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  generateCartitems();
  TotalAmount();

  update(selectedItem);
  localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem);
  if (search.item === 0) return;
  //
  else {
    search.item -= 1;
  }
  basket = basket.filter((x) => x.item !== 0);
  generateCartitems();
  TotalAmount();

  update(selectedItem);
  localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  console.log(search.id);
  document.getElementById(id).innerHTML = search.item;
  totalCost();
};

let removeitem = (id) => {
  let selectedItem = id;
  console.log();
  basket = basket.filter((x) => x.id !== selectedItem.id);
  generateCartitems();
  TotalAmount();
  totalCost();
  localStorage.setItem("data", JSON.stringify(basket));
};
let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    label.innerHTML = `<h2>Total Bill : $ ${amount}</h2>
    <button class="checkout"> Checkout</button>
    <button onclick="Clearcart()" class="removeall">Clearcart</button>
    `;
  } else return;
};
TotalAmount();

let Clearcart = () => {
  basket = [];
  generateCartitems();
  localStorage.setItem("data", JSON.stringify(basket));
};
// Clearcart();
let checkout = () => {};