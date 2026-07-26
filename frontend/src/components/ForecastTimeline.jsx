function ForecastTimeline({ predictions = [] }) {
  const timeline = predictions
    .filter((item) => item.recommendation !== "Stock Sufficient")
    .sort((a, b) => a.days_remaining - b.days_remaining);

  return (
    <div
      style={{
        background: "rgba(20,20,28,.92)",
        borderRadius: "20px",
        padding: "30px",
        marginTop: "40px",
        border: "1px solid rgba(255,255,255,.08)",
      }}
    >
      <h2
        style={{
          color: "white",
          marginBottom: "25px",
        }}
      >
        📅 AI Forecast Timeline
      </h2>

      {timeline.length === 0 ? (
        <p style={{ color: "#D1D5DB" }}>
          ✅ All inventory items are sufficiently stocked.
        </p>
      ) : (
        timeline.map((item, index) => (
          <div
            key={item.inventory_id ?? index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px 0",
              borderBottom:
                index !== timeline.length - 1
                  ? "1px solid rgba(255,255,255,.08)"
                  : "none",
            }}
          >
            <div>
              <h3
                style={{
                  color: "white",
                  margin: 0,
                }}
              >
                {item.item_name}
              </h3>

              <p
                style={{
                  color: "#A1A1AA",
                  marginTop: "6px",
                }}
              >
                {item.recommendation}
              </p>
            </div>

            <div
              style={{
                textAlign: "right",
              }}
            >
              <div
                style={{
                  color: "#F59E0B",
                  fontWeight: "bold",
                }}
              >
                {item.days_remaining} Days Left
              </div>

              <div
                style={{
                  color: "#60A5FA",
                  marginTop: "6px",
                }}
              >
                Order {item.reorder_quantity} Units
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ForecastTimeline;