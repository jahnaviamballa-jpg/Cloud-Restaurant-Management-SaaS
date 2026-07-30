import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createOrder } from "../api/orderApi";
import { getRestaurantId } from "../utils/restaurant";
function AddOrder() {
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);

  const [order, setOrder] = useState({
  customer_name: "",
  customer_email: "",
  customer_phone: "",
  item_name: "",
  total_amount: "",
  status: "Pending",
});

  const handleChange = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setSaving(true);

    await createOrder({
      restaurant_id: getRestaurantId(),
      customer_name: order.customer_name,
      customer_email: order.customer_email,
      customer_phone: order.customer_phone,
      item_name: order.item_name,
      total_amount: Number(order.total_amount),
      status: order.status,
    });

    alert("Order created successfully!");
    navigate("/orders");
  } catch (error) {
    console.error(error);
    alert("Failed to create order.");
  } finally {
    setSaving(false);
  }
};

  const inputStyle = {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,.08)",
    background: "rgba(255,255,255,.08)",
    color: "white",
    fontSize: "15px",
    outline: "none",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background:
          "linear-gradient(rgba(0,0,0,.25),rgba(0,0,0,.35)),url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "auto",
          background: "rgba(18,18,24,.78)",
          padding: "35px",
          borderRadius: "25px",
          border: "1px solid rgba(255,255,255,.08)",
          backdropFilter: "blur(12px)",
        }}
      >
        <h1
          style={{
            color: "white",
            marginBottom: "10px",
          }}
        >
          ➕ Create Order
        </h1>

        <p
          style={{
            color: "#CFCFD5",
            marginBottom: "35px",
          }}
        >
          Create a new customer order.
        </p>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gap: "20px",
            }}
          >
                        <input
              type="text"
              name="customer_name"
              placeholder="Customer Name"
              value={order.customer_name}
              onChange={handleChange}
              style={inputStyle}
              required
            />
            <input
  type="text"
  name="item_name"
  placeholder="Item Name"
  value={order.item_name}
  onChange={handleChange}
  style={inputStyle}
  required
/>
            <input
  type="email"
  name="customer_email"
  placeholder="Customer Email"
  value={order.customer_email}
  onChange={handleChange}
  style={inputStyle}
  required
/>
            <input
              type="text"
              name="customer_phone"
              placeholder="Customer Phone"
              value={order.customer_phone}
              onChange={handleChange}
              style={inputStyle}
              required
            />

            <input
              type="number"
              name="total_amount"
              placeholder="Total Amount"
              value={order.total_amount}
              onChange={handleChange}
              style={inputStyle}
              min="1"
              step="0.01"
              required
            />

            <select
              name="status"
              value={order.status}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="Pending" style={{ color: "black" }}>
                Pending
              </option>

              <option value="Preparing" style={{ color: "black" }}>
                Preparing
              </option>

              <option value="Ready" style={{ color: "black" }}>
                Ready
              </option>

              <option value="Served" style={{ color: "black" }}>
                Served
              </option>

              <option value="Cancelled" style={{ color: "black" }}>
                Cancelled
              </option>
            </select>
                      </div>

          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "35px",
            }}
          >
            <button
              type="submit"
              disabled={saving}
              style={{
                flex: 1,
                padding: "16px",
                border: "none",
                borderRadius: "14px",
                background:
                  "linear-gradient(90deg,#7C3AED,#F97316)",
                color: "white",
                fontWeight: "700",
                fontSize: "16px",
                cursor: saving
                  ? "not-allowed"
                  : "pointer",
                opacity: saving ? 0.7 : 1,
              }}
            >
              {saving
                ? "Creating..."
                : "➕ Create Order"}
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/orders")
              }
              style={{
                flex: 1,
                padding: "16px",
                border: "none",
                borderRadius: "14px",
                background: "#374151",
                color: "white",
                fontWeight: "700",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              ❌ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddOrder;