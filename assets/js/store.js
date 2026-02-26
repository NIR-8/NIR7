let cart = JSON.parse(localStorage.getItem("cart")) || {};

function addToCart(id) {
  let product = PRODUCTS.find(p => p.id === id);

  if (!product || product.stock <= 0) {
    alert("Out of stock");
    return;
  }

  if (cart[id]) {
    if (cart[id].qty >= product.stock) {
      alert("No more stock available");
      return;
    }
    cart[id].qty++;
  } else {
    cart[id] = { ...product, qty: 1 };
  }

  saveCart();
  renderCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function generateOrderID() {
  return "VQ" + Date.now();
}

function calculateTotals() {
  let subtotal = 0;

  Object.values(cart).forEach(item => {
    subtotal += item.price * item.qty;
  });

  let gst = subtotal * 0.05;
  let delivery = subtotal > 500 ? 0 : 40;

  return {
    subtotal,
    gst,
    delivery,
    total: subtotal + gst + delivery
  };
}

function placeOrder(customer) {

  let orderID = generateOrderID();
  let totals = calculateTotals();

  let order = {
    id: orderID,
    customer,
    items: cart,
    totals,
    status: "Pending",
    date: new Date().toISOString()
  };

  ORDERS.push(order);
  saveOrders();

  // Deduct stock
  Object.values(cart).forEach(item => {
    let product = PRODUCTS.find(p => p.id === item.id);
    product.stock -= item.qty;
  });

  saveProducts();

  sendWhatsApp(order);

  cart = {};
  saveCart();
}

function sendWhatsApp(order) {

  let message = `🛒 *New Order - Vemagal Quick-Mart*\n\n`;
  message += `Order ID: ${order.id}\n\n`;

  Object.values(order.items).forEach((item, i) => {
    message += `${i+1}. ${item.name} x${item.qty}\n`;
  });

  message += `\nTotal: ₹${order.totals.total.toFixed(2)}`;
  message += `\nCustomer: ${order.customer.name}`;
  message += `\nPhone: ${order.customer.phone}`;
  message += `\nAddress: ${order.customer.address}`;

  window.open(
    `https://wa.me/919999999999?text=${encodeURIComponent(message)}`
  );
}