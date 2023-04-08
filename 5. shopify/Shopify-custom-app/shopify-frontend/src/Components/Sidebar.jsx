import { Navigation } from "@shopify/polaris";
import {
  HomeMajor,
  OrdersMajor,
  ProductsMajor,
  CustomersMajor,
} from "@shopify/polaris-icons";
import React, { useEffect, useState } from "react";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const url = window.location.href.split("/");
    const activeUrl = "/" + url[url.length - 2] + "/" + url[url.length - 1];
    setActiveLink(activeUrl);
  }, []);

  return (
    <Navigation className="sidebar" location="/">
      <Navigation.Section
        items={[
          {
            url: "/admin/dashboard",
            excludePaths: ["#"],
            label: "Dashboard",
            icon: HomeMajor,
            selected: activeLink === "/admin/dashboard" ? true : false,
            onClick: () => setActiveLink("/admin/dashboard"),
          },

          {
            url: "/admin/products",
            excludePaths: ["#"],
            label: "Products",
            icon: ProductsMajor,
            selected: activeLink === "/admin/products" ? true : false,
            onClick: () => setActiveLink("/admin/products"),
          },
          {
            url: "/admin/customers",
            excludePaths: ["#"],
            label: "Customers",
            icon: CustomersMajor,
            selected: activeLink === "/admin/customers" ? true : false,
            onClick: () => setActiveLink("/admin/customers"),
          },
          {
            url: "/admin/orders",
            excludePaths: ["#"],
            label: "Orders",
            icon: OrdersMajor,
            selected: activeLink === "/admin/orders" ? true : false,
            onClick: () => setActiveLink("/admin/orders"),
          },
        ]}
      />
    </Navigation>
  );
};

export default Sidebar;
