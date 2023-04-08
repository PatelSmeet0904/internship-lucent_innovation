import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  products: [],
  error: "",
};

// Generates pending, fulfilled and rejected action types
export const fetchProducts = createAsyncThunk(
  "productList/fetchProducts",
  async ({ token, keyword = "", currentPage = 1 }) => {
    const config = {
      headers: {
        authorization: token,
      },
    };
    const { data } = await axios.get(
      `http://localhost:5000/api/product?keyword=${keyword}&pageNumber=${currentPage}`,
      config
    );
    return data;
  }
);

const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    updateProductList: (state, action) => {
      state.products.data = state.products.data.map((product) => {
        if (product.productId === action.payload.id) {
          product = action.payload.newData;
        }
        return product;
      });
    },
    deleteProductFromList: (state, action) => {
      state.products.data = state.products.data.filter(
        (product) => product.productId !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = "";
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.products = {};
      state.error = action.error.message;
    });
  },
});

export const { updateProductList, deleteProductFromList } =
  productListSlice.actions;
export default productListSlice.reducer;
