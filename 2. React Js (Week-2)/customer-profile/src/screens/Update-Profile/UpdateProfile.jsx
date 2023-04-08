import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../store/user-context";
import "./UpdateProfile.scss";

const UpdateProfileScreen = () => {
  const { customer, updateCustomer } = useContext(UserContext);

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const updateProfile = (e) => {
    e.preventDefault();

    // console.log({
    //   ...customer,
    //   firstName: firstName,
    //   lastName: lastName,
    //   phone: phone,
    // });
    updateCustomer({
      ...customer,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
    });

    navigate("/");
  };
  return (
    <div className="Container">
      <div className="details">
        <form onSubmit={updateProfile}>
          First Name:
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          Last Name:
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          Phone:
          <input
            type="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button type="submit" className="btn">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileScreen;
