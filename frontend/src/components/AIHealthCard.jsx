
function AIHealthCard({
  score,
  status,
}) {
  const getColor = () => {
    if (score >= 85) return "#22C55E";
    if (score >= 70) return "#F59E0B";
    return "#EF4444";
  };

  return (
    <div
      style={{
        background: "rgba(20,20,28,.92)",
        borderRadius: "22px",
        padding: "35px",
        textAlign: "center",
        color: "white",
        border: "1px solid rgba(255,255,255,.08)",
        boxShadow: "0 12px 25px rgba(0,0,0,.35)",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
        }}
      >
        🩺 AI Inventory Health
      </h2>

      <h1
  style={{
    fontSize: "80px",
    color: getColor(),
    margin: 0,
  }}
>
  {score}%
</h1>

      <h2
        style={{
          marginTop: "18px",
          color: "#FACC15",
        }}
      >
        {status}
      </h2>

      <p
        style={{
          marginTop: "18px",
          color: "#CBD5E1",
          lineHeight: "1.8",
        }}
      >
        AI continuously monitors stock
        levels and predicts shortages
        before they occur, helping reduce
        inventory costs and preventing
        stockouts.
      </p>
    </div>
  );
}

export default AIHealthCard;