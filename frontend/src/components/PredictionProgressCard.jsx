function PredictionProgressCard({
  item,
  stock,
  minimum,
  confidence,
}) {
  const percentage = Math.min(
    100,
    Math.round((stock / minimum) * 100)
  );

  const progressColor =
    percentage < 40
      ? "#EF4444"
      : percentage < 70
      ? "#F59E0B"
      : "#22C55E";

  return (
    <div
      style={{
        background: "rgba(20,20,28,.92)",
        borderRadius: "18px",
        padding: "22px",
        marginBottom: "20px",
        color: "white",
        border: "1px solid rgba(255,255,255,.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
        <strong>{item}</strong>

        <span>
          AI Confidence: {confidence}%
        </span>
      </div>

      <div
        style={{
          width: "100%",
          height: "14px",
          background: "#374151",
          borderRadius: "30px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: "100%",
            background: progressColor,
            transition: "0.5s",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "12px",
          color: "#CBD5E1",
          fontSize: "15px",
        }}
      >
        <span>
          Current Stock: {stock}
        </span>

        <span>
          Minimum Stock: {minimum}
        </span>
      </div>
    </div>
  );
}

export default PredictionProgressCard;