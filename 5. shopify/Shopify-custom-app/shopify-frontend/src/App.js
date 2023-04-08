import React, { useState } from "react";
import "@shopify/polaris/build/esm/styles.css";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { AppProvider, Frame } from "@shopify/polaris";
import Sidebar from "./Components/Sidebar";
import { Link } from "./utils/Link";
import RouteOutlet from "./Routes/RouteOutlet";
import { logo } from "./utils/Logo";
import ToastContainer from "./Components/ToastContainer";

function App() {
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

  const toggle = () => {
    setMobileNavigationActive((prev) => !prev);
  };

  return (
    <BrowserRouter>
      <AppProvider linkComponent={Link}>
        <Frame
          topBar={<Navbar toggle={toggle} />}
          navigation={<Sidebar />}
          logo={logo}
          showMobileNavigation={mobileNavigationActive}
          onNavigationDismiss={setMobileNavigationActive}
        >
          <RouteOutlet />
          <ToastContainer />
        </Frame>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
