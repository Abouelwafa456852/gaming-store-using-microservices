import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5); // Default rating
  const [message, setMessage] = useState('');
  const location = useLocation();
  const product = location.state?.product; // Get the product details passed via state

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/review/product/${product._id}`); // Fetch reviews by productId
        setReviews(response.data);
      } catch (err) {
        console.error('Error fetching reviews:', err.message);
      }
    };

    if (product) fetchReviews();
  }, [product]);

  const handleAddReview = async () => {
    if (!newComment || !newRating) {
      alert('Please provide both a comment and a rating.');
      return;
    }

    try {
      const data = {
        productId: product._id,
        userId: 'exampleUserId', // Replace with actual userId
        rating: parseInt(newRating, 10),
        comment: newComment,
      };

      const response = await axios.post('http://localhost:4000/review', data); // Add a new review
      setReviews([...reviews, response.data]); // Update the reviews list
      setNewComment('');
      setNewRating(5);
      setMessage('Review added successfully!');
    } catch (err) {
      console.error('Error adding review:', err.message);
      setMessage('Failed to add review. Please try again.');
    }
  };

  if (!product) {
    return <p>Product details not found. Please navigate back and try again.</p>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <h2>Reviews for {product.name}</h2>

      {/* Display Product Details */}
      <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>
          <strong>Price:</strong> ${product.price}
        </p>
      </div>

      {/* Add Review Form */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Add Your Review</h3>
        {message && <p style={{ color: 'green' }}>{message}</p>}
        <textarea
          rows="4"
          cols="50"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your review here..."
          style={{ width: '100%', marginBottom: '10px', padding: '10px' }}
        />
        <div>
          <label>
            Rating:
            <select
              value={newRating}
              onChange={(e) => setNewRating(e.target.value)}
              style={{ marginLeft: '10px', padding: '5px' }}
            >
              {[1, 2, 3, 4, 5].map((rate) => (
                <option key={rate} value={rate}>
                  {rate}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button
          onClick={handleAddReview}
          style={{
            marginTop: '10px',
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Submit Review
        </button>
      </div>

      {/* Display Reviews */}
      <h3>Customer Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet. Be the first to review this product!</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {reviews.map((review) => (
            <li
              key={review._id}
              style={{
                marginBottom: '10px',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
            >
              <p>
                <strong>Rating:</strong> {review.rating} / 5
              </p>
              <p>{review.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Reviews;
