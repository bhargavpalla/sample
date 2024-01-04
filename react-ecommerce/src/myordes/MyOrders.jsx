import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Order from "./OrderComponent";
import Cookies from "js-cookie";
import Constants from "../common/KeyIds";

const MyOrders = () => {
  const [token, setToken] = useState();
  const [productList, setProductList] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    setToken(Cookies.get("token"));
    if (token !== null) {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("token"),
        },
      };
      fetch(Constants.BASE_URL + "buyer/myOrders", options)
        .then((response) => response.json())
        .then((data) => afterHit(data))
        .catch((error) => console.error(error));
    } else {
      navigate("/auth");
    }
  }, []);

  const afterHit = (data) => {
    if (data.status === 1) {
      console.log(data.ordersEntities);
      setProductList(data.ordersEntities);
    }
  };
  return (
    <ul className="product-list-container">
      {productList && productList.length === 0 && (
        <div>
          <h2>No Orders Available!!</h2>
        </div>
      )}
      {productList && productList.map((product) => <Order item={product} />)}
    </ul>
  );
};
export default MyOrders;
