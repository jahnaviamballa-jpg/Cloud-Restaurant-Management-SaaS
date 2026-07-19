import { useEffect, useState } from "react";

import AnalyticsCard from "../components/AnalyticsCard";
import TopItemsTable from "../components/TopItemsTable";
import OrderStatsCard from "../components/OrderStatsCard";

import {
  getSalesAnalytics,
  getRevenueAnalytics,
  getTopSellingItems,
  getOrderStatistics,
} from "../api/analyticsApi";

function AnalyticsDashboard() {
  const [filter, setFilter] = useState("This Month");
  const [sales, setSales] = useState({});
  const [revenue, setRevenue] = useState({});
  const [topItems, setTopItems] = useState([]);
  const [orderStats, setOrderStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);

        const [
          salesData,
          revenueData,
          topItemsData,
          orderStatsData,
        ] = await Promise.all([
          getSalesAnalytics(),
          getRevenueAnalytics(),
          getTopSellingItems(),
          getOrderStatistics(),
        ]);

        setSales(salesData || {});
        setRevenue(revenueData || {});

        setTopItems(
          Array.isArray(topItemsData)
            ? topItemsData.map((item, index) => ({
                id: index + 1,
                name: item.item,
                orders: item.orders,
                revenue: `₹${item.revenue}`,
              }))
            : []
        );

        setOrderStats(orderStatsData || {});
        setError("");
      } catch (err) {
        console.error("Analytics API Error:", err);
        setError("Failed to load analytics data");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const getRevenue = () => {
    if (filter === "Today") return revenue.today_revenue || 0;
    if (filter === "This Week") return revenue.weekly_revenue || 0;
    return revenue.monthly_revenue || 0;
  };

  const getOrders = () => {
    if (filter === "Today") return sales.today_orders || 0;
    if (filter === "This Week") return sales.weekly_orders || 0;
    return sales.monthly_orders || 0;
  };

  if (loading) {
    return (
      <h2
        style={{
          color: "white",
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        Loading Analytics...
      </h2>
    );
  }

  if (error) {
    return (
      <h2
        style={{
          color: "#EF4444",
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        {error}
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
          📊 Analytics Dashboard
        </h1>

        <p
          style={{
            color: "#CFCFD5",
            fontSize: "18px",
            marginBottom: "35px",
          }}
        >
          Monitor revenue, sales, customer orders and restaurant performance.
        </p>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "25px",
          }}
        >
          {["Today", "This Week", "This Month"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              style={{
                padding: "12px 22px",
                borderRadius: "30px",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "15px",

                background:
                  filter === item
                    ? "linear-gradient(90deg,#7C3AED,#F97316)"
                    : "rgba(20,20,28,.92)",

                color:
                  filter === item
                    ? "white"
                    : "#d5d5d5",

                border:
                  filter === item
                    ? "none"
                    : "1px solid rgba(255,255,255,.08)",
              }}
            >
              {item}
            </button>
          ))}
        </div>

        <p
          style={{
            color: "#E5E7EB",
            marginBottom: "25px",
          }}
        >
          Selected Filter : <strong>{filter}</strong>
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "25px",
          }}
        >
          <AnalyticsCard
            icon="💰"
            title="Total Revenue"
            value={`₹${getRevenue()}`}
          />

          <AnalyticsCard
            icon="📦"
            title="Total Orders"
            value={getOrders()}
          />

          <AnalyticsCard
            icon="🔥"
            title="Top Selling Items"
            value={topItems.length}
          />

          <AnalyticsCard
            icon="⏳"
            title="Pending Orders"
            value={orderStats.pending || 0}
          />
        </div>

        <div
          style={{
            marginTop: "35px",
            background: "rgba(20,20,28,.92)",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,.08)",
            backdropFilter: "blur(10px)",
            padding: "25px",
            overflowX: "auto",
          }}
        >
          <TopItemsTable items={topItems} />
        </div>

        <h2
          style={{
            color: "white",
            marginTop: "40px",
            marginBottom: "20px",
          }}
        >
          🧾 Order Statistics
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(180px,1fr))",
            gap: "20px",
          }}
        >
          <OrderStatsCard
            title="Pending Orders"
            value={orderStats.pending || 0}
            color="#FFF3CD"
          />

          <OrderStatsCard
            title="Preparing Orders"
            value={orderStats.preparing || 0}
            color="#CFE2FF"
          />

          <OrderStatsCard
            title="Ready Orders"
            value={orderStats.ready || 0}
            color="#D1E7DD"
          />

          <OrderStatsCard
            title="Served Orders"
            value={orderStats.served || 0}
            color="#DCFCE7"
          />

          <OrderStatsCard
            title="Cancelled Orders"
            value={orderStats.cancelled || 0}
            color="#FECACA"
          />
        </div>
      </div>
    </div>
  );
}

export default AnalyticsDashboard;