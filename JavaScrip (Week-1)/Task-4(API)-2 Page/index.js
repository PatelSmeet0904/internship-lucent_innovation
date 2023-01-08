//Set the year in footer
// const findYear = () => new Date().getFullYear();
// const yearEl = document.querySelector(".year");
// yearEl.innerHTML = findYear();

//getting html element
const orders = document.getElementById("orders");
const orderDetails = document.getElementById("orderDetails");

//API call
const getOrders = async () => {
  try {
    const res = await fetch(
      "https://cdn.shopify.com/s/files/1/0114/0621/3220/files/orders.json?v=1672828118"
    );
    if (res.status !== 404) {
      const data = await res.json();
      console.log(data.order);
      showAllOrder(data.order);
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
const showOrderDetails = (order) => {
  orders.style.display = "none";
  orderDetails.style.display = "flex";

  const { line_items } = order;
  console.log(line_items);

  //Removing the previous content
  orderDetails.innerHTML = ``;

  //Creating new button inside div for back
  const btnDiv = document.createElement("div");
  btnDiv.innerHTML = `
  <button type="submit" id="back">GO BACK</button>
  `;
  orderDetails.appendChild(btnDiv);

  //Creating new ul inside container
  const ul = document.createElement("ul");
  orderDetails.appendChild(ul);

  //Creating li elements for each product
  line_items.forEach((item, index) => {
    let li = document.createElement("li");

    li.innerHTML = `
            <div class="number">
                <h1>${index + 1})</h1>
            </div>
            <div class="img">
                <img src="https://datainflow.com/wp-content/uploads/2022/10/web-development-coding-programming-internet-technology-business-concept-web-development-coding-programming-internet-technology-121903546.jpg" alt="">
            </div>
            <div class="details">
                <h4>${item.title}</h4>
                <p><b>Quantity:</b> ${item.quantity}</p>
                <p><b>Price:</b> ${item.pre_tax_price}</p>
                <p><b>Tax:</b> ${item.price - item.pre_tax_price}</p>
                <p><b>Total Price:</b> ${item.price}</p>
                <p><b>Delivery Status:</b> ${item.fulfillment_status}</p>
            </div>
    `;
    ul.appendChild(li);
  });

  //This will help us to go back to the orders page
  let back = document.getElementById("back");
  back.onclick = () => showAllOrder(order);
};

//This function will show all the order data
const showAllOrder = (order) => {
  orderDetails.style.display = "none";
  orders.style.display = "flex";

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
                <td>${order.id}</td>
                <td>${order.order_number}</td>
                <td>${order.customer.id}</td>
                <td>${order.total_price} ${order.currency}</td>
                <td>${order.fulfillment_status}</td>
                <td>${order.financial_status}</td>
                <td><button type="submit" id="btn"
                  >View Details</button></td>
            </tr>
        </table>
    `;

  //This will show the order details
  let id = document.getElementById("btn");
  id.onclick = () => showOrderDetails(order);
};
