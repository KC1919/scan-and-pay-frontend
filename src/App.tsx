import { CategoryForm2 } from './components/CategoryForm2';
import Menu from './components/Menu';
import { ProductForm } from './components/ProductForm';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import Login from './components/Login';
import OtpVerify from './components/OtpVerify';
import Landing from './components/Landing';
import { AppContext } from './components/Context/AppContext';
import Order from './components/Order';
// import { useQuery } from "@tanstack/react-query";
function App() {
  const [tableNumber, setTableNumber] = useState('');
  const [cartProducts, setCartProducts] = useState([]);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      <Navbar />
      <AppContext.Provider
        value={{ tableNumber, setTableNumber, cartProducts, setCartProducts }}
      >
        <Router>
          <Routes>
            <Route path="/user/:table_number" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/category" element={<CategoryForm2 />} />
            <Route path="/admin/product" element={<ProductForm />} />
            <Route
              path="/user/verify-otp/:table_number/:user_id"
              element={<OtpVerify />}
            />
            <Route path="/menu" element={<Menu />} />
            <Route path="/user/order" element={<Order />} />
          </Routes>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

// const Login = () => <div>Login Page</div>;
// const Verify = () => <div>Verify Page</div>;

export default App;
