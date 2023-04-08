import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteCustomer = createAsyncThunk(
  "customers/deleteCustomer",
  async ({ id, token }) => {
    const config = {
      headers: {
        authorization: token,
      },
    };
    const response = await axios.delete(
      `http://localhost:5000/api/customer/${id}`,
      config
    );
    console.log("hi", response);
  }
);

const deleteCustomerSlice = createSlice({
  name: "customers",
  initialState: {
    deleteCustomerStatus: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteCustomer.pending, (state) => {
        state.deleteCustomerStatus = true;
        state.error = null;
      })
      .addCase(deleteCustomer.fulfilled, (state) => {
        state.deleteCustomerStatus = false;
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.deleteCustomerStatus = false;
        state.error = action.error.message;
      });
  },
});

export default deleteCustomerSlice.reducer;
