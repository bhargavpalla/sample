import React, { useContext } from "react";
import "./AddressComponent.css";
import { NavLink, useNavigate } from "react-router-dom";
import CartContex from "../common/CartContext";

const AddressComponent = (address) => {
  const cart = useContext(CartContex);
  const navigate = useNavigate();
  const buyProduct = (e) => {
    e.preventDefault();
    cart.aid = address.item.id;
    cart.address = address.item.address;
    cart.city = address.item.city;
    cart.pincode = address.item.pincode;
    navigate("/myCart");
  };
  return (
    <div className="header">
      <h2>Address Details</h2>
      <p>
        <strong className="strong">Address:</strong> {address.item.address}
      </p>
      <p>
        <strong className="strong">City:</strong> {address.item.city}
      </p>
      <p>
        <strong className="strong">Pincode:</strong> {address.item.pincode}
      </p>
      <div class="btn-group">
        <NavLink to={`/myAddresses/${address}`}>
          <button onClick={buyProduct}>Select</button>
        </NavLink>
      </div>
    </div>
  );
};

export default AddressComponent;
