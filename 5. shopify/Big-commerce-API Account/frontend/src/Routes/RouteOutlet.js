import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import ClaimPage from "../pages/ClaimPage";
import ProtectionFees from "../pages/ProtectionFees";
import Orders from "../pages/Orders";

const RouteOutlet = () => {
  return (
    <Routes>
      <Route path="/admin/dashboard" element={<Dashboard />}></Route>
      <Route path="/admin/order" element={<Orders />}></Route>
      <Route path="/admin/claim-request" element={<ClaimPage />}></Route>
      <Route
        path="/admin/insurance-plan-type-list"
        element={<ProtectionFees />}
      ></Route>
      {/* <Route path="/admin/customers" element={<CustomerList />}></Route>
      <Route path="/admin/customer" element={<CreateCustomer />}></Route>
      <Route path="/admin/customer/:id" element={<UpdateCustomer />}></Route>
      <Route path="/admin/orders" element={<OrderList />}></Route> */}
      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
};

export default RouteOutlet;
