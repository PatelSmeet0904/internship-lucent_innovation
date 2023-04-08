import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: "",
};

export const createProduct = createAsyncThunk(
  "Product/createProduct",
  async ({ newFormData, token }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };
    await axios.post("http://localhost:5000/api/product", newFormData, config);
  }
);

export const createProductSlice = createSlice({
  name: "Product",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default createProductSlice.reducer;
