import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import UserContext from "../../store/user-context";
import "./ProductScreen.scss";

const ProductScreen = () => {
  const { orderId, productId } = useParams();
  const { orders } = useContext(UserContext);
  const order = orders.nodes.filter(
    (order) => +order.orderNumber === +orderId
  )[0];
  const product = order.lineItems.nodes[productId];
  console.log(productId, product);

  return (
    <>
      {product === undefined ? (
        <div className="productContainer">
          <h1>No Product Found</h1>
          <div className="productInfo">
            <Link className="link" to={`/orders/${orderId}`}>
              <button className="btn">GO BACK</button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="productContainer">
          <h1>Product Details</h1>
          <div className="productInfo">
            <div>
              <Link className="link" to={`/orders/${orderId}`}>
                <button className="btn">GO BACK</button>
              </Link>
              <Link className="link" to={`/`}>
                <button className="btn">GO HOME</button>
              </Link>
            </div>
            <div className="data">
              <div className="img">
                <img
                  src="https://sandpipercomms.com/wp-content/uploads/2021/08/shutterstock_1932042689-scaled.jpg"
                  alt=""
                />
              </div>
              <div className="productDetails">
                <p>
                  <b>Product Name: </b>
                  {product.title}
                </p>
                <p>
                  <b>Quantity: </b>
                  {product.quantity}
                </p>
                <p>
                  <b>Current Quantity: </b>
                  {product.currentQuantity}
                </p>
                <p>
                  <b>Discounted Total Price: </b>
                  {product.discountedTotalPrice.amount}{" "}
                  {product.discountedTotalPrice.currencyCode}
                </p>
                <p>
                  <b>Original Total Price: </b>
                  {product.originalTotalPrice.amount}{" "}
                  {product.originalTotalPrice.currencyCode}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductScreen;
