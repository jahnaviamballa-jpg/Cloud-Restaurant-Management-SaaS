import { Link } from "react-router-dom";
import DashboardCard from "../components/DashboardCard";

function CustomerDashboard() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>🍽️ Customer Dashboard</h1>

      <p style={{ color: "#666" }}>
        Welcome! Choose an option below.
      </p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "30px",
        }}
      >
        <Link
          to="/restaurants"
          style={{ textDecoration: "none" }}
        >
          <DashboardCard
            title="Restaurants"
            value="View"
            icon="🍴"
          />
        </Link>

        <Link
          to="/menu"
          style={{ textDecoration: "none" }}
        >
          <DashboardCard
            title="Menu"
            value="Browse"
            icon="📋"
          />
        </Link>

        <Link
          to="/cart"
          style={{ textDecoration: "none" }}
        >
          <DashboardCard
            title="Cart"
            value="Open"
            icon="🛒"
          />
        </Link>

        <Link
          to="/orders"
          style={{ textDecoration: "none" }}
        >
          <DashboardCard
            title="My Orders"
            value="Track"
            icon="📦"
          />
        </Link>

        <Link
          to="/reservations"
          style={{ textDecoration: "none" }}
        >
          <DashboardCard
            title="Reservations"
            value="Book"
            icon="📅"
          />
        </Link>

        <Link
          to="/profile"
          style={{ textDecoration: "none" }}
        >
          <DashboardCard
            title="Profile"
            value="View"
            icon="👤"
          />
        </Link>
      </div>
    </div>
  );
}

export default CustomerDashboard;