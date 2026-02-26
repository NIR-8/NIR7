const ADMIN_PASSWORD = "vemagal123";

function login(password) {
  if (password === ADMIN_PASSWORD) {
    document.getElementById("adminPanel").style.display = "block";
  } else {
    alert("Wrong password");
  }
}

function addProduct(data) {
  data.id = Date.now();
  PRODUCTS.push(data);
  saveProducts();
  alert("Product added");
}

function updateOrderStatus(orderID, status) {
  let order = ORDERS.find(o => o.id === orderID);
  if (order) {
    order.status = status;
    saveOrders();
  }
}

function getLowStockProducts() {
  return PRODUCTS.filter(p => p.stock < 10);
}

function getTodaySales() {
  let today = new Date().toISOString().split("T")[0];
  return ORDERS.filter(o => o.date.startsWith(today));
}