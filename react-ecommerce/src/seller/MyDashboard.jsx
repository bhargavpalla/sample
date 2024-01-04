import React, { useEffect, useState } from "react";
import "./MyDashboard.css";
import Constants from "../common/KeyIds";
import Cookies from "js-cookie";
import SellerOrders from "./SellerOrdes";
const Mydashboard = () => {
  const [orders, setOrders] = useState();
  const onroleSelected = (event) => {
    console.log(event.target.value);
    hitAPi(event.target.value);
  };

  const hitAPi = (type) => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("token"),
      },
    };
    fetch(Constants.BASE_URL + `seller/myOrders?orderType=${type}`, options)
      .then((response) => response.json())
      .then((data) => afterHit(data))
      .catch((error) => console.error(error));
  };

  const afterHit = (data) => {
    if (data.status === 1) {
      setOrders(data.ordersEntities);
    }
  };

  return (
    <div>
      <div onChange={onroleSelected} className="radiobtn">
        <h2>Select </h2>
        <input type="radio" id="all" name="type" value="ALL"></input>
        <label for="all">ALL</label> &nbsp;
        <input type="radio" id="new" name="type" value="NEW"></input>
        <label for="new">ACTIVE ORDERS</label> &nbsp;
        <input
          type="radio"
          id="delivered"
          name="type"
          value="DELIVERED"
        ></input>
        <label for="delivered">DELIVERED</label> &nbsp;
        <input
          type="radio"
          id="cancelled"
          name="type"
          value="CANCELLED"
        ></input>
        <label for="cancelled">CANCELLED</label> &nbsp;
      </div>
      {orders !== null && <SellerOrders items={orders}></SellerOrders>}
    </div>
  );
};

export default Mydashboard;
