import { Spinner } from "@shopify/polaris";
import React from "react";

const Loader = ({ size = "large" }) => {
  return <Spinner accessibilityLabel="loading..." size={size} />;
};

export default Loader;
