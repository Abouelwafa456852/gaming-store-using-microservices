import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './style.css';

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
    <div className="container">
      <h2>Reviews for {product.name}</h2>

      {/* Display Product Details */}
      <div className="form-section">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>
          <strong>Price:</strong> ${product.price}
        </p>
      </div>

      {/* Add Review Form */}
      <div className="form-section">
        <h3>Add Your Review</h3>
        {message && <p className="message">{message}</p>}
        <div className="form-row">
          <div style={{ width: '100%' }}>
            <label>Comment:</label>
            <textarea
              rows="4"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your review here..."
            />
          </div>
          <div>
            <label>Rating:</label>
            <select
              value={newRating}
              onChange={(e) => setNewRating(e.target.value)}
            >
              {[1, 2, 3, 4, 5].map((rate) => (
                <option key={rate} value={rate}>
                  {rate}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button onClick={handleAddReview}>Submit Review</button>
      </div>

      {/* Display Reviews */}
      <div className="form-section">
        <h3>Customer Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to review this product!</p>
        ) : (
          <ul className="review-list">
            {reviews.map((review) => (
              <li key={review._id} className="review-item">
                <p>
                  <strong>Rating:</strong> {review.rating} / 5
                </p>
                <p>{review.comment}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Reviews;
