import { useEffect, useState } from "react";
import DashboardCard from "../components/DashboardCard";
import {
  getOrders,
  getOrderStats,
  updateOrderStatus,
} from "../api/orderApi";

function ChefDashboard() {
  const [orders, setOrders] = useState({
    pending: 0,
    preparing: 0,
    ready: 0,
    served: 0,
    cancelled: 0,
  });

  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const [stats, orderData] = await Promise.all([
        getOrderStats(),
        getOrders(),
      ]);

      setOrders(stats);
      setOrderList(orderData);
    } catch (error) {
      console.error(error);
    }
  };

  const changeStatus = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      loadOrders();
    } catch (error) {
      console.error(error);
      alert("Failed to update order");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background:
          "linear-gradient(rgba(0,0,0,.20),rgba(0,0,0,.25)),url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80')",
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
          border: "1px solid rgba(255,255,255,.08)",
          backdropFilter: "blur(12px)",
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "42px",
            marginBottom: "10px",
          }}
        >
          👨‍🍳 Chef Dashboard
        </h1>

        <p
          style={{
            color: "#CFCFD5",
            fontSize: "18px",
            marginBottom: "35px",
          }}
        >
          Monitor kitchen activities and manage every order efficiently.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "25px",
          }}
        >
          <DashboardCard
            title="Pending"
            value={orders.pending}
            icon="🛒"
          />

          <DashboardCard
            title="Preparing"
            value={orders.preparing}
            icon="🔥"
          />

          <DashboardCard
            title="Ready"
            value={orders.ready}
            icon="✅"
          />

          <DashboardCard
            title="Served"
            value={orders.served}
            icon="🍽️"
          />

          <DashboardCard
            title="Cancelled"
            value={orders.cancelled || 0}
            icon="❌"
          />
        </div>

        <div
          style={{
            marginTop: "45px",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(320px,1fr))",
            gap: "25px",
          }}
        >
          <div
            style={{
              background: "rgba(20,20,28,.92)",
              borderRadius: "20px",
              padding: "30px",
              border: "1px solid rgba(255,255,255,.08)",
            }}
          >
            <h2
              style={{
                color: "white",
                marginBottom: "20px",
              }}
            >
              ⏱ Average Preparation Time
            </h2>

            <h1
              style={{
                color: "#F97316",
                fontSize: "48px",
              }}
            >
              18 min
            </h1>

            <p style={{ color: "#BDBDBD" }}>
              Average preparation time today.
            </p>
          </div>

          <div
            style={{
              background: "rgba(20,20,28,.92)",
              borderRadius: "20px",
              padding: "30px",
              border: "1px solid rgba(255,255,255,.08)",
            }}
          >
            <h2
              style={{
                color: "white",
                marginBottom: "20px",
              }}
            >
              ⭐ Kitchen Rating
            </h2>

            <h1
              style={{
                color: "#22C55E",
                fontSize: "48px",
              }}
            >
              4.8★
            </h1>

            <p style={{ color: "#BDBDBD" }}>
              Customer satisfaction score.
            </p>
          </div>
        </div>

        {/* Live Kitchen Queue */}
        {/* Chef Actions */}

<div
  style={{
    marginTop: "45px",
  }}
>
  <h2
    style={{
      color: "white",
      marginBottom: "20px",
    }}
  >
    ⚡ Quick Actions
  </h2>

  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
    }}
  >
    <button
      onClick={loadOrders}
      style={{
        padding: "15px 28px",
        border: "none",
        borderRadius: "14px",
        background:
          "linear-gradient(90deg,#7C3AED,#F97316)",
        color: "white",
        fontWeight: "600",
        cursor: "pointer",
      }}
    >
      🔄 Refresh Orders
    </button>

    <button
      onClick={() => window.location.href = "/orders"}
      style={{
        padding: "15px 28px",
        border: "none",
        borderRadius: "14px",
        background: "#22C55E",
        color: "white",
        fontWeight: "600",
        cursor: "pointer",
      }}
    >
      📋 View Orders
    </button>

    <button
      onClick={() => window.location.href = "/inventory"}
      style={{
        padding: "15px 28px",
        border: "none",
        borderRadius: "14px",
        background: "#3B82F6",
        color: "white",
        fontWeight: "600",
        cursor: "pointer",
      }}
    >
      📦 Inventory
    </button>

    <button
      onClick={() => window.location.href = "/manager-dashboard"}
      style={{
        padding: "15px 28px",
        border: "none",
        borderRadius: "14px",
        background: "#EF4444",
        color: "white",
        fontWeight: "600",
        cursor: "pointer",
      }}
    >
      🏠 Manager Dashboard
    </button>
  </div>
</div>

</div>
</div>
);
}

export default ChefDashboard;