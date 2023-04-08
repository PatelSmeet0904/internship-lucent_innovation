import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toast",
  initialState: {
    message: null,
    error: false,
  },
  reducers: {
    showToast(state, action) {
      state.message = action.payload.message;
      state.error = action.payload.error;
    },
    hideToast(state) {
      state.message = null;
      state.error = false;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
