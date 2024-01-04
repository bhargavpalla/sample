import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartContex from "../common/CartContext";
import "../address/AddAdress.css";
import Cookies from "js-cookie";
import Constants from "../common/KeyIds";

const Cart = (props) => {
  const [token, setToken] = useState();
  const [role, setRole] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    setToken(Cookies.get("token"));
    setRole(Cookies.get("role"));
    if (token !== null) {
      console.log(token);
    } else {
      navigate("/auth");
    }
    console.log(role);
  }, []);

  const cart = useContext(CartContex);

  const buyProduct = (event) => {
    event.preventDefault();
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("token"),
      },
    };
    fetch(
      Constants.BASE_URL +
        `buyer/buyProduct?productId=${cart.pid}&addressId=${cart.aid}&address=${
          cart.address + "," + cart.city + "," + cart.pincode
        }&quantity=1`,
      options
    )
      .then((response) => response.json())
      .then((data) => afterHit(data))
      .catch((error) => console.error(error));
  };

  const afterHit = (data) => {
    if (data.status === 1) {
      navigate("/searchProduct");
    }
  };

  return (
    <div className="product-container">
      <div className="field">
        <span className="label">Name:</span>
        <span className="value">{cart.name}</span>
      </div>

      <div className="field">
        <span className="label">Category:</span>
        <span className="value">{cart.category}</span>
      </div>

      <div className="field">
        <span className="label"> Price:</span>
        <span className="value">{cart.price}</span>
      </div>

      <div className="field">
        <span className="label">Address:</span>
        <span className="value">{cart.address}</span>
      </div>

      <div className="field">
        <span className="label"> City:</span>
        <span className="value">{cart.city}</span>
      </div>

      <div className="field">
        <span className="label">Pincode:</span>
        <span className="value">{cart.pincode}</span>
      </div>

      <button onClick={buyProduct}>Buy</button>
    </div>
  );
};
export default Cart;
