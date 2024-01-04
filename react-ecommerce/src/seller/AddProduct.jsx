import React, { useEffect, useState } from "react";
import { useContext } from "react";
import "./AddProduct.css";
import AuthContext from "../common/AuthContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
  const [errormsg, setErrorMsg] = useState();
  const auth = useContext(AuthContext);
  const [category, setCategory] = useState();
  const categories = ["Mobile", "Laptop"];

  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");
    if (typeof token === "undefined") {
      navigate("/auth");
    }
    if (role !== "SELLER,BUYER") {
      navigate("/searchProduct");
    }
    console.log(role);
  }, []);

  const handleCityChange = (e) => {
    const { value } = e.target;
    setCategory(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    var { name, oPrice, discount, ofPrice, desc, quantity } = document.forms[0];
    setErrorMsg("");
    const params = {
      name: name.value,
      category: categories.indexOf(category) + 1,
      originalPrice: oPrice.value,
      offerPrice: ofPrice.value,
      discount: discount.value,
      description: desc.value,
      quantity: quantity.value,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token,
      },
      body: JSON.stringify(params),
    };
    const response = fetch("http://localhost:8090/seller/saveProduct", options)
      .then((response) => response.json())
      .then((data) => afterHit(data))
      .catch((error) => console.error(error));
    if (response.status === 0) {
      setErrorMsg(response.message);
    }
  };

  const afterHit = (response) => {
    if (response.status === 0) {
      setErrorMsg(response.message);
    } else if (response.status === 1) {
      navigate("/searchProduct");
    }
  };

  const renderErrorMessage = () => <div className="error">{errormsg}</div>;

  const renderForm = (
    <div className="app">
      <div className="login-form">
        <div className="title">Add Product</div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label>Name </label>
              <input type="text" name="name" required />
            </div>
            <label className="label">
              Category:
              <select
                className="select"
                name="city"
                value={category}
                onChange={handleCityChange}
              >
                <option value="">Select City</option>
                {categories.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </label>
            <div className="input-container">
              <label>Original Price </label>
              <input type="text" name="oPrice" required />
            </div>
            <div className="input-container">
              <label>Discount </label>
              <input type="text" name="discount" required />
            </div>
            <div className="input-container">
              <label>Offer Price </label>
              <input type="text" name="ofPrice" required />
            </div>
            <div className="input-container">
              <label>Description </label>
              <input type="text" name="desc" required />
            </div>
            <div className="input-container">
              <label>Quantity </label>
              <input type="text" name="quantity" required />
            </div>
            {renderErrorMessage()}
            <div className="button-container">
              <input type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return renderForm;
};

export default AddProduct;
