function AIAlertCard({
  item,
  recommendation,
  severity,
  quantity,
}) {
  const color =
    severity === "Critical"
      ? "#EF4444"
      : severity === "Warning"
      ? "#F59E0B"
      : "#22C55E";

  const icon =
    severity === "Critical"
      ? "🚨"
      : severity === "Warning"
      ? "⚠️"
      : "✅";

  return (
    <div
      style={{
        background: "rgba(20,20,28,.92)",
        borderRadius: "18px",
        padding: "22px",
        borderLeft: `6px solid ${color}`,
        border: "1px solid rgba(255,255,255,.08)",
        transition: ".3s",
      }}
    >
      <h3
        style={{
          color,
          marginBottom: "10px",
        }}
      >
        {icon} {severity}
      </h3>

      <h2
        style={{
          color: "white",
          marginBottom: "12px",
        }}
      >
        {item}
      </h2>

      <p style={{ color: "#D1D5DB" }}>
        Current Stock :
        <strong> {quantity}</strong>
      </p>

      <p style={{ color: "#E5E7EB" }}>
        Recommendation :
      </p>

      <p
        style={{
          color: color,
          fontWeight: "bold",
        }}
      >
        {recommendation}
      </p>
    </div>
  );
}

export default AIAlertCard;