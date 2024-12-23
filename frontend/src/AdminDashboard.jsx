import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [coupons, setCoupons] = useState([]);
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

    fetchUsers();
    fetchCoupons();
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
    </div>
  );
}

export default AdminDashboard;
