import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css';
import gameIcone from './assets/gameIcone.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For navigation

  const handleLogin = async () => {
    try {
      // Fetch all users
      const response = await axios.get('http://localhost:5000/user/');
      const users = response.data;

      // Check if email and password match any user
      const matchedUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (matchedUser) {
        if (matchedUser.role === 'Admin') {
          // Redirect Admin to Admin Dashboard
          navigate('/admin-dashboard', { state: { user: matchedUser } });
        } else {
          // Redirect User to Products Page
          navigate('/products', { state: { user: matchedUser } });
        }
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      console.error('Error fetching users:', err.message);
      setError('Failed to fetch users. Please try again later.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', textAlign: 'center' }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ marginBottom: '10px' }}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            display: 'block',
            width: '100%',
            padding: '8px',
            marginBottom: '10px',
          }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            display: 'block',
            width: '100%',
            padding: '8px',
            marginBottom: '10px',
          }}
        />
      </div>
      <button
        onClick={handleLogin}
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '10px',
          border: 'none',
          cursor: 'pointer',
          width: '100%',
        }}
      >
        Login
      </button>
      <button
        onClick={() => navigate('/signup')}
        style={{
          backgroundColor: '#2196F3',
          color: 'white',
          padding: '10px',
          border: 'none',
          cursor: 'pointer',
          width: '100%',
          marginTop: '10px',
        }}
      >
        Sign Up
      </button>
      <div style={{ marginTop: '20px' }}>
        <img src={gameIcone} alt="Game Icon" style={{ width: '100px', height: '100px' }} />
      </div>
    </div>
  );
}

export default Login;
