import React, { useState } from "react";
import "./Search.css";
import MyProducts from "../seller/MyProducts";
import Constants from "../common/KeyIds";

const Search = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    name: "",
    minPrice: "",
    maxPrice: "",
    category: "",
  });
  const [productList, setProductList] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria({
      ...searchCriteria,
      [name]: value,
    });
  };

  const handleSearch = () => {
    let params;
    if (searchCriteria.category) {
      params = {
        minPrice: searchCriteria.minPrice,
        maxPrice: searchCriteria.maxPrice,
        category: getCategory(),
        name: searchCriteria.name,
      };
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    };
    console.log(Constants.BASE_URL + "myApp/searchProduct");
    fetch(Constants.BASE_URL + "myApp/searchProduct", options)
      .then((response) => response.json())
      .then((data) => afterHit(data))
      .catch((error) => console.error(error));
  };
  const getCategory = () => {
    console.log(searchCriteria.category);
    if (searchCriteria.category === "mobile") return 1;
    else if (searchCriteria.category === "laptop") return 2;
    else return 0;
  };

  const afterHit = (data) => {
    console.log(data.products);
    setProductList(data.products);
  };

  return (
    <div>
      <div>
        <label>
          Name: &nbsp; &nbsp;
          <input
            type="text"
            name="name"
            value={searchCriteria.name}
            onChange={handleInputChange}
            required
          />
        </label>
      </div>
      <br />
      <label>
        Min Price:
        <input
          type="number"
          name="minPrice"
          value={searchCriteria.minPrice}
          onChange={handleInputChange}
          required={true}
        />
      </label>
      &nbsp; &nbsp;
      <label>
        Max Price:
        <input
          type="number"
          name="maxPrice"
          value={searchCriteria.maxPrice}
          onChange={handleInputChange}
          required
        />
      </label>
      &nbsp; &nbsp;
      <label>
        Category:
        <select
          name="category"
          value={searchCriteria.category}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Category</option>
          <option value="mobile">Mobile</option>
          <option value="laptop">Laptop</option>
        </select>
      </label>
      &nbsp; &nbsp;
      <button onClick={handleSearch}>Search</button>
      <div>
        {" "}
        {productList && (
          <MyProducts items={productList} buy={true}></MyProducts>
        )}
      </div>
    </div>
  );
};

export default Search;
