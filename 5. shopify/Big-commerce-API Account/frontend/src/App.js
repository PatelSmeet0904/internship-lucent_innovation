import React from "react";
import "@shopify/polaris/build/esm/styles.css";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AppProvider, Frame } from "@shopify/polaris";
import { Link } from "./utils/Link";
import RouteOutlet from "./Routes/RouteOutlet";
// import ToastContainer from "./Components/ToastContainer";

function App() {
  return (
    <BrowserRouter>
      <AppProvider linkComponent={Link}>
        <Frame topBar={<Navbar />}>
          <RouteOutlet />
          {/* <ToastContainer /> */}
        </Frame>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
