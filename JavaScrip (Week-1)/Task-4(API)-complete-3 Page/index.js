//getting html element
let loader = document.getElementById("loader");
let orders = document.getElementById("orders");
let header = document.querySelector("header");

let allOrders;

//API call
const getOrders = async () => {
  try {
    const res = await fetch(
      "https://cdn.shopify.com/s/files/1/0114/0621/3220/files/orders.json?v=1672828118"
    );
    if (res.status !== 404) {
      const data = await res.json();
      allOrders = data.order;
      showAllOrder();
      console.log(allOrders);
    }
  } catch (error) {
    console.log("ERROR:", error);
  }

  //   fetch(
  //     "https://cdn.shopify.com/s/files/1/0114/0621/3220/files/orders.json?v=1672828118"
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       showData(data);
  //     });
};

//function call
getOrders();

//this will show the single order details
let showOrderDetails = (id) => {
  const { line_items } = allOrders;
  console.log(id, line_items);

  header.textContent = "Product Details";

  let product = line_items.filter((item) => item.id === id)[0];
  console.log(product);

  let box = `
    <div class="detailsBox">
      <div id="btn">
        <button type="submit" id="btn" onclick="showOrderProducts()">GO BACK</button>
      </div>  
    `;

  box += `
    <div class="productInfo">
      <div class="img">
          <img src="https://datainflow.com/wp-content/uploads/2022/10/web-development-coding-programming-internet-technology-business-concept-web-development-coding-programming-internet-technology-121903546.jpg" alt="">
      </div>
      <div class="details">
          <h4>${product.title}</h4>
          <hr>
          <p><b>Product ID:</b> ${product.product_id}</p>
          <p><b>Vendor:</b> ${product.vendor}</p>
          <p><b>Quantity:</b> ${product.quantity}</p>
          <p><b>is product in stock? </b> ${
            product.product_exists ? "Yes" : "No"
          }</p>
          <p><b>Delivery Status:</b> ${product.fulfillment_status}</p>
          <br><h4>Price Calculation:-</h4><br>
          <p><b>Price:</b> ${product.pre_tax_price} USD</p>
          <p><b>Tax:</b> ${product.price - product.pre_tax_price} USD</p>
          <hr>
          <p><b>Total Price:</b> ${product.price} USD</p>
      </div>
    </div>
  </div>
  `;

  orders.innerHTML = box;
};

//This function will show the the product data as table
let showOrderProducts = () => {
  const { line_items } = allOrders;

  header.textContent = "Order Items";

  let table = `
    <button type="submit" id="back" onclick="showAllOrder()">GO BACK</button>
  `;

  table += `<table>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Total Price</th>
                <th>Quntity</th>
                <th></th>
            </tr>`;

  line_items.map((item) => {
    table += `
        <tr>
            <td>${item.id}</td>
            <td>${item.title}</td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
            <td><button type="submit" onclick="showOrderDetails(${item.id})">More Details</button></td>
        </tr>
    `;
  });

  table += `        
        </table>
    `;

  orders.innerHTML = table;
};

const setDisplay = () => {
  setTimeout(() => {
    loader.style.display = "none";
    header.style.display = "block";
    orders.style.display = "flex";
  }, 800);
};

//This function will show all the order data
const showAllOrder = () => {
  setDisplay();
  header.textContent = "All orders";

  orders.innerHTML = `
        <table>
            <tr>
                <th>ID</th>
                <th>Order Number</th>
                <th>Customer ID</th>
                <th>Total Price</th>
                <th>Fulfill</th>
                <th>Payment Status</th>
                <th></th>
            </tr>
            <tr>
                <td>${allOrders.id}</td>
                <td>${allOrders.order_number}</td>
                <td>${allOrders.customer.id}</td>
                <td>${allOrders.total_price} ${allOrders.currency}</td>
                <td>${allOrders.fulfillment_status}</td>
                <td>${allOrders.financial_status}</td>
                <td><button type="submit" onclick="showOrderProducts()">View Details</button></td>
            </tr>
        </table>
    `;
};
