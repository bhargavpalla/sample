import { createContext } from "react";

const CartContex = createContext({
  pid: null,
  name: null,
  category: null,
  price: null,
  address: null,
  city: null,
  aid: null,
  pincode: null,
});
export default CartContex;
