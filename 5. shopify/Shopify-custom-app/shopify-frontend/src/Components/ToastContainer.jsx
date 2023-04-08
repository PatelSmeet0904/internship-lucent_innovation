import { Toast } from "@shopify/polaris";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "../features/toast/ToastSlice";

const ToastContainer = () => {
  const toast = useSelector((state) => state.toast);
  const dispatch = useDispatch();
  return (
    <>
      {toast.message && (
        <Toast
          content={toast.message}
          onDismiss={() => {
            dispatch(hideToast());
          }}
          error={toast.error}
          duration={3000}
        />
      )}
    </>
  );
};

export default ToastContainer;
