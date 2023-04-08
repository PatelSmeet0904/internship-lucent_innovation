import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AppProvider, Frame } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppProvider>
    <Frame>
      <App />
    </Frame>
  </AppProvider>
);
