import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  product: {},
  error: "",
};

// Generates pending, fulfilled and rejected action types
export const getProductById = createAsyncThunk(
  "productDetails/getProductById",
  async ({ token, id }) => {
    const config = {
      headers: {
        authorization: token,
      },
    };
    const { data } = await axios.get(
      `http://localhost:5000/api/product/${id}`,
      config
    );
    // console.log("1", data.product, data.variants);
    return data;
  }
);

const productDetailSlice = createSlice({
  name: "productDetails",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getProductById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.error = "";
    });
    builder.addCase(getProductById.rejected, (state, action) => {
      state.loading = false;
      state.updateProduct = {};
      state.error = action.error.message;
    });
  },
});

// export const { updateProfile } = productDetailSlice.actions;
export default productDetailSlice.reducer;
