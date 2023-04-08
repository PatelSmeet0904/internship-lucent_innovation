import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

// Generates pending, fulfilled and rejected action types
export const updateProduct = createAsyncThunk(
  "Product/updateProduct",
  async ({ newFormData, token, id }) => {
    const config = {
      headers: {
        authorization: token,
      },
    };

    await axios.put(
      `http://localhost:5000/api/product/${id}`,
      newFormData,
      config
    );
  }
);

const updateProductSlice = createSlice({
  name: "Product",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default updateProductSlice.reducer;
