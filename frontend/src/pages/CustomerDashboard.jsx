import { useEffect, useState } from "react";
import DashboardCard from "../components/DashboardCard";
import {
  getCustomerStats,
  getRecentOrders,
} from "../api/customerApi";
import { Link } from "react-router-dom";

function CustomerDashboard() {
  const [stats, setStats] = useState({
    total_orders: 0,
    pending_orders: 0,
    completed_orders: 0,
    total_spent: 0,
  });

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const statsData = await getCustomerStats();
      setStats(statsData);

      const ordersData = await getRecentOrders();
      setOrders(ordersData);
    } catch (error) {
      console.error(error);
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
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "42px",
            marginBottom: "10px",
          }}
        >
          👤 Customer Dashboard
        </h1>

        <p
          style={{
            color: "#CFCFD5",
            fontSize: "18px",
            marginBottom: "35px",
          }}
        >
          Welcome back! Manage your food orders and reservations.
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
            title="Total Orders"
            value={stats.total_orders}
            icon="🛒"
          />

          <DashboardCard
            title="Pending Orders"
            value={stats.pending_orders}
            icon="⏳"
          />

          <DashboardCard
            title="Completed"
            value={stats.completed_orders}
            icon="✅"
          />

          <DashboardCard
            title="Total Spent"
            value={`₹${stats.total_spent}`}
            icon="💰"
          />
        </div>

        <div
          style={{
            marginTop: "45px",
            background: "rgba(20,20,28,.92)",
            borderRadius: "20px",
            padding: "30px",
            border: "1px solid rgba(255,255,255,.08)",
          }}
        >
          <h2
            style={{
              color: "white",
              marginBottom: "25px",
            }}
          >
            📦 Recent Orders
          </h2>

          {orders.length === 0 ? (
            <p style={{ color: "#CFCFD5" }}>
              No orders found.
            </p>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "18px 0",
                  borderBottom:
                    "1px solid rgba(255,255,255,.06)",
                }}
              >
                <div>
                  <h3
                    style={{
                      color: "white",
                      margin: 0,
                    }}
                  >
                    Order #{order.id}
                  </h3>

                  <p
                    style={{
                      color: "#BDBDBD",
                      marginTop: "6px",
                    }}
                  >
                    ₹{order.total_amount}
                  </p>
                </div>

                <span
                  style={{
                    padding: "8px 18px",
                    borderRadius: "30px",
                    background:
                      order.order_status === "Pending"
                        ? "#F97316"
                        : order.order_status === "Preparing"
                        ? "#3B82F6"
                        : order.order_status === "Ready"
                        ? "#22C55E"
                        : "#7C3AED",
                    color: "white",
                    fontWeight: "600",
                  }}
                >
                  {order.order_status}
                </span>
              </div>
            ))
          )}
        </div>

        <div
          style={{
            marginTop: "40px",
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <Link to="/restaurants">
            <button
              style={{
                padding: "15px 30px",
                border: "none",
                borderRadius: "15px",
                background:
                  "linear-gradient(90deg,#7C3AED,#F97316)",
                color: "white",
                cursor: "pointer",
                fontWeight: "700",
              }}
            >
              🍽 Browse Restaurants
            </button>
          </Link>

          <Link to="/orders">
            <button
              style={{
                padding: "15px 30px",
                border: "none",
                borderRadius: "15px",
                background: "#22C55E",
                color: "white",
                cursor: "pointer",
                fontWeight: "700",
              }}
            >
              📦 View Orders
            </button>
          </Link>

          <Link to="/reservations">
            <button
              style={{
                padding: "15px 30px",
                border: "none",
                borderRadius: "15px",
                background: "#3B82F6",
                color: "white",
                cursor: "pointer",
                fontWeight: "700",
              }}
            >
              📅 Reservations
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;