let shop = document.getElementById("shop");

let shopItemsData = [
  {
    id: "item1",
    name: "Denim Jacket",
    price: 85,
    des: "Classic denim jacket with a modern fit. Durable and stylish.",
    img: "images/jacket1.png",
  },
  {
    id: "item2",
    name: "Sneakers",
    price: 60,
    des: "Trendy sneakers built for all-day comfort and casual outings.",
    img: "images/sneaker2.png",
  },
  {
    id: "item3",
    name: "Formal Trousers",
    price: 70,
    des: "Tailored fit trousers ideal for office or formal occasions.",
    img: "images/trouser1.png",
  },
  {
    id: "item4",
    name: "Hoodie",
    price: 50,
    des: "Warm and soft hoodie for cozy comfort in any weather.",
    img: "images/hoodie1.png",
  },
];
let basket = JSON.parse(localStorage.getItem("data")) || [];
let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, price, des, img } = x;
      // Destructuring the object
      let search = basket.find((x) => x.id === id) || [];
      return `
     <div id ="product-id-${id}" class="item">
            <img width="220" src="${img}" alt="">
            <div class="details">
                <h3>${name}</h3>
                <p>${des}</p>
                <div class="price-quantity">
                    <h2>${price}</h2>
                    <div class="buttons">
                        <i onclick="decrement('${id}')" class="bi bi-dash-lg"></i>
                        <div id ="${id}" class="quantity">
                        ${search.item === undefined ? 0 : search.item}</div>
                        <i onclick="increment('${id}')" class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>
        </div>
    `;
    })
    .join(""));
};
generateShop();

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
  // console.log("After Increment:", basket);
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
  // console.log("After Decrement:", basket);
  update(selectedItem);
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  console.log(search.id);
  document.getElementById(id).innerHTML = search.item;
  totalCost();
};

let totalCost = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
totalCost();
