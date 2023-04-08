import { Page } from "@shopify/polaris";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { setShopData } from "../../features/shop/LoginSlice";

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams("");
  const { loggedInShop } = useSelector((state) => state.shopLogin);

  const dispatch = useDispatch();

  useEffect(() => {
    if (JSON.parse(searchParams.get("sessionData"))) {
      const loggedInShopData = JSON.parse(searchParams.get("sessionData"));
      sessionStorage.setItem("loggedInShop", JSON.stringify(loggedInShopData));
      dispatch(setShopData(loggedInShopData));
      setSearchParams();
    }
  }, [searchParams, setSearchParams, dispatch]);

  console.log(loggedInShop);
  return <Page title="Welcome to Dashboard"></Page>;
};

export default Dashboard;
