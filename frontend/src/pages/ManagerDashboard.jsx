import DashboardCard from "../components/DashboardCard";

function ManagerDashboard() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>Restaurant Manager Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "30px",
        }}
      >
        <DashboardCard
          title="Total Restaurants"
          value="5"
          icon="🏪"
        />

        <DashboardCard
          title="Menu Items"
          value="42"
          icon="🍽️"
        />

        <DashboardCard
          title="Inventory Items"
          value="28"
          icon="📦"
        />

        <DashboardCard
          title="Low Stock"
          value="3"
          icon="⚠️"
        />

        <DashboardCard
          title="Today's Orders"
          value="18"
          icon="🧾"
        />
      </div>
    </div>
  );
}

export default ManagerDashboard;