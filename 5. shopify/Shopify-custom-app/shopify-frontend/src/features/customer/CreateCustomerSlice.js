import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  customer: {},
  error: "",
};

export const createCustomer = createAsyncThunk(
  "Customer/createCustomer",
  async ({ newFormData, token }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };
    const { data } = await axios.post(
      "http://localhost:5000/api/customer",
      newFormData,
      config
    );
    console.log(data);
    return data;
  }
);

export const createCustomerSlice = createSlice({
  name: "Customer",
  initialState,
  reducers: {
    setCustomerProfile: (state, action) => {
      state.customer = action.payload;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCustomer.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload;
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCustomerProfile } = createCustomerSlice.actions;
export default createCustomerSlice.reducer;
