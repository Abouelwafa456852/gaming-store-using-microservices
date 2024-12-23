import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import AdminDashboard from './AdminDashboard';
import Signup from './Signup';
import Products from './Products';
import CartPage from './CartPage'; // Import the CartPage component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<CartPage />} /> {/* Add the route for the cart */}
      </Routes>
    </Router>
  );
}

export default App;
