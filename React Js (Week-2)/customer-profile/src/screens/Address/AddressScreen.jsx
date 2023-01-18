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
  
  const [address, setAddress] = useState({
    id: defaultAddress.id,
    address1: defaultAddress.address1,
    formattedArea: defaultAddress.formattedArea,
    phone: defaultAddress.phone,
    zip: defaultAddress.zip,
  });

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
          key={address.id}
          id={address.id}
          address1={address.address1}
          area={address.formattedArea}
          phone={address.phone}
          zip={address.zip}
          btnText="Default"
        />
      </div>
      <div className="address">
        <h1>Other Addresses</h1>

        {addresses.nodes.map((item, index) => (
          <AddressCard
            key={item.id}
            id={item.id}
            address1={item.address1}
            area={item.formattedArea}
            phone={item.phone}
            zip={item.zip}
            setDefaultAddress={setAddress}
          />
        ))}
      </div>
    </div>
  );
};

export default AddressScreen;
