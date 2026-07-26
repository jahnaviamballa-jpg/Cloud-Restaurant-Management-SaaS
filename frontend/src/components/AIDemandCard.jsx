function AIDemandCard({
  demand = "Medium",
  expectedOrders = 0,
}) {
  const getColor = () => {
    switch (demand) {
      case "High":
        return "#EF4444";

      case "Medium":
        return "#F59E0B";

      default:
        return "#22C55E";
    }
  };

  const getEmoji = () => {
    switch (demand) {
      case "High":
        return "🔥";

      case "Medium":
        return "📈";

      default:
        return "✅";
    }
  };

  return (
    <div
      style={{
        background: "rgba(20,20,28,.92)",
        borderRadius: "20px",
        padding: "30px",
        color: "white",
        border: "1px solid rgba(255,255,255,.08)",
        boxShadow: "0 12px 25px rgba(0,0,0,.35)",
      }}
    >
      <h2
        style={{
          marginBottom: "25px",
        }}
      >
        📊 AI Demand Forecast
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "48px",
              color: getColor(),
              margin: 0,
            }}
          >
            {getEmoji()} {demand}
          </h1>

          <p
            style={{
              color: "#CFCFD5",
              marginTop: "10px",
            }}
          >
            Expected Orders Tomorrow
          </p>
        </div>

        <div
          style={{
            fontSize: "70px",
            fontWeight: "bold",
            color: "#60A5FA",
          }}
        >
          {expectedOrders}
        </div>
      </div>
    </div>
  );
}

export default AIDemandCard;