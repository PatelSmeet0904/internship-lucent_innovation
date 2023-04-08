import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  customers: {},
  error: "",
};

// Generates pending, fulfilled and rejected action types
export const fetchCustomers = createAsyncThunk(
  "customerList/fetchCustomers",
  async ({ keyword = "", currentPage, token }) => {
    const config = {
      headers: {
        authorization: token,
      },
    };
    const { data } = await axios.get(
      `http://localhost:5000/api/customer?keyword=${keyword}&pageNumber=${currentPage}`,
      config
    );
    return data;
  }
);

const customerListSlice = createSlice({
  name: "customerList",
  initialState,
  reducers: {
    deleteCustomerFromList: (state, action) => {
      state.customers.data = state.customers.data.filter(
        (customer) => customer.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCustomers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCustomers.fulfilled, (state, action) => {
      state.loading = false;
      state.customers = action.payload;
      state.error = "";
    });
    builder.addCase(fetchCustomers.rejected, (state, action) => {
      state.loading = false;
      state.customers = {};
      state.error = action.error;
    });
  },
});

export const { deleteCustomerFromList } = customerListSlice.actions;
export default customerListSlice.reducer;
