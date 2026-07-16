import { useEffect, useState } from "react";
import DashboardCard from "../components/DashboardCard";

import { getRestaurants } from "../api/restaurantApi";
import {
  getSalesAnalytics,
  getRevenueAnalytics,
  getOrderStatistics,
} from "../api/analyticsApi";

function OwnerDashboard() {
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
      const revenueData = await getRevenueAnalytics();
      const orderData = await getOrderStatistics();

      setRestaurantCount(restaurants.length);

      setSales(salesData.total_sales || 0);

      setRevenue(revenueData.total_revenue || 0);

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
    <div style={{ padding: "30px" }}>
      <h1>👑 Owner Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "30px",
        }}
      >
        <DashboardCard
          title="Restaurants"
          value={restaurantCount}
          icon="🍽️"
        />

        <DashboardCard
          title="Total Orders"
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
    </div>
  );
}

export default OwnerDashboard;