import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardCard from "../components/DashboardCard";

import { getInventoryStats } from "../api/inventoryApi";
import { getOrderStats } from "../api/orderApi";
import { getLowStockNotifications } from "../api/notificationApi";
import { getSalesReport } from "../api/reportApi";

function ManagerDashboard() {
  const navigate = useNavigate();

  const [inventory, setInventory] = useState({
    total_items: 0,
    low_stock: 0,
    critical_stock: 0,
  });

  const [orders, setOrders] = useState({
    pending: 0,
    preparing: 0,
    ready: 0,
    served: 0,
  });

  const [alerts, setAlerts] = useState([]);

  const [sales, setSales] = useState({
    total_revenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const [
        inventoryData,
        orderData,
        alertData,
        salesData,
      ] = await Promise.all([
        getInventoryStats(),
        getOrderStats(),
        getLowStockNotifications(),
        getSalesReport(),
      ]);

      setInventory(inventoryData);
      setOrders(orderData);
      setAlerts(alertData);
      setSales(salesData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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
        Loading Dashboard...
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
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "42px",
            marginBottom: "10px",
          }}
        >
          👨‍💼 Restaurant Manager Dashboard
        </h1>

        <p
          style={{
            color: "#CFCFD5",
            fontSize: "18px",
            marginBottom: "35px",
          }}
        >
          Monitor your restaurant performance in real time.
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
            title="Inventory Items"
            value={inventory.total_items}
            icon="📦"
          />

          <DashboardCard
            title="Low Stock"
            value={inventory.low_stock}
            icon="⚠️"
          />

          <DashboardCard
            title="Critical Stock"
            value={inventory.critical_stock}
            icon="🚨"
          />

          <DashboardCard
            title="Pending Orders"
            value={orders.pending}
            icon="🛒"
          />

          <DashboardCard
            title="Preparing Orders"
            value={orders.preparing}
            icon="👨‍🍳"
          />

          <DashboardCard
            title="Ready Orders"
            value={orders.ready}
            icon="✅"
          />

          <DashboardCard
            title="Served Orders"
            value={orders.served}
            icon="🍽️"
          />

          <DashboardCard
            title="Revenue"
            value={`₹${sales.total_revenue}`}
            icon="💰"
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(420px,1fr))",
            gap: "25px",
            marginTop: "40px",
          }}
        >
          <div
            style={{
              background: "rgba(20,20,28,.92)",
              borderRadius: "20px",
              padding: "25px",
            }}
          >
            <h2 style={{ color: "white" }}>
              📦 Inventory Alerts
            </h2>

            <ul
              style={{
                color: "#ddd",
                marginTop: "20px",
                lineHeight: "35px",
              }}
            >
              {alerts.length === 0 ? (
                <li>No Low Stock Items</li>
              ) : (
                alerts.map((item, index) => (
                  <li key={index}>
                    {item.status === "Critical"
                      ? "🚨"
                      : "⚠️"}{" "}
                    {item.item} ({item.quantity})
                  </li>
                ))
              )}
            </ul>
          </div>

          <div
            style={{
              background: "rgba(20,20,28,.92)",
              borderRadius: "20px",
              padding: "25px",
            }}
          >
            <h2 style={{ color: "white" }}>
              📊 Dashboard Summary
            </h2>

            <ul
              style={{
                color: "#ddd",
                marginTop: "20px",
                lineHeight: "35px",
              }}
            >
              <li>Total Inventory : {inventory.total_items}</li>
              <li>Pending Orders : {orders.pending}</li>
              <li>Preparing : {orders.preparing}</li>
              <li>Ready : {orders.ready}</li>
              <li>Served : {orders.served}</li>
              <li>
                Revenue : ₹{sales.total_revenue}
              </li>
            </ul>
          </div>
        </div>

        <div
          style={{
            marginTop: "40px",
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => navigate("/inventory")}
            style={{
              padding: "16px 30px",
              border: "none",
              borderRadius: "15px",
              background:
                "linear-gradient(90deg,#7C3AED,#F97316)",
              color: "white",
              cursor: "pointer",
              fontWeight: "700",
            }}
          >
            📦 Manage Inventory
          </button>

          <button
            onClick={() => navigate("/reports")}
            style={{
              padding: "16px 30px",
              border: "none",
              borderRadius: "15px",
              background: "#22C55E",
              color: "white",
              cursor: "pointer",
              fontWeight: "700",
            }}
          >
            📊 View Reports
          </button>

          <button
            onClick={() => navigate("/analytics")}
            style={{
              padding: "16px 30px",
              border: "none",
              borderRadius: "15px",
              background: "#3B82F6",
              color: "white",
              cursor: "pointer",
              fontWeight: "700",
            }}
          >
            📈 Analytics
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManagerDashboard;