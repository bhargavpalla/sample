import React from "react";
import SellerOrder from "./SellerOrder";

const SellerOrders = (props) => {
  return (
    <ul className="product-list-container">
      {props.items && props.items.length === 0 && (
        <div>
          <h2>No Orders Available!!</h2>
        </div>
      )}
      {props.items &&
        props.items.map((product) => <SellerOrder item={product} />)}
    </ul>
  );
};

export default SellerOrders;
