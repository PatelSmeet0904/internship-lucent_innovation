import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  customer: {},
  error: "",
};

// Generates pending, fulfilled and rejected action types
export const getCustomerDetails = createAsyncThunk(
  "customerDetails/getCustomerDetails",
  async ({ token, id }) => {
    const config = {
      headers: {
        authorization: token,
      },
    };
    const { data } = await axios.get(
      `http://localhost:5000/api/customer/${id}`,
      config
    );
    return data;
  }
);

const customerDetailSlice = createSlice({
  name: "customerDetails",
  initialState,
  reducers: {
    updateCustomerProfile: (state, action) => {
      state.customer = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCustomerDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCustomerDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.customer = action.payload;
      state.error = "";
    });
    builder.addCase(getCustomerDetails.rejected, (state, action) => {
      state.loading = false;
      state.customer = {};
      state.error = action.error.message;
    });
  },
});

export const { updateCustomerProfile } = customerDetailSlice.actions;
export default customerDetailSlice.reducer;
