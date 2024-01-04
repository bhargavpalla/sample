import React, { useEffect, useState } from "react";
import "./MyAddresses.css";
import AddressComponent from "./AddressComponent";
import Cookies from "js-cookie";
import Constants from "../common/KeyIds";
import { useNavigate } from "react-router-dom";

const MyAddresses = (productId) => {
  const [addresses, setAddresses] = useState();
  // const pid = useParams().productId;
  const [token, setToken] = useState();
  const [role, setRole] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    setToken(Cookies.get("token"));
    setRole(Cookies.get("role"));
    if (token !== null) {
      //  console.log(pid);
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("token"),
        },
      };
      fetch(Constants.BASE_URL + "buyer/getMyAddresses", options)
        .then((response) => response.json())
        .then((data) => afterHit(data))
        .catch((error) => console.error(error));
    } else {
      navigate("/auth");
    }
  }, []);

  const afterHit = (data) => {
    if (data.status === 1) {
      setAddresses(data.addressEntities);
    }
  };

  return (
    <ul className="product-list-container">
      {addresses && addresses.length === 0 && (
        <div>
          <h2>No Added Addresses!!</h2>
        </div>
      )}
      {addresses &&
        addresses.map((address) => (
          <AddressComponent
            item={address}
            // city={address.city}
            // address={address.address}
            // pincode={address.pincode}
          />
        ))}
    </ul>
  );
};

export default MyAddresses;
