import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../components/Layout";
import CartItem from "../components/CartItem";

import api from "../api/api";

import {
  getRestaurant,
  getRestaurantId,
} from "../utils/restaurant";

function Cart() {
  const navigate = useNavigate();

  // =====================================
  // Restaurant
  // =====================================

  const restaurant = getRestaurant();

  const restaurantId = getRestaurantId();

  const cartKey = `cart_${restaurantId}`;

  // =====================================
  // States
  // =====================================

  const [cartItems, setCartItems] = useState([]);

  // =====================================
  // Load Cart
  // =====================================

  useEffect(() => {
    loadCart();

    window.addEventListener(
      "cartUpdated",
      loadCart
    );

    return () =>
      window.removeEventListener(
        "cartUpdated",
        loadCart
      );
  }, []);

  const loadCart = () => {
    const cart =
      JSON.parse(
        localStorage.getItem(cartKey)
      ) || [];

    setCartItems(cart);
  };

  // =====================================
  // Update Cart
  // =====================================

  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);

    localStorage.setItem(
      cartKey,
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );
  };

  // =====================================
  // Increase Quantity
  // =====================================

  const increaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );

    updateCart(updatedCart);
  };

  // =====================================
  // Decrease Quantity
  // =====================================

  const decreaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: Math.max(
              1,
              item.quantity - 1
            ),
          }
        : item
    );

    updateCart(updatedCart);
  };

  // =====================================
  // Remove Item
  // =====================================

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(
      (item) => item.id !== id
    );

    updateCart(updatedCart);
  };

  // =====================================
  // Price Calculation
  // =====================================

  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const gst = subtotal * 0.05;

  const delivery =
    cartItems.length > 0 ? 50 : 0;

  const total =
    subtotal + gst + delivery;
      // =====================================
  // Checkout
  // =====================================

  const checkout = async () => {
    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      const user = JSON.parse(
        localStorage.getItem("user") || "null"
      );

      if (!user) {
        alert("Please login again.");
        navigate("/login");
        return;
      }

      if (!restaurant) {
        alert("Please select a restaurant.");
        navigate("/restaurant-selection");
        return;
      }

      const order = {
  restaurant_id: restaurant.restaurant_id,

  customer_id: Number(user.id),

  customer_name: user.name,

  customer_email: user.email,

  customer_phone: user.phone,

  item_name: cartItems
    .map((item) => item.name)
    .join(", "),

  total_amount: Number(total.toFixed(2)),

  status: "Pending",
};

      console.log("ORDER =", order);

      const response = await api.post(
        "/orders/",
        order
      );

      console.log(response.data);

      alert("Order placed successfully!");

      // =====================================
      // Clear only current restaurant cart
      // =====================================

      localStorage.removeItem(cartKey);

      setCartItems([]);

      window.dispatchEvent(
        new Event("cartUpdated")
      );

      navigate("/orders");
    } catch (err) {
      console.error(err);

      console.log(
        "Backend Error:",
        err.response?.data
      );

      alert(
        err.response?.data?.detail ||
          "Failed to place order"
      );
    }
  };
  return (
  <Layout>
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background:
          "linear-gradient(rgba(0,0,0,.18),rgba(0,0,0,.22)),url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div
        style={{
          background: "rgba(18,18,24,.78)",
          borderRadius: "25px",
          padding: "35px",
          border:
            "1px solid rgba(255,255,255,.08)",
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "42px",
            marginBottom: "10px",
          }}
        >
          🛒 Your Cart
        </h1>

        <p
          style={{
            color: "#CFCFD5",
            marginBottom: "30px",
          }}
        >
          {restaurant
            ? `Restaurant : ${restaurant.restaurant_name}`
            : "Review your order"}
        </p>

        {cartItems.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "80px 20px",
            }}
          >
            <h2 style={{ color: "white" }}>
              Your cart is empty
            </h2>

            <button
              onClick={() => navigate("/menu")}
              style={{
                marginTop: "30px",
                padding: "14px 28px",
                border: "none",
                borderRadius: "12px",
                background:
                  "linear-gradient(90deg,#7C3AED,#F97316)",
                color: "white",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              🍽 Browse Menu
            </button>
          </div>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  increaseQuantity={
                    increaseQuantity
                  }
                  decreaseQuantity={
                    decreaseQuantity
                  }
                  removeItem={removeItem}
                />
              ))}
            </div>

            <div
              style={{
                marginTop: "40px",
                background:
                  "rgba(20,20,28,.92)",
                borderRadius: "20px",
                padding: "30px",
              }}
            >
              <h2
                style={{
                  color: "white",
                  marginBottom: "25px",
                }}
              >
                Order Summary
              </h2>

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  color: "#D1D5DB",
                  marginBottom: "15px",
                }}
              >
                <span>Subtotal</span>
                <span>
                  ₹{subtotal.toFixed(2)}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  color: "#D1D5DB",
                  marginBottom: "15px",
                }}
              >
                <span>GST (5%)</span>
                <span>
                  ₹{gst.toFixed(2)}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  color: "#D1D5DB",
                  marginBottom: "20px",
                }}
              >
                <span>Delivery</span>
                <span>₹{delivery}</span>
              </div>

              <hr
                style={{
                  borderColor:
                    "rgba(255,255,255,.1)",
                  marginBottom: "20px",
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  color: "white",
                  fontSize: "24px",
                  fontWeight: "700",
                }}
              >
                <span>Total</span>
                <span>
                  ₹{total.toFixed(2)}
                </span>
              </div>

              <button
                onClick={checkout}
                style={{
                  width: "100%",
                  marginTop: "30px",
                  padding: "16px",
                  border: "none",
                  borderRadius: "12px",
                  background:
                    "linear-gradient(90deg,#7C3AED,#F97316)",
                  color: "white",
                  fontWeight: "700",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  </Layout>
);
}

export default Cart;