import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./style.css";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0); // Store applied discount percentage
  const [message, setMessage] = useState(""); // Store messages for the user
  const [coupons, setCoupons] = useState([]); // Store all coupons
  const location = useLocation();
  const userId = location.state?.userId; // Get the user ID from navigation state

  useEffect(() => {
    const fetchCart = async () => {
      try {
        // Fetch orders for the user
        const orderResponse = await axios.get(
          `https://gaming-store-using-microservices.onrender.com/order?userId=${userId}`
        );
        const productIds = orderResponse.data.flatMap(
          (order) => order.productIds
        );

        // Fetch product details for all product IDs
        const productDetails = await Promise.all(
          productIds.map((productId) =>
            axios
              .get(
                `https://product-service-pjzd.onrender.com/product/${productId}`
              )
              .then((res) => res.data)
          )
        );

        setCartItems(
          orderResponse.data.map((order, index) => ({
            ...productDetails[index],
            orderId: order._id, // Include orderId for delete functionality
          }))
        );

        // Calculate total price
        const total = productDetails.reduce(
          (sum, product) => sum + product.price,
          0
        );
        setTotalPrice(total); // Set the total price
      } catch (err) {
        console.error("Error fetching cart:", err.message);
      }
    };

    const fetchCoupons = async () => {
      try {
        // Fetch all available coupons
        const response = await axios.get(
          "https://coupon-service-hf15.onrender.com/coupon"
        ); // Updated URL for coupons
        setCoupons(response.data); // Store coupons
      } catch (err) {
        console.error("Error fetching coupons:", err.message);
      }
    };

    if (userId) {
      fetchCart();
      fetchCoupons();
    }
  }, [userId]);

  const handleApplyCoupon = () => {
    // Check if the entered discount code matches any available coupons
    const matchedCoupon = coupons.find(
      (coupon) =>
        coupon.code === discountCode &&
        new Date(coupon.expirationDate) > new Date()
    );

    if (matchedCoupon) {
      // Apply the discount percentage
      const discountPercentage = matchedCoupon.discount; // Discount is a percentage
      setAppliedDiscount(discountPercentage);
      setMessage(`Discount of ${discountPercentage}% applied!`);
    } else {
      setMessage("Invalid or expired discount code.");
    }
  };

  const handleDelete = async (orderId) => {
    try {
      // Call the microservice to delete the order by ID
      await axios.delete(
        `https://gaming-store-using-microservices.onrender.com/order/${orderId}`
      );

      // Update the cart after successful deletion
      const updatedCart = cartItems.filter((item) => item.orderId !== orderId);
      setCartItems(updatedCart);

      // Recalculate total price
      const updatedTotalPrice = updatedCart.reduce(
        (sum, item) => sum + item.price,
        0
      );
      setTotalPrice(updatedTotalPrice);
    } catch (err) {
      console.error("Error deleting order:", err.message);
    }
  };

  const calculateDiscountedPrice = () => {
    return totalPrice - (totalPrice * appliedDiscount) / 100;
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h2>Your Cart</h2>
      <table
        border="1"
        style={{ width: "100%", textAlign: "left", marginTop: "20px" }}
      >
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>
                <button
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    padding: "5px 10px",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDelete(product.orderId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Discount Box */}
      <div style={{ marginTop: "20px" }}>
        <label htmlFor="discountCode">Enter Discount Code:</label>
        <input
          type="text"
          id="discountCode"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          style={{ marginLeft: "10px", padding: "5px" }}
        />
        <button
          onClick={handleApplyCoupon}
          style={{
            marginLeft: "10px",
            padding: "5px 10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Apply
        </button>
        {message && (
          <p style={{ color: "green", marginTop: "10px" }}>{message}</p>
        )}
      </div>

      {/* Total Price */}
      <div style={{ textAlign: "right", marginTop: "20px", fontSize: "18px" }}>
        <strong>Total Price: ${calculateDiscountedPrice().toFixed(2)}</strong>
      </div>
    </div>
  );
}

export default CartPage;
