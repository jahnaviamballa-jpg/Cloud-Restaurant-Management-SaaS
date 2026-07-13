function PredictionCard({ icon, title, value }) {
  return (
    <div
      style={{
        padding: "22px",
        background: "white",
        borderRadius: "15px",
        boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow =
          "0 10px 25px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 6px 15px rgba(0,0,0,0.1)";
      }}
    >
      <div style={{ fontSize: "35px" }}>{icon}</div>
      <h3>{title}</h3>
      <h2>{value}</h2>
    </div>
  );
}

export default PredictionCard;