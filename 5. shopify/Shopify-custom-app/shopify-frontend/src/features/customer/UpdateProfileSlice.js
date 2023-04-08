import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  updatedCustomer: {},
  error: "",
};

// Generates pending, fulfilled and rejected action types
export const updateCustomer = createAsyncThunk(
  "updateProfile/updateCustomer",
  async ({ updateFormData, token, id }) => {
    const config = {
      headers: {
        authorization: token,
      },
    };
    const { data } = await axios.put(
      `http://localhost:5000/api/customer/${id}`,
      updateFormData,
      config
    );
    return data;
  }
);

const updateProfileSlice = createSlice({
  name: "updateProfile",
  initialState,
  reducers: {
    updateCustomerData: (state, action) => {
      state.loading = false;
      state.updatedCustomer = action.payload;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateCustomer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCustomer.fulfilled, (state, action) => {
      state.loading = false;
      state.updatedCustomer = action.payload;
      state.error = "";
    });
    builder.addCase(updateCustomer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { updateCustomerData } = updateProfileSlice.actions;
export default updateProfileSlice.reducer;
