import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async ({ id, token }) => {
    const config = {
      headers: {
        authorization: token,
      },
    };
    await axios.delete(`http://localhost:5000/api/product/${id}`, config);
  }
);

const deleteProductSlice = createSlice({
  name: "products",
  initialState: {
    deleteProductStatus: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.deleteProductStatus = "loading";
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.deleteProductStatus = "succeeded";
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.deleteProductStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export default deleteProductSlice.reducer;
