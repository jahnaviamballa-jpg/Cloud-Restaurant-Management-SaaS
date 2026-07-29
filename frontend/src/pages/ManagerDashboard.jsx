import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardCard from "../components/DashboardCard";
import Layout from "../components/Layout";
import { getInventoryStats } from "../api/inventoryApi";
import { getOrderStats } from "../api/orderApi";
import { getLowStockNotifications } from "../api/notificationApi";
import { getSalesReport } from "../api/reportApi";

import { getRestaurantId } from "../utils/restaurant";

function ManagerDashboard() {
  useEffect(() => {
  const restaurant = getRestaurant();

  if (!restaurant) {
    navigate("/select-restaurant");
    return;
  }

  loadDashboard();
}, []);
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

      const restaurantId = getRestaurantId();

      if (!restaurantId) {
        alert("Please login again.");
        navigate("/login");
        return;
      }

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
  console.log("Inventory:", inventory);
console.log("Orders:", orders);
console.log("Alerts:", alerts);
console.log("Sales:", sales);

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
      <h1
        style={{
          color: "white",
          marginBottom: "30px",
        }}
      >
        🍽 Manager Dashboard
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <DashboardCard
          title="Inventory Items"
          value={inventory.total_items}
          color="#3B82F6"
        />

        <DashboardCard
          title="Low Stock"
          value={inventory.low_stock}
          color="#F59E0B"
        />

        <DashboardCard
          title="Critical Stock"
          value={inventory.critical_stock}
          color="#EF4444"
        />

        <DashboardCard
          title="Revenue"
          value={`₹${sales.total_revenue}`}
          color="#22C55E"
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        <DashboardCard
          title="Pending Orders"
          value={orders.pending}
          color="#F59E0B"
        />

        <DashboardCard
          title="Preparing"
          value={orders.preparing}
          color="#3B82F6"
        />

        <DashboardCard
          title="Ready"
          value={orders.ready}
          color="#10B981"
        />

        <DashboardCard
          title="Served"
          value={orders.served}
          color="#8B5CF6"
        />
      </div>

      <div
        style={{
          background: "rgba(20,20,28,.90)",
          padding: "25px",
          borderRadius: "18px",
          color: "white",
        }}
      >
        <h2>⚠ Low Stock Alerts</h2>

        {alerts.length === 0 ? (
  <p>No Low Stock Alerts</p>
) : (
  alerts.map((item, index) => (
    <div
      key={`${item.item}-${index}`}
      style={{
        padding: "12px",
        borderBottom: "1px solid #333",
      }}
    >
      <strong>{item.item}</strong>

      <p>
        Remaining Stock : {item.quantity}
      </p>

      <p>Status : {item.status}</p>
    </div>
  ))
)}
      </div>
        </div>
  </Layout>
  );
}

export default ManagerDashboard;