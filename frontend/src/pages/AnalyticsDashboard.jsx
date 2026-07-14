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
    if (filter === "Today") {
      return revenue.today_revenue || 0;
    }

    if (filter === "This Week") {
      return revenue.weekly_revenue || 0;
    }

    return revenue.monthly_revenue || 0;
  };

  const getOrders = () => {
    if (filter === "Today") {
      return sales.today_orders || 0;
    }

    if (filter === "This Week") {
      return sales.weekly_orders || 0;
    }

    return sales.monthly_orders || 0;
  };

  if (loading) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "100px" }}>
        Loading Analytics...
      </h2>
    );
  }

  if (error) {
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "100px",
          color: "red",
        }}
      >
        {error}
      </h2>
    );
  }

  return (
    <div
      style={{
        padding: "30px",
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <h1>📊 Restaurant Analytics Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          margin: "20px 0",
        }}
      >
        {["Today", "This Week", "This Month"].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            style={{
              padding: "10px 16px",
              cursor: "pointer",
              borderRadius: "8px",
              border: "1px solid #ddd",
              background:
                filter === item ? "#ff6b00" : "#ffffff",
              color:
                filter === item ? "#ffffff" : "#000000",
            }}
          >
            {item}
          </button>
        ))}
      </div>

      <p>
        Selected Filter: <strong>{filter}</strong>
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
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
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          marginTop: "30px",
          overflowX: "auto",
        }}
      >
        <TopItemsTable items={topItems} />
      </div>

      <h2 style={{ marginTop: "30px" }}>
        🧾 Order Statistics
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "15px",
        }}
      >
        <OrderStatsCard
          title="Pending Orders"
          value={orderStats.pending || 0}
          color="#fff3cd"
        />

        <OrderStatsCard
          title="Preparing Orders"
          value={orderStats.preparing || 0}
          color="#cfe2ff"
        />

        <OrderStatsCard
          title="Ready Orders"
          value={orderStats.ready || 0}
          color="#d1e7dd"
        />

        <OrderStatsCard
          title="Served Orders"
          value={orderStats.served || 0}
          color="#d4edda"
        />

        <OrderStatsCard
          title="Cancelled Orders"
          value={orderStats.cancelled || 0}
          color="#f8d7da"
        />
      </div>
    </div>
  );
}

export default AnalyticsDashboard;