import React, { useEffect } from "react";
import { useState } from "react";
import "./Auth.css";
import Login from "./Login";
import Signup from "./Signup";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
function Auth() {
  // React States
  const [isLogin, setIslogin] = useState(true);

  const navigate = useNavigate();
  const auth = (
    <div class="btn-group">
      <button onClick={() => setIslogin(true)}>Login</button>
      <button onClick={() => setIslogin(false)}>Signup</button>
    </div>
  );

  useEffect(() => {
    if (Cookies.get("token") != null) {
      navigate("/searchproduct");
    }
  });
  return (
    <div className="app">
      <div className="login-form">
        <div className="title">
          {isLogin ? <div>Log In</div> : <div>SignUp</div>}
        </div>
        {auth}
        {isLogin ? <Login /> : <Signup />}
      </div>
    </div>
  );
}

export default Auth;
