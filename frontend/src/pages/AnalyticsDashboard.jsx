import { useState } from "react";

import AnalyticsCard from "../components/AnalyticsCard";
import RevenueChart from "../components/RevenueChart";
import SalesChart from "../components/SalesChart";
import TopItemsTable from "../components/TopItemsTable";
import OrderStatsCard from "../components/OrderStatsCard";

function AnalyticsDashboard() {
  const [filter, setFilter] = useState("This Month");

  const topItems = [
    {
      id: 1,
      name: "Chicken Biryani",
      orders: 320,
      revenue: "₹95,000",
    },
    {
      id: 2,
      name: "Paneer Biryani",
      orders: 180,
      revenue: "₹45,000",
    },
    {
      id: 3,
      name: "French Fries",
      orders: 140,
      revenue: "₹18,000",
    },
  ];

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
        {["Today", "This Week", "This Month", "Custom Date Range"].map(
          (item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              style={{
                padding: "10px 16px",
                cursor: "pointer",
                background: filter === item ? "#333" : "white",
                color: filter === item ? "white" : "black",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            >
              {item}
            </button>
          )
        )}

        <button style={{ padding: "10px 16px" }}>
          Export CSV / PDF
        </button>
      </div>

      <p>Selected Filter: {filter}</p>

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
          value="₹1,25,000"
        />

        <AnalyticsCard
          icon="📦"
          title="Total Orders"
          value="850"
        />

        <AnalyticsCard
          icon="🍽️"
          title="Total Menu Items"
          value="120"
        />

        <AnalyticsCard
          icon="🏪"
          title="Active Restaurants"
          value="15"
        />
      </div>

      <div style={{ marginTop: "30px" }}>
        <RevenueChart />
      </div>

      <div style={{ marginTop: "30px" }}>
        <SalesChart />
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
          value="25"
          color="#fff3cd"
        />

        <OrderStatsCard
          title="Preparing Orders"
          value="18"
          color="#cfe2ff"
        />

        <OrderStatsCard
          title="Ready Orders"
          value="12"
          color="#d1e7dd"
        />

        <OrderStatsCard
          title="Served Orders"
          value="780"
          color="#d4edda"
        />

        <OrderStatsCard
          title="Cancelled Orders"
          value="15"
          color="#f8d7da"
        />
      </div>
    </div>
  );
}

export default AnalyticsDashboard;