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
    <>
      <style>
        {`
          .analytics-dashboard {
            padding: 30px;
            background: #f5f5f5;
            color: #213547;
            min-height: 100vh;
            transition: background 0.3s ease, color 0.3s ease;
          }

          .analytics-top-items {
            background: white;
            color: #213547;
            padding: 20px;
            border-radius: 12px;
            margin-top: 30px;
            overflow-x: auto;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          }

          .analytics-filter-button {
            padding: 10px 16px;
            cursor: pointer;
            border: 1px solid #ddd;
            border-radius: 8px;
          }

          .analytics-export-button {
            padding: 10px 16px;
            cursor: pointer;
            border-radius: 8px;
            border: 1px solid #ddd;
          }

          body[data-theme="dark"] .analytics-dashboard {
            background: #121212 !important;
            color: #ffffff !important;
          }

          body[data-theme="dark"] .analytics-dashboard h1,
          body[data-theme="dark"] .analytics-dashboard h2,
          body[data-theme="dark"] .analytics-dashboard p {
            color: #ffffff !important;
          }

          body[data-theme="dark"] .analytics-top-items {
            background: #1e1e1e !important;
            color: #ffffff !important;
          }

          body[data-theme="dark"] .analytics-filter-button {
            border-color: #555;
          }

          body[data-theme="dark"] .analytics-export-button {
            background: #242424;
            color: white;
            border-color: #555;
          }

          @media (max-width: 768px) {
            .analytics-dashboard {
              padding: 20px 15px;
            }
          }
        `}
      </style>

      <div className="analytics-dashboard">
        <h1>📊 Restaurant Analytics Dashboard</h1>

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            margin: "20px 0",
          }}
        >
          {[
            "Today",
            "This Week",
            "This Month",
            "Custom Date Range",
          ].map((item) => (
            <button
              key={item}
              className="analytics-filter-button"
              onClick={() => setFilter(item)}
              style={{
                background:
                  filter === item ? "#ff6b00" : "#ffffff",
                color:
                  filter === item ? "#ffffff" : "#000000",
              }}
            >
              {item}
            </button>
          ))}

          <button className="analytics-export-button">
            📥 Export CSV / PDF
          </button>
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

        <div className="analytics-top-items">
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
    </>
  );
}

export default AnalyticsDashboard;