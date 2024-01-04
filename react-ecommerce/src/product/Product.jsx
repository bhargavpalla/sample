import React, { useContext } from "react";
import "./Product.css";
import AuthContext from "../common/AuthContext";
import { useNavigate } from "react-router-dom";
import CartContex from "../common/CartContext";
const Product = (product) => {
  const auth = useContext(AuthContext);
  const cart = useContext(CartContex);
  const navigation = useNavigate();
  const buyProduct = (event) => {
    event.preventDefault();
    if (auth.isLoggedIn) {
      cart.pid = product.item.id;
      cart.name = product.item.name;
      cart.price = product.item.offerPrice;
      cart.category = product.item.category;
      navigation("/myAddresses");
    } else {
      navigation("/auth");
    }
  };

  return (
    <div className="product-container">
      <div className="field">
        <span className="label">Name:</span>
        <span className="value">{product.item.name}</span>
      </div>

      <div className="field">
        <span className="label">Category:</span>
        <span className="value">{product.item.category}</span>
      </div>

      <div className="field">
        <span className="label">Original Price:</span>
        <span className="value">{product.item.originalPrice}</span>
      </div>

      <div className="field">
        <span className="label">Discount:</span>
        <span className="value">{product.item.discount}</span>
      </div>

      <div className="field">
        <span className="label">Offer Price:</span>
        <span className="value">{product.item.offerPrice}</span>
      </div>

      <div className="field">
        <span className="label">Description:</span>
        <span className="value">{product.item.description}</span>
      </div>
      <div className="field">
        <span className="label">Owner Mobile:</span>
        <span className="value">{product.item.ownerMobile}</span>
      </div>
      {!product.buy && (
        <div className="field">
          <span className="label">Quantity:</span>
          <span className="value">{product.item.quantity}</span>
        </div>
      )}
      {product.buy && (
        <div class="btn-group">
          {auth.isLoggedIn && <button onClick={buyProduct}>Buy</button>}
        </div>
      )}
    </div>
  );
};

export default Product;
