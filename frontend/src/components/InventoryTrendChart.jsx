function InventoryTrendChart({ predictions }) {
  if (!predictions || predictions.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        background: "rgba(20,20,28,.92)",
        padding: "30px",
        borderRadius: "20px",
        border: "1px solid rgba(255,255,255,.08)",
      }}
    >
      <h2
        style={{
          color: "white",
          marginBottom: "25px",
        }}
      >
        📈 AI Stock Trend (7 Days)
      </h2>

      {predictions.map((item, index) => {
        const stock = item.current_stock;
        const max = Math.max(stock, 1);

        const percent =
          Math.min((stock / max) * 100, 100);

        return (
          <div
            key={index}
            style={{
              marginBottom: "25px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                color: "white",
                marginBottom: "8px",
              }}
            >
              <strong>{item.item_name}</strong>

              <span>{stock} Units</span>
            </div>

            <div
              style={{
                height: "16px",
                background: "#2D3748",
                borderRadius: "50px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${percent}%`,
                  height: "100%",
                  background:
                    stock <= item.minimum_stock
                      ? "#DC2626"
                      : "#22C55E",
                  transition:
                    "width .8s ease",
                }}
              />
            </div>

            <div
              style={{
                marginTop: "6px",
                color: "#A1A1AA",
                fontSize: "14px",
              }}
            >
              AI predicts consumption over the
              next 7 days.
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default InventoryTrendChart;