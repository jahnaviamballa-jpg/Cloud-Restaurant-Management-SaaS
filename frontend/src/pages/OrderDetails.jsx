import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { getOrder } from "../api/orderApi";

function OrderDetails() {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const [loading, setLoading] =
    useState(true);

  const [order, setOrder] =
    useState(null);

  useEffect(() => {
    loadOrder();
  }, []);

  const loadOrder = async () => {
    try {
      const data = await getOrder(orderId);

      setOrder(data);
    } catch (error) {
      console.error(error);

      alert("Unable to load order.");

      navigate("/orders");
    } finally {
      setLoading(false);
    }
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
          maxWidth: "850px",
          margin: "auto",
          background: "rgba(18,18,24,.78)",
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
          📄 Order Details
        </h1>

        <p
          style={{
            color: "#CFCFD5",
            marginBottom: "35px",
          }}
        >
          View complete information about this order.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(300px,1fr))",
            gap: "20px",
          }}
        >
                  <div
            style={{
              background: "rgba(255,255,255,.08)",
              padding: "20px",
              borderRadius: "15px",
            }}
          >
            <h3 style={{ color: "#9CA3AF" }}>
              Customer Name
            </h3>

            <p
              style={{
                color: "white",
                fontSize: "20px",
                fontWeight: "600",
              }}
            >
              {order.customer_name}
            </p>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,.08)",
              padding: "20px",
              borderRadius: "15px",
            }}
          >
            <h3 style={{ color: "#9CA3AF" }}>
              Customer Phone
            </h3>

            <p
              style={{
                color: "white",
                fontSize: "20px",
                fontWeight: "600",
              }}
            >
              {order.customer_phone}
            </p>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,.08)",
              padding: "20px",
              borderRadius: "15px",
            }}
          >
            <h3 style={{ color: "#9CA3AF" }}>
              Total Amount
            </h3>

            <p
              style={{
                color: "#FACC15",
                fontSize: "24px",
                fontWeight: "700",
              }}
            >
              ₹{order.total_amount}
            </p>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,.08)",
              padding: "20px",
              borderRadius: "15px",
            }}
          >
            <h3 style={{ color: "#9CA3AF" }}>
              Order Status
            </h3>

            <p
              style={{
                color:
                  order.status === "Served"
                    ? "#22C55E"
                    : order.status === "Cancelled"
                    ? "#EF4444"
                    : "#FACC15",
                fontSize: "20px",
                fontWeight: "700",
              }}
            >
              {order.status}
            </p>
          </div>
                  </div>

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "35px",
          }}
        >
          <button
            type="button"
            onClick={() => navigate("/orders")}
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
            ← Back to Orders
          </button>

          <button
            type="button"
            onClick={() =>
              navigate(`/edit-order/${orderId}`)
            }
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
              cursor: "pointer",
            }}
          >
            ✏️ Edit Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;