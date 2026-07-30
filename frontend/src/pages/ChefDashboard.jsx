import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardCard from "../components/DashboardCard";
import Layout from "../components/Layout";
import {
  getRestaurant,
  getRestaurantId,
} from "../utils/restaurant";
import { getOrderStatistics } from "../api/analyticsApi";
import { getMenuByRestaurant } from "../api/menuApi";

function ChefDashboard() {
  const navigate = useNavigate();
  useEffect(() => {
  const restaurant = getRestaurant();

  if (!restaurant) {
    navigate("/select-restaurant");
    return;
  }

  loadDashboard();
}, []);
  

  const [orders, setOrders] = useState(0);
  const [preparing, setPreparing] = useState(0);
  const [ready, setReady] = useState(0);
  const [menuItems, setMenuItems] = useState(0);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const orderData = await getOrderStatistics();
      const menuData = await getMenuByRestaurant();

      setPreparing(orderData.preparing || 0);
      setReady(orderData.ready || 0);

      setOrders(
        (orderData.pending || 0) +
          (orderData.preparing || 0) +
          (orderData.ready || 0) +
          (orderData.served || 0)
      );

      setMenuItems(
        Array.isArray(menuData) ? menuData.length : 0
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
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
          Welcome Chef! Manage kitchen operations and monitor orders.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "25px",
          }}
        >
          <DashboardCard
            title="Total Orders"
            value={orders}
            icon="🛒"
          />

          <DashboardCard
            title="Preparing"
            value={preparing}
            icon="👨‍🍳"
          />

          <DashboardCard
            title="Ready"
            value={ready}
            icon="✅"
          />

          <DashboardCard
            title="Menu Items"
            value={menuItems}
            icon="🍽️"
          />
        </div>

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
              style={buttonStyle}
              onClick={() => navigate("/orders")}
            >
              🛒 View Orders
            </button>

            <button
              style={buttonStyle}
              onClick={() => navigate("/menu")}
            >
              🍽️ View Menu
            </button>

            <button
              style={buttonStyle}
              onClick={() => navigate("/profile")}
            >
              👤 Profile
            </button>
          </div>
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
              marginBottom: "20px",
            }}
          >
            🕒 Kitchen Activity
          </h2>

          {[
            "👨‍🍳 Kitchen is running smoothly",
            "🍽️ New orders received",
            "🔥 Food preparation in progress",
            "✅ Orders ready for serving",
            "📦 Ingredients available",
          ].map((item, index) => (
            <div
              key={index}
              style={{
                color: "#E5E7EB",
                padding: "15px 0",
                borderBottom:
                  index !== 4
                    ? "1px solid rgba(255,255,255,.06)"
                    : "none",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

const buttonStyle = {
  padding: "15px 28px",
  border: "none",
  borderRadius: "14px",
  background:
    "linear-gradient(90deg,#7C3AED,#F97316)",
  color: "white",
  fontWeight: "600",
  fontSize: "15px",
  cursor: "pointer",
  transition: "0.3s ease",
  boxShadow: "0 8px 20px rgba(0,0,0,.25)",
};

export default ChefDashboard;