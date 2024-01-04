import './App.css';
import React from 'react';
import {
  BrowserRouter ,
  Route,
  Navigate
} from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Auth from './user/pages/Auth';
function App() {
  let routes;
  routes = (
    <BrowserRouter>
    <Routes>
      <Route path = "home" element={<Auth/>}>
      </Route>
      <Route path="*" element={<Auth/>} />
    </Routes>
    </BrowserRouter>
  );
  return routes;
}

export default App;
