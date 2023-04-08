import React, { useContext } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import UserContext from "../../store/user-context";
import "../AllOrders/OrdersScreen.scss";

const Products = () => {
  const { orderId } = useParams();
  const { orders } = useContext(UserContext);
  const order = orders.nodes.filter((order) => +order.orderNumber === +orderId);
  console.log({ orderId });
  let products;
  if (order.length > 0) {
    products = order[0].lineItems.nodes;
    console.log(orderId, products);
  }

  return (
    <>
      {order.length === 0 ? (
        <div className="productsContainer">
          <h1>No Order Found</h1>
          <Link className="link" to={`/orders`}>
            <button className="btn">GO BACK</button>
          </Link>
        </div>
      ) : (
        <div className="productsContainer">
          <h1>All Products of Order No. {orderId}</h1>
          <Link className="link" to={`/orders`}>
            <button className="btn">GO BACK</button>
          </Link>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>VIEW DETAILS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{product.title}</td>
                  <td>{product.originalTotalPrice.amount}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <Link className="link" to={`/orders/${orderId}/${index}`}>
                      <button className="btn">More Details</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Products;
