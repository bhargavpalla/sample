
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import AuthContext from './common/AuthContext';
import Auth from './user/Auth';
import AddProduct from './seller/AddProduct';
import MainNavigation from './nav/MainNavigation';
import Cookies from 'js-cookie';
import MyProducts from './seller/MyProducts';
import Search from './search/Search';
import AddAddress from './address/AddAdress';
import MyAddresses from './address/MyAddresses';
import Cart from './cart/CartComponent';
import MyOrders from './myordes/MyOrders';
import SellerProducts from './seller/SellerProducts';
import Mydashboard from './seller/MyDashboard';
function App() {

   let routes= (
      <Routes>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path='/products' element = {<MyProducts/>}></Route>
          <Route path='/addProduct' element = {<AddProduct/>}></Route>
          <Route path='/addAddress' element = {<AddAddress/>}></Route>
          <Route path='/myaddresses' element = {<MyAddresses/>}></Route>
          <Route path='/searchProduct' element = {<Search/>}/>
          <Route path='/myCart' element = {<Cart/>}></Route>
          <Route path='/myOrders' element = {<MyOrders/>}></Route>
          <Route path='/myProducts' element = {<SellerProducts/>}></Route>
          <Route path='/myDashboard' element = {<Mydashboard/>}></Route>
          <Route path="*" element={<Search />} />
      </Routes>
   )

  
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!Cookies.get("token"),
        token: Cookies.get("token"),
        role: Cookies.get("role")
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  )
}

export default App;
