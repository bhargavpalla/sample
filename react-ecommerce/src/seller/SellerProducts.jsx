import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import MyProducts from "./MyProducts";
import Constants from "../common/KeyIds";
import { useNavigate } from "react-router-dom";

const SellerProducts = () => {
  const token = Cookies.get("token");
  const [productList, setProductList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (token !== null) {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("token"),
        },
      };
      fetch(Constants.BASE_URL + "seller/myProducts", options)
        .then((response) => response.json())
        .then((data) => afterHit(data))
        .catch((error) => console.error(error));
    } else {
      navigate("/auth");
    }
  }, []);

  const afterHit = (data) => {
    if (data.status === 1) {
      setProductList(data.products);
    }
  };

  return <MyProducts items={productList} buy={false}></MyProducts>;
};

export default SellerProducts;
