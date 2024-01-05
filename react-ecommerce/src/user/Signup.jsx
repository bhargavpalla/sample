import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Constants from "../common/KeyIds";

const Signup = () => {
  const [role, selectrole] = useState();
  const [errormsg, setErrorMsg] = useState();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    var { uname, mobile, email, pass } = document.forms[0];
    setErrorMsg("");
    const params = {
      mobile: mobile.value,
      name: uname.value,
      email: email.value,
      password: pass.value,
      role: role,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    };
    const response = fetch(Constants.BASE_URL + "auth/saveUser", options)
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
      navigate("/auth ");
    }
  };

  const onroleSelected = (event) => {
    selectrole(event.target.value);
  };
  const renderErrorMessage = () => <div className="error">{errormsg}</div>;

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
        </div>
        <div className="input-container">
          <label>Mobile </label>
          <input type="text" name="mobile" required />
        </div>
        <div className="input-container">
          <label>Email </label>
          <input type="text" name="email" required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
        </div>
        <div onChange={onroleSelected}>
          <p>Role</p>
          <input type="radio" id="buyer" name="role" value="BUYER"></input>
          <label for="buyer">BUYER</label>
          <input type="radio" id="seller" name="role" value="SELLER"></input>
          <label for="seller">SELLER</label>{" "}
        </div>
        {renderErrorMessage()}
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return renderForm;
};

export default Signup;
