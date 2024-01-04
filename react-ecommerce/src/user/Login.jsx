import React, { useContext } from "react";
import AuthContext from "../common/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const Login = () => {
  const auth = useContext(AuthContext);
  const [errormsg, setErrorMsg] = useState();
  const navigate = useNavigate();

  const hitapi = (event) => {
    event.preventDefault();
    var { uname, pass } = document.forms[0];

    const params = {
      mobile: uname.value,
      password: pass.value,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    };
    fetch("http://localhost:8090/auth/login", options)
      .then((response) => response.json())
      .then((data) => afterHit(data))
      .catch((error) => console.error(error));
  };

  const afterHit = (data) => {
    if (data.status === 1) {
      auth.isLoggedIn = true;
      auth.token = data.token;
      auth.role = data.role;
      Cookies.set("token", auth.token);
      Cookies.set("isLoggedIn", true);
      Cookies.set("role", auth.role);
      console.log(auth.token);
      if (data.role === "SELLER") navigate("/addProduct");
      else {
        navigate("/searchProduct");
      }
    } else {
      auth.isLoggedIn = false;
      setErrorMsg(data.message);
    }
  };
  const renderErrorMessage = () => <div className="error">{errormsg}</div>;

  const renderForm = (
    <div className="form">
      <form onSubmit={hitapi}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
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

export default Login;
