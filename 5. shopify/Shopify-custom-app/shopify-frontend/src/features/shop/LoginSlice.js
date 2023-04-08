import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loggedInShop: {},
  isLoading: false,
  error: null,
};

export const loginShop = createAsyncThunk(
  "loginShop/login",
  async (shopName, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log(shopName);
      await axios.get(
        `http://localhost:5000/api/shop/login?shopName=${shopName}`,
        config,
        { mode: "no-cors" }
      );
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginShopSlice = createSlice({
  name: "loginShop",
  initialState,
  reducers: {
    setShopData: (state, action) => {
      console.log(action.payload);
      state.loggedInShop = action.payload;
    },
    logout: (state) => {
      state.loggedInShop = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginShop.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginShop.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(loginShop.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setShopData } = loginShopSlice.actions;

export default loginShopSlice.reducer;
