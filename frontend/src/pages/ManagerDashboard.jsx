import DashboardCard from "../components/DashboardCard";

function ManagerDashboard() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>👨‍💼 Restaurant Manager Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "30px",
        }}
      >
        <DashboardCard
          title="Inventory Items"
          value="14"
          icon="📦"
        />

        <DashboardCard
          title="Low Stock"
          value="3"
          icon="⚠️"
        />

        <DashboardCard
          title="Critical Stock"
          value="6"
          icon="🚨"
        />

        <DashboardCard
          title="Pending Orders"
          value="4"
          icon="🛒"
        />

        <DashboardCard
          title="Preparing Orders"
          value="0"
          icon="👨‍🍳"
        />

        <DashboardCard
          title="Ready Orders"
          value="0"
          icon="✅"
        />

        <DashboardCard
          title="Served Orders"
          value="0"
          icon="🍽️"
        />
      </div>
    </div>
  );
}

export default ManagerDashboard;