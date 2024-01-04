import { createContext } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  role: null,
});

export default AuthContext;
