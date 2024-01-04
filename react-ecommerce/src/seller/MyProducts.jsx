import React from "react";
import Product from "../product/Product";
import "./MyProductList.css";

const MyProducts = (props) => {
  console.log(props.buy);
  return (
    <ul className="product-list-container">
      {props.items.length === 0 && (
        <div>
          <h2>No Products Available!!</h2>
        </div>
      )}
      {props.items.map((product) => (
        <Product item={product} buy={props.buy} />
      ))}
    </ul>
  );
};

export default MyProducts;
