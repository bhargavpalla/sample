import React, { useEffect, useState } from "react";
import "../myordes/Order.css";
import Cookies from "js-cookie";
import Constants from "../common/KeyIds";
import { useNavigate } from "react-router-dom";
const SellerOrder = (order) => {
  const navigate = useNavigate();
  let cancel;

  const getStatus = () => {
    if (order.item.cancelled === "Y") {
      cancel = false;
      return "CANCELLED";
    } else if (order.item.delivered === "Y") {
      cancel = false;
      return "DELIVERED";
    } else if (order.item.shipped === "Y") {
      return <div>Shipped</div>;
    } else if (order.item.orderReceived === "Y") {
      cancel = true;
      return <button onClick={updateStatusS}>Change status to shipped</button>;
    } else {
      cancel = true;
      return (
        <button onClick={updateStatusR}>Change status to Order Received</button>
      );
    }
  };

  const updateStatusR = () => {
    hitAPi("RECEIVED");
  };

  const updateStatusS = () => {
    hitAPi("SHIPPED");
  };

  const cancelOrder = () => {
    hitAPi("CANCELLED");
  };

  const hitAPi = (updateTo) => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("token"),
      },
    };
    fetch(
      Constants.BASE_URL +
        `seller/updateStatus?updateTo=${updateTo}&orderId=${order.item.id}`,
      options
    )
      .then((response) => response.json())
      .then((data) => afterStatusUpdate(data))
      .catch((error) => console.error(error));
  };
  const afterStatusUpdate = (data) => {
    if (data.status === 1) {
      navigate("/auth");
    }
  };

  return (
    <div className="product-container">
      <div className="field">
        <span className="label">Name:</span>
        <span className="value">{order.item.name}</span>
      </div>

      <div className="field">
        <span className="label">Price:</span>
        <span className="value">{order.item.price}</span>
      </div>

      <div className="field">
        <span className="label">Address:</span>
        <span className="value">{order.item.address}</span>
      </div>

      <div className="field">
        <span className="label">OrderDate:</span>
        <span className="value">{order.item.date}</span>
      </div>

      <div className="field">
        <span className="label">Status:</span>&nbsp;
        {<span className="value">{getStatus()}</span>}
      </div>
      {cancel && <button onClick={cancelOrder}>Cancel Order</button>}
    </div>
  );
};

export default SellerOrder;
