import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const newUser = {
        username,
        email,
        password,
        role: 'User', // Default role
      };

      await axios.post('http://localhost:5000/user', newUser);
      alert('Signup successful! You can now log in.');
      navigate('/'); // Redirect to login page
    } catch (err) {
      console.error('Error signing up:', err.message);
      setError('Failed to sign up. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Sign Up</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ marginBottom: '10px' }}>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            display: 'block',
            width: '100%',
            padding: '8px',
            marginBottom: '10px',
          }}
        />
      </div>
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
        onClick={handleSignup}
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '10px',
          border: 'none',
          cursor: 'pointer',
          width: '100%',
        }}
      >
        Sign Up
      </button>
    </div>
  );
}

export default Signup;
