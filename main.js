let shop = document.getElementById("shop");

let shopItemsData = [
  {
    id: "item1",
    name: "Denim Jacket",
    price: 85,
    des: "Classic denim jacket with a modern fit. Durable and stylish.",
    img: "images/1.jpg",
  },
  {
    id: "item2",
    name: "Sneakers",
    price: 60,
    des: "Trendy sneakers built for all-day comfort and casual outings.",
    img: "images/shirt 1.jpg",
  },
  {
    id: "item3",
    name: "Formal Trousers",
    price: 70,
    des: "Tailored fit trousers ideal for office or formal occasions.",
    img: "images/shirt 2.jpg",
  },
  {
    id: "item4",
    name: "Hoodie",
    price: 50,
    des: "Warm and soft hoodie for cozy comfort in any weather.",
    img: "images/shirt 3.jpg",
  },
];
let basket = [
  {
    id: "item1",
    item: 1,
  },
];
let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, price, des, img } = x; // Destructuring the object
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
                        <div id ="${id}" class="quantity">0</div>
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
  console.log(basket);
};

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem);
  if (search === undefined) {
    basket.push({
      id: selectedItem,
      item: 1,
    });
  } else {
    search.item -= 1;
  }
};
// let update = () => {};
