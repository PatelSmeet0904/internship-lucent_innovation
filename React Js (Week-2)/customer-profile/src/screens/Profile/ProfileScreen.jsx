import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../store/user-context";
import "./ProfileScreen.scss";

const ProfileScreen = () => {
  const { customer } = useContext(UserContext);
  return (
    <div className="Container">
      <div className="profileInfo">
        <div className="img">
          <img
            src="https://media.licdn.com/dms/image/D4D03AQGfsEboQmDmXQ/profile-displayphoto-shrink_800_800/0/1671612057944?e=1678924800&v=beta&t=OwAPnf7UAoPZQy_sz7QuvDsoQ8Y60Enp9yiYxXR9vA8"
            alt=""
          />
        </div>
        <div className="details">
          <h4>
            Full Name: {customer.firstName} {customer.lastName}
          </h4>
          <p>
            <b>Phone No:</b>{" "}
            {customer.phone == null ? "Not Mentioned" : customer.phone}
          </p>
          <Link className="link" to={`address`}>
            <button className="btn">Checkout Address</button>
          </Link>
          <Link className="link" to={`orders`}>
            <button className="btn">Checkout orders</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
