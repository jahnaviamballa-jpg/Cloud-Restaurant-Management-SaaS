function AnalyticsCard({ icon, title, value }) {
  return (
    <div
      style={{
        background: "white",
        padding: "22px",
        borderRadius: "15px",
        boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
        transition: "transform 0.3s ease",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-5px)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform = "translateY(0)")
      }
    >
      <div style={{ fontSize: "35px" }}>{icon}</div>
      <h3>{title}</h3>
      <h2>{value}</h2>
    </div>
  );
}

export default AnalyticsCard;