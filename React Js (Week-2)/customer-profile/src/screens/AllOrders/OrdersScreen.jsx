import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../store/user-context";
import "./OrdersScreen.scss";

const OrdersScreen = () => {
  const { loading, orders } = useContext(UserContext);
  console.log(orders.nodes);
  return (
    <div className="ordersContainer">
      <h1>All Orders</h1>
      <Link className="link" to={`/`}>
        <button className="btn">GO HOME</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>ORDER NO.</th>
            <th>PRICE</th>
            <th>PAYMENT STATUS</th>
            <th>TIME</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.nodes.map((order) => (
            <tr key={order.orderNumber}>
              <td>{order.orderNumber}</td>
              <td>{order.originalTotalPrice.amount}</td>
              <td>{order.financialStatus}</td>
              <td>{order.processedAt}</td>
              <td>
                <Link className="link" to={`/orders/${order.orderNumber}`}>
                  <button className="btn">Details</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersScreen;
