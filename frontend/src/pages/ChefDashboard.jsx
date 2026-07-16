import { useEffect, useState } from "react";
import DashboardCard from "../components/DashboardCard";
import { getOrderStats } from "../api/orderApi";

function ChefDashboard() {
  const [orders, setOrders] = useState({
    pending: 0,
    preparing: 0,
    ready: 0,
    served: 0,
    cancelled: 0,
  });

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await getOrderStats();
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>👨‍🍳 Chef Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "30px",
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
          value={orders.cancelled}
          icon="❌"
        />
      </div>
    </div>
  );
}

export default ChefDashboard;