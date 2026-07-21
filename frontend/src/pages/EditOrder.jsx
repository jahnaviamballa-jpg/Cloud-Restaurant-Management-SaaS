import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getOrder,
  updateOrder,
} from "../api/orderApi";

function EditOrder() {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [order, setOrder] = useState({
    customer_name: "",
    customer_phone: "",
    total_amount: "",
    status: "Pending",
  });

  useEffect(() => {
    loadOrder();
  }, []);

  const loadOrder = async () => {
    try {
      const data = await getOrder(orderId);

      setOrder({
        customer_name:
          data.customer_name || "",

        customer_phone:
          data.customer_phone || "",

        total_amount:
          data.total_amount || "",

        status:
          data.status || "Pending",
      });
    } catch (error) {
      console.error(error);

      alert("Unable to load order.");

      navigate("/orders");
    } finally {
      setLoading(false);
    }
  };

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

      await updateOrder(orderId, {
        ...order,
        total_amount: Number(
          order.total_amount
        ),
      });

      alert(
        "Order updated successfully!"
      );

      navigate("/orders");
    } catch (error) {
      console.error(error);

      alert("Failed to update order.");
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border:
      "1px solid rgba(255,255,255,.08)",
    background:
      "rgba(255,255,255,.08)",
    color: "white",
    fontSize: "15px",
    outline: "none",
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#111827",
        }}
      >
        <h2
          style={{
            color: "white",
          }}
        >
          Loading Order...
        </h2>
      </div>
    );
  }

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
          background:
            "rgba(18,18,24,.78)",
          padding: "35px",
          borderRadius: "25px",
          border:
            "1px solid rgba(255,255,255,.08)",
          backdropFilter: "blur(12px)",
        }}
      >
        <h1
          style={{
            color: "white",
            marginBottom: "10px",
          }}
        >
          ✏️ Edit Order
        </h1>

        <p
          style={{
            color: "#CFCFD5",
            marginBottom: "35px",
          }}
        >
          Update order details.
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
              <option
                value="Pending"
                style={{ color: "black" }}
              >
                Pending
              </option>

              <option
                value="Preparing"
                style={{ color: "black" }}
              >
                Preparing
              </option>

              <option
                value="Ready"
                style={{ color: "black" }}
              >
                Ready
              </option>

              <option
                value="Served"
                style={{ color: "black" }}
              >
                Served
              </option>

              <option
                value="Cancelled"
                style={{ color: "black" }}
              >
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
                ? "Saving..."
                : "💾 Save Changes"}
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

export default EditOrder;