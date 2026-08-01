function AIAlertCard({
  item,
  recommendation,
  severity,
  quantity,
  stockOutDate,
  confidence,
}) {
  const color =
    severity === "Critical"
      ? "#EF4444"
      : severity === "High"
      ? "#F97316"
      : severity === "Medium"
      ? "#F59E0B"
      : "#22C55E";

  const icon =
    severity === "Critical"
      ? "🚨"
      : severity === "High"
      ? "🔴"
      : severity === "Medium"
      ? "🟠"
      : "🟢";

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
        {icon} {severity} Risk
      </h3>

      <h2
        style={{
          color: "white",
          marginBottom: "15px",
        }}
      >
        {item}
      </h2>

      <p style={{ color: "#D1D5DB" }}>
        📦 Current Stock:
        <strong> {quantity} Units</strong>
      </p>

      <p style={{ color: "#D1D5DB" }}>
        📅 Predicted Stock-out:
        <strong> {stockOutDate}</strong>
      </p>

      <p style={{ color: "#D1D5DB" }}>
        🤖 AI Confidence:
        <strong> {confidence}</strong>
      </p>

      <p
        style={{
          color: "#E5E7EB",
          marginTop: "15px",
          marginBottom: "5px",
        }}
      >
        Recommended Action
      </p>

      <p
        style={{
          color,
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        {recommendation}
      </p>
    </div>
  );
}

export default AIAlertCard;