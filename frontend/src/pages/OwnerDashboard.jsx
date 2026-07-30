import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import DashboardCard from "../components/DashboardCard";
import {
  getRestaurant,
  getRestaurantId,
} from "../utils/restaurant";
import { getRestaurants } from "../api/restaurantApi";
import {
  getSalesAnalytics,
  getRevenueAnalytics,
  getOrderStatistics,
} from "../api/analyticsApi";

function OwnerDashboard() {
  const navigate = useNavigate();
  useEffect(() => {
  const restaurant = getRestaurant();

  if (!restaurant) {
    navigate("/select-restaurant");
    return;
  }

  loadDashboard();
}, []);
 

  const [restaurantCount, setRestaurantCount] = useState(0);
  const [sales, setSales] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [orders, setOrders] = useState(0);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const restaurants = await getRestaurants();

      const salesData = await getSalesAnalytics();

      const revenueData =
        await getRevenueAnalytics();

      const orderData =
        await getOrderStatistics();

      setRestaurantCount(
        Array.isArray(restaurants)
          ? restaurants.length
          : 0
      );

      setSales(
  salesData.today_orders ??
  salesData.weekly_orders ??
  salesData.monthly_orders ??
  0
);

      setRevenue(
  revenueData.today_revenue ??
  revenueData.weekly_revenue ??
  revenueData.monthly_revenue ??
  0
);

      setOrders(
        (orderData.pending || 0) +
          (orderData.preparing || 0) +
          (orderData.ready || 0) +
          (orderData.served || 0)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
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
          border:
            "1px solid rgba(255,255,255,.08)",
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
          👑 Owner Dashboard
        </h1>

        <p
          style={{
            color: "#CFCFD5",
            fontSize: "18px",
            marginBottom: "35px",
          }}
        >
          Welcome back! Here's a complete
          overview of your restaurant business.
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
            title="Restaurants"
            value={restaurantCount}
            icon="🍽️"
          />

          <DashboardCard
            title="Orders"
            value={orders}
            icon="🛒"
          />

          <DashboardCard
            title="Revenue"
            value={`₹${revenue}`}
            icon="💰"
          />

          <DashboardCard
            title="Sales"
            value={sales}
            icon="📈"
          />
        </div>

        {/* Quick Actions */}

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
      onClick={() => navigate("/add-restaurant")}
    >
      ➕ Add Restaurant
    </button>

    <button
      style={buttonStyle}
      onClick={() => navigate("/restaurants")}
    >
      🍽️ View Restaurants
    </button>

    <button
      style={buttonStyle}
      onClick={() => navigate("/inventory")}
    >
      📦 Inventory
    </button>

    <button
      style={buttonStyle}
      onClick={() => navigate("/analytics-dashboard")}
    >
      📊 Analytics
    </button>

    <button
      style={buttonStyle}
      onClick={() => navigate("/sales-report")}
    >
      📈 Sales Report
    </button>

    <button
      style={buttonStyle}
      onClick={() => navigate("/revenue-report")}
    >
      💰 Revenue Report
    </button>
  </div>
</div>
                {/* Business Overview */}

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
              border:
                "1px solid rgba(255,255,255,.08)",
            }}
          >
            <h2
              style={{
                color: "white",
                marginBottom: "20px",
              }}
            >
              📈 Business Growth
            </h2>

            <h1
              style={{
                color: "#22C55E",
                fontSize: "50px",
                margin: 0,
              }}
            >
              +28%
            </h1>

            <p
              style={{
                color: "#BDBDBD",
                marginTop: "15px",
              }}
            >
              Compared to last month.
            </p>
          </div>

          <div
            style={{
              background: "rgba(20,20,28,.92)",
              borderRadius: "20px",
              padding: "30px",
              border:
                "1px solid rgba(255,255,255,.08)",
            }}
          >
            <h2
              style={{
                color: "white",
                marginBottom: "20px",
              }}
            >
              ⭐ Customer Satisfaction
            </h2>

            <h1
              style={{
                color: "#FACC15",
                fontSize: "50px",
                margin: 0,
              }}
            >
              4.9★
            </h1>

            <p
              style={{
                color: "#BDBDBD",
                marginTop: "15px",
              }}
            >
              Based on customer ratings.
            </p>
          </div>
        </div>

        {/* Recent Activity */}

        <div
          style={{
            marginTop: "45px",
            background: "rgba(20,20,28,.92)",
            borderRadius: "20px",
            padding: "30px",
            border:
              "1px solid rgba(255,255,255,.08)",
          }}
        >
          <h2
            style={{
              color: "white",
              marginBottom: "25px",
            }}
          >
            🕒 Recent Activity
          </h2>

          {[
            "🛒 18 new orders received",
            "💰 Revenue increased today",
            "📦 Inventory updated",
            "⭐ New customer review received",
            "👨‍🍳 Staff attendance completed",
          ].map((activity, index) => (
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
              {activity}
            </div>
          ))}
        </div>
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

export default OwnerDashboard;