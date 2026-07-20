import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import api from "../api/api";

function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCartItems(cart);
  };

  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

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

  const decreaseQuantity = (id) => {
    const updatedCart = cartItems
      .map((item) =>
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

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(
      (item) => item.id !== id
    );

    updateCart(updatedCart);
  };

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

  const checkout = async () => {
    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      const order = {
        restaurant_id:
          cartItems[0].restaurant_id,

        customer_id: 1,

        payment_method: "Cash",

        items: cartItems.map((item) => ({
          menu_id: item.id,
          quantity: item.quantity,
        })),
      };

      const response = await api.post(
        "/orders",
        order
      );

      console.log(response.data);

      alert("Order placed successfully");

      localStorage.removeItem("cart");

      setCartItems([]);

      navigate("/orders");
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.detail ||
          "Failed to place order"
      );
    }
  };

  return (
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
          background: "rgba(18,18,24,.75)",
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
          }}
        >
          🛒 Your Cart
        </h1>

        <p
          style={{
            color: "#ccc",
            marginBottom: "35px",
          }}
        >
          Review your delicious order.
        </p>

        {cartItems.length === 0 ? (
          <h2
            style={{
              color: "white",
              textAlign: "center",
            }}
          >
            Your cart is empty
          </h2>
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
                }}
              >
                Order Summary
              </h2>

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  marginTop: "20px",
                  color: "#ddd",
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
                  marginTop: "15px",
                  color: "#ddd",
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
                  marginTop: "15px",
                  color: "#ddd",
                }}
              >
                <span>Delivery</span>

                <span>₹{delivery}</span>
              </div>

              <hr
                style={{
                  marginTop: "20px",
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
                  fontWeight: "bold",
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
                  padding: "15px",
                  border: "none",
                  borderRadius: "12px",
                  background:
                    "linear-gradient(90deg,#7C3AED,#F97316)",
                  color: "white",
                  fontWeight: "bold",
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
  );
}

export default Cart;