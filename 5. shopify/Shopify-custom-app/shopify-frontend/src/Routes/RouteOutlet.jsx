import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../Pages/dashboard/Dasboard";
import CustomerList from "../Pages/customer/CustomerList";
import OrderList from "../Pages/order/OrderList";
import ProductList from "../Pages/product/ProductList";
import CreateProduct from "../Pages/product/CreateProduct";
import UpdateProduct from "../Pages/product/UpdateProduct";
import CreateCustomer from "../Pages/customer/CreateCustomer";
import UpdateCustomer from "../Pages/customer/UpdateCustomer";

const RouteOutlet = () => {
  return (
    <Routes>
      <Route path="/admin/dashboard" element={<Dashboard />}></Route>
      <Route path="/admin/products" element={<ProductList />}></Route>
      <Route path="/admin/product" element={<CreateProduct />}></Route>
      <Route path="/admin/product/:id" element={<UpdateProduct />}></Route>
      <Route path="/admin/customers" element={<CustomerList />}></Route>
      <Route path="/admin/customer" element={<CreateCustomer />}></Route>
      <Route path="/admin/customer/:id" element={<UpdateCustomer />}></Route>
      <Route path="/admin/orders" element={<OrderList />}></Route>
      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
};

export default RouteOutlet;
