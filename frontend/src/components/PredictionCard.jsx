

function PredictionCard({
  icon,
  title,
  value,
}) {
  return (
    <div
      onMouseEnter={(e) => {
        e.currentTarget.style.transform =
          "translateY(-8px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          "translateY(0)";
      }}
      style={{
        background: "rgba(20,20,28,.92)",
        borderRadius: "20px",
        padding: "25px",
        color: "white",
        border: "1px solid rgba(255,255,255,.08)",
        boxShadow: "0 12px 25px rgba(0,0,0,.35)",
        transition: "0.35s",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          fontSize: "42px",
          marginBottom: "18px",
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          margin: 0,
          color: "#CBD5E1",
          fontWeight: "500",
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          marginTop: "15px",
          fontSize: "42px",
          color: "#22C55E",
        }}
      >
        {Number(value) || 0}
      </h1>
    </div>
  );
}

export default PredictionCard;