// GLOBAL STORE DATABASE

let PRODUCTS = JSON.parse(localStorage.getItem("products")) || [
  {
    id: 1,
    name: "Nandini Milk (500ml)",
    price: 24,
    category: "Dairy",
    stock: 50,
    image: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    name: "Rice (1kg)",
    price: 60,
    category: "Grains",
    stock: 100,
    image: "https://via.placeholder.com/150"
  }
];

let ORDERS = JSON.parse(localStorage.getItem("orders")) || [];

function saveProducts() {
  localStorage.setItem("products", JSON.stringify(PRODUCTS));
}

function saveOrders() {
  localStorage.setItem("orders", JSON.stringify(ORDERS));
}