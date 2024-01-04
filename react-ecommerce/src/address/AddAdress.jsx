import React, { useState } from "react";
import "./AddAdress.css";
import Constants from "../common/KeyIds";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const AddAdress = () => {
  const navigate = useNavigate();
  const [addressData, setAddressData] = useState({
    address: "",
    city: "",
    pincode: "",
  });
  const cities = ["Bangalore", "Hyderabad", "Chennai", "Mumbai", "Delhi"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressData({
      ...addressData,
      [name]: value,
    });
  };

  const handleCityChange = (e) => {
    const { value } = e.target;
    setAddressData({
      ...addressData,
      city: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(addressData);
    const params = {
      address: addressData.address,
      pincode: addressData.pincode,
      city: addressData.city,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("token"),
      },
      body: JSON.stringify(params),
    };
    fetch(Constants.BASE_URL + "buyer/addAddress", options)
      .then((response) => response.json())
      .then((data) => afterHit(data))
      .catch((error) => console.error(error));
  };

  const afterHit = (data) => {
    console.log(data);
    if (data.status === 1) {
      navigate("/searchProduct");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form1">
      <label className="label">
        Address:
        <input
          className="input"
          type="text"
          name="address"
          value={addressData.address}
          onChange={handleInputChange}
        />
      </label>

      <br />
      <label className="label">
        City:
        <select
          className="select"
          name="city"
          value={addressData.city}
          onChange={handleCityChange}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </label>

      <br />

      <label className="label">
        Pincode:
        <input
          className="input"
          type="text"
          name="pincode"
          value={addressData.pincode}
          onChange={handleInputChange}
        />
      </label>

      <br />

      <button type="submit" className="button">
        Add Address
      </button>
    </form>
  );
};

export default AddAdress;
