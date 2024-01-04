import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../common/AuthContext";
import "./NavLinks.css";
import Cookies from "js-cookie";

const NavLinks = (props) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const logout = (event) => {
    event.preventDefault();
    auth.token = null;
    auth.role = null;
    auth.isLoggedIn = false;
    Cookies.remove("token");
    Cookies.set("role", null);
    Cookies.remove("isLoggedIn");
    navigate("/auth");
  };
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/searchProduct" exact>
          Search
        </NavLink>
      </li>
      {auth.isLoggedIn === true && auth.role === "SELLER,BUYER" && (
        <li>
          <NavLink to="/addProduct">Add Product</NavLink>
        </li>
      )}
      {auth.isLoggedIn === true && auth.role === "SELLER,BUYER" && (
        <li>
          <NavLink to="/myProducts">My Products</NavLink>
        </li>
      )}
      {auth.isLoggedIn === true && auth.role === "SELLER,BUYER" && (
        <li>
          <NavLink to="/myDashboard">My Dashboard</NavLink>
        </li>
      )}
      {auth.isLoggedIn === true && (
        <li>
          <NavLink to="/myOrders">My Orders</NavLink>
        </li>
      )}
      {auth.isLoggedIn === true && (
        <li>
          <NavLink to="/addAddress">Add Address</NavLink>
        </li>
      )}
      {/* {auth.isLoggedIn && (
        <li>
          <NavLink to="/myaddresses">My Addresses</NavLink>
        </li>
      )} */}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
      {auth.isLoggedIn === true && (
        <li>
          <button onClick={logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
