import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AddressScreen.scss";
import AddressCard from "../../components/AddressCard/AddressCard";
import UserContext from "../../store/user-context";

const AddressScreen = () => {
  const { addresses, defaultAddress, setDefId } = useContext(UserContext);

  useEffect(() => {
    setDefId(defaultAddress.id);
  }, []);

  return (
    <div className="addresses">
      <div className="btn">
        <Link className="link" to={`/`}>
          Back
        </Link>
      </div>
      <div className="defaulAddress">
        <h1>Permenent Address</h1>
        <AddressCard
          key={defaultAddress.id}
          address={defaultAddress}
          btnText="Default"
        />
      </div>
      <div className="address">
        <h1>Other Addresses</h1>

        {addresses.nodes.map((item) => (
          <AddressCard key={item.id} address={item} />
        ))}
      </div>
    </div>
  );
};

export default AddressScreen;
