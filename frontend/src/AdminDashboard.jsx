import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [products, setProducts] = useState([]);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState('');
  const [newCouponExpiration, setNewCouponExpiration] = useState('');
  const [newProductName, setNewProductName] = useState('');
  const [newProductDescription, setNewProductDescription] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductStock, setNewProductStock] = useState('');
  const location = useLocation();
  const admin = location.state?.user; // Get the logged-in admin user from navigation state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user/');
        setUsers(response.data);
      } catch (err) {
        console.error('Error fetching users:', err.message);
      }
    };

    const fetchCoupons = async () => {
      try {
        const response = await axios.get('http://localhost:1000/coupon/');
        setCoupons(response.data);
      } catch (err) {
        console.error('Error fetching coupons:', err.message);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/product/');
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching products:', err.message);
      }
    };

    fetchUsers();
    fetchCoupons();
    fetchProducts();
  }, []);

  // Function to delete a user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/user/${id}`);
      alert('User deleted successfully');
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      console.error('Error deleting user:', err.message);
      alert('Failed to delete user. Please try again.');
    }
  };

  // Function to delete a coupon
  const deleteCoupon = async (id) => {
    try {
      await axios.delete(`http://localhost:1000/coupon/${id}`);
      alert('Coupon deleted successfully');
      setCoupons(coupons.filter((coupon) => coupon._id !== id));
    } catch (err) {
      console.error('Error deleting coupon:', err.message);
      alert('Failed to delete coupon. Please try again.');
    }
  };

  // Function to delete a product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/product/${id}`);
      alert('Product deleted successfully');
      setProducts(products.filter((product) => product._id !== id));
    } catch (err) {
      console.error('Error deleting product:', err.message);
      alert('Failed to delete product. Please try again.');
    }
  };

  // Function to add a new coupon
  const addCoupon = async () => {
    try {
      const newCoupon = {
        code: newCouponCode,
        discount: parseFloat(newCouponDiscount),
        expirationDate: new Date(newCouponExpiration).toISOString(),
      };

      const response = await axios.post('http://localhost:1000/coupon', newCoupon);
      alert('Coupon added successfully');
      setCoupons([...coupons, response.data]); // Add the new coupon to the state
      setNewCouponCode('');
      setNewCouponDiscount('');
      setNewCouponExpiration('');
    } catch (err) {
      console.error('Error adding coupon:', err.message);
      alert('Failed to add coupon. Please try again.');
    }
  };

  // Function to add a new product
  const addProduct = async () => {
    try {
      const newProduct = {
        name: newProductName,
        description: newProductDescription,
        price: parseFloat(newProductPrice),
        stock: parseInt(newProductStock, 10),
      };

      const response = await axios.post('http://localhost:3000/product', newProduct);
      alert('Product added successfully');
      setProducts([...products, response.data]); // Add the new product to the state
      setNewProductName('');
      setNewProductDescription('');
      setNewProductPrice('');
      setNewProductStock('');
    } catch (err) {
      console.error('Error adding product:', err.message);
      alert('Failed to add product. Please try again.');
    }
  };

  // Check if a coupon is active
  const isCouponActive = (expirationDate) => {
    const now = new Date();
    const expiryDate = new Date(expirationDate);
    return expiryDate > now ? 'Active' : 'Expired';
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <h2>Admin Dashboard</h2>
      <h3>Welcome, {admin.username}!</h3>

      {/* Users Table */}
      <h3>Users</h3>
      <table border="1" style={{ width: '100%', textAlign: 'left', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{new Date(user.createdAt).toLocaleString()}</td>
              <td>
                <button
                  onClick={() => deleteUser(user._id)}
                  style={{
                    backgroundColor: '#f44336',
                    color: 'white',
                    padding: '5px 10px',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Coupons Table */}
      <h3>Coupons</h3>
      <table border="1" style={{ width: '100%', textAlign: 'left', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Code</th>
            <th>Discount</th>
            <th>Expiration Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon._id}>
              <td>{coupon._id}</td>
              <td>{coupon.code}</td>
              <td>{coupon.discount}%</td>
              <td>{new Date(coupon.expirationDate).toLocaleString()}</td>
              <td>{isCouponActive(coupon.expirationDate)}</td>
              <td>
                <button
                  onClick={() => deleteCoupon(coupon._id)}
                  style={{
                    backgroundColor: '#f44336',
                    color: 'white',
                    padding: '5px 10px',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Products Table */}
      <h3>Products</h3>
      <table border="1" style={{ width: '100%', textAlign: 'left', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>
                <button
                  onClick={() => deleteProduct(product._id)}
                  style={{
                    backgroundColor: '#f44336',
                    color: 'white',
                    padding: '5px 10px',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add New Coupon Form */}
      <h3>Add New Coupon</h3>
      <div style={{ marginTop: '20px' }}>
        <label>
          Code:
          <input
            type="text"
            value={newCouponCode}
            onChange={(e) => setNewCouponCode(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px', marginBottom: '10px', display: 'block' }}
          />
        </label>
        <label>
          Discount (%):
          <input
            type="number"
            value={newCouponDiscount}
            onChange={(e) => setNewCouponDiscount(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px', marginBottom: '10px', display: 'block' }}
          />
        </label>
        <label>
          Expiration Date:
          <input
            type="date"
            value={newCouponExpiration}
            onChange={(e) => setNewCouponExpiration(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px', marginBottom: '10px', display: 'block' }}
          />
        </label>
        <button
          onClick={addCoupon}
          style={{
            padding: '5px 10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Add Coupon
        </button>
      </div>

      {/* Add New Product Form */}
      <h3>Add New Product</h3>
      <div style={{ marginTop: '20px' }}>
        <label>
          Name:
          <input
            type="text"
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px', marginBottom: '10px', display: 'block' }}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={newProductDescription}
            onChange={(e) => setNewProductDescription(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px', marginBottom: '10px', display: 'block' }}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            value={newProductPrice}
            onChange={(e) => setNewProductPrice(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px', marginBottom: '10px', display: 'block' }}
          />
        </label>
        <label>
          Stock:
          <input
            type="number"
            value={newProductStock}
            onChange={(e) => setNewProductStock(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px', marginBottom: '10px', display: 'block' }}
          />
        </label>
        <button
          onClick={addProduct}
          style={{
            padding: '5px 10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Add Product
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;
