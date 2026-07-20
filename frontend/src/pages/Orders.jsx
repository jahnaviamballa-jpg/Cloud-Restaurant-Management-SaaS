import { useEffect, useState } from "react";
import { getOrders } from "../api/orderApi";
function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);

      const data = await getOrders();

      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      alert("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#7C3AED";

      case "Preparing":
        return "#F97316";

      case "Ready":
        return "#22C55E";

      case "Served":
        return "#2563EB";

      case "Cancelled":
        return "#DC2626";

      default:
        return "#6B7280";
    }
  };

  if (loading) {
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        Loading Orders...
      </h2>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background:
          "linear-gradient(rgba(0,0,0,.20),rgba(0,0,0,.25)),url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          background: "rgba(18,18,24,.75)",
          borderRadius: "25px",
          padding: "35px",
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "42px",
          }}
        >
          📦 My Orders
        </h1>

        <p
          style={{
            color: "#ccc",
            marginBottom: "35px",
          }}
        >
          Track your orders in real time.
        </p>

        <button
          onClick={loadOrders}
          style={{
            marginBottom: "30px",
            padding: "12px 25px",
            border: "none",
            borderRadius: "10px",
            background:
              "linear-gradient(90deg,#7C3AED,#F97316)",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          🔄 Refresh Orders
        </button>

        {orders.length === 0 ? (
          <h2
            style={{
              color: "white",
              textAlign: "center",
            }}
          >
            No Orders Found
          </h2>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              style={{
                background:
                  "rgba(20,20,28,.92)",
                borderRadius: "20px",
                padding: "25px",
                marginBottom: "20px",
                border:
                  "1px solid rgba(255,255,255,.08)",
              }}
            >
              <h2 style={{ color: "white" }}>
                Order #{order.id}
              </h2>

              <p style={{ color: "#ccc" }}>
                Customer ID : {order.customer_id}
              </p>

              <p style={{ color: "#ccc" }}>
                Restaurant ID : {order.restaurant_id}
              </p>

              <p style={{ color: "#ccc" }}>
                Payment : {order.payment_method}
              </p>

              <p style={{ color: "#ccc" }}>
                Amount : ₹{order.total_amount}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  marginTop: "15px",
                }}
              >
                <span
                  style={{
                    background: getStatusColor(
                      order.order_status
                    ),
                    padding: "8px 18px",
                    borderRadius: "20px",
                    color: "white",
                  }}
                >
                  {order.order_status}
                </span>

                <span
                  style={{
                    background:
                      order.payment_status ===
                      "Paid"
                        ? "#22C55E"
                        : "#DC2626",
                    padding: "8px 18px",
                    borderRadius: "20px",
                    color: "white",
                  }}
                >
                  {order.payment_status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Orders;