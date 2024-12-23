import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function Products() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user; // Get the logged-in user from navigation state

  useEffect(() => {
    // Fetch the list of products from the Product Microservice
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/product/'); // Product Microservice endpoint
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching products:', err.message);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      const data = {
        userId: user._id, // The logged-in user's ID
        productIds: [product._id], // Add the selected product ID
        totalAmount: product.price, // Set the total amount to the product's price
        orderDate: new Date(), // Current date
        status: 'Pending', // Set status as 'Pending'
      };

      // Send a POST request to the Order Microservice
      const response = await axios.post('http://localhost:2000/order', data); // Order Microservice endpoint
      setMessage(`Product "${product.name}" added to cart successfully!`);
      console.log('Cart Response:', response.data);
    } catch (err) {
      console.error('Error adding product to cart:', err.message);
      setMessage('Failed to add product to cart.');
    }
  };

  const handleViewCart = () => {
    // Navigate to the cart page, passing the user ID
    navigate('/cart', { state: { userId: user._id } });
  };

  const handleViewReviews = (product) => {
    // Navigate to the reviews page, passing the product details
    navigate('/reviews', { state: { product } });
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <h2>Products</h2>
      <h3>Welcome, {user?.username}!</h3>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <button
        style={{
          backgroundColor: '#007BFF',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
        onClick={handleViewCart} // Navigate to the cart page
      >
        View Cart
      </button>
      <table border="1" style={{ width: '100%', textAlign: 'left', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>
                <button
                  style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    padding: '5px 10px',
                    border: 'none',
                    cursor: 'pointer',
                    marginRight: '10px',
                  }}
                  onClick={() => handleAddToCart(product)} // Call handleAddToCart when clicked
                >
                  Add to Cart
                </button>
                <button
                  style={{
                    backgroundColor: '#FFA500',
                    color: 'white',
                    padding: '5px 10px',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleViewReviews(product)} // Call handleViewReviews when clicked
                >
                  View Reviews
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
