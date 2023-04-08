import { configureStore } from "@reduxjs/toolkit";
import customerListSlice from "../features/customer/CustomerListSlice";
import customerRegisterSlice from "../features/customer/CreateCustomerSlice";
import customerDetailsSlice from "../features/customer/CustomerByIdSlice";
import updateCustomerProfileSlice from "../features/customer/UpdateProfileSlice";
import deleteCustomerSlice from "../features/customer/DeleteCustomerSlice";

import shopLoginSlice from "../features/shop/LoginSlice";
import toastSlice from "../features/toast/ToastSlice";

import createProductSlice from "../features/product/CreateProductSlice";
import productListSlice from "../features/product/ProductListSlice";
import deleteProductSlice from "../features/product/DeleteProductSlice";
import updateProductSlice from "../features/product/UpdateProductSlice";
import productByIdSlice from "../features/product/ProductByIdSlice";

const reducer = {
  customer: customerDetailsSlice,
  customers: customerListSlice,
  createCustomer: customerRegisterSlice,
  customerUpdate: updateCustomerProfileSlice,
  customerDelete: deleteCustomerSlice,

  shopLogin: shopLoginSlice,
  toast: toastSlice,

  Product: productByIdSlice,
  products: productListSlice,
  createProduct: createProductSlice,
  updateProduct: updateProductSlice,
  productDelete: deleteProductSlice,
};

const ShopFromLocalStorage = sessionStorage.getItem("loggedInShop")
  ? JSON.parse(sessionStorage.getItem("loggedInShop"))
  : {};
const preloadedState = {
  shopLogin: {
    loggedInShop: ShopFromLocalStorage,
    isLoading: false,
    error: null,
  },
};
const store = configureStore({
  reducer,
  preloadedState,
});

export default store;
