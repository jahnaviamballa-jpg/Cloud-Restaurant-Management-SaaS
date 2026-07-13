function DashboardCard({ title, value, icon }) {
  return (
    <div
      style={{
        width: "220px",
        background: "#fff",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        textAlign: "center",
      }}
    >
      <h2 style={{ fontSize: "35px" }}>{icon}</h2>

      <h3>{title}</h3>

      <h1 style={{ color: "#ff6600" }}>{value}</h1>
    </div>
  );
}

export default DashboardCard;