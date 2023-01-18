import React, { useContext, useState } from "react";
import UserContext from "../../store/user-context";
import "./AddressCard.scss";

const AddressCard = ({
  id,
  address1,
  area,
  phone,
  zip,
  setDefaultAddress,
  btnText = "Set Default",
}) => {
  const { defId, setDefId } = useContext(UserContext);

  const HandleAddress = (currId) => {
    setDefId(currId);
    setDefaultAddress({
      id: currId,
      address1: address1,
      formattedArea: area,
      phone: phone,
      zip: zip,
    });
  };

  return (
    <div className="box">
      <p>
        <b>Address: </b>
        {address1}, {area}
      </p>
      <p>
        <b>Phone: </b>
        {phone}
      </p>
      <p>
        <b>zip code: </b>
        {zip}
      </p>
      {btnText === "Default" ? (
        <p>
          <span className="def-text">This is Default Address</span>
        </p>
      ) : (
        <button
          className={defId === id ? "def-btn disabled" : "def-btn"}
          onClick={() => {
            HandleAddress(id);
          }}
          key={id}
        >
          {defId === id ? "Default" : "Set Default"}
        </button>
      )}
    </div>
  );
};

export default AddressCard;
