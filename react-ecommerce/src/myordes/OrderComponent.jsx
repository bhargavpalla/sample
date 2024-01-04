import React from "react";
import "./Order.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Constants from "../common/KeyIds";
const Order = (order) => {
  let cancel;
  const navigate = useNavigate();
  const getStatus = () => {
    if (order.item.cancelled === "Y") {
      cancel = false;
      return "CANCELLED";
    } else if (order.item.delivered === "Y") {
      cancel = false;
      return "DELIVERED";
    } else if (order.item.shipped === "Y") {
      cancel = false;
      return "SHIPPED";
    } else if (order.item.orderReceived === "Y") {
      cancel = true;
      return "ORDER RECEIVED";
    } else {
      cancel = true;
      return "";
    }
  };

  const cancelOrder = (event) => {
    event.preventDefault();
    hitAPi(Constants.BASE_URL + `buyer/cancelOrder?orderID=${order.item.id}`);
  };

  const markDelivered = (event) => {
    event.preventDefault();
    hitAPi(Constants.BASE_URL + `buyer/markDelivered?orderID=${order.item.id}`);
  };

  const hitAPi = (url) => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("token"),
      },
    };
    fetch(url, options)
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
        <span className="label">Status:</span>
        {<span className="value">{getStatus()}</span>}
      </div>
      {cancel === true && <button onClick={cancelOrder}>Cancel Order</button>}
      {getStatus() === "SHIPPED" && (
        <button onClick={markDelivered}>Mark delivered</button>
      )}
    </div>
  );
};

export default Order;
