function PredictionTable({ predictions }) {
  if (!predictions || predictions.length === 0) {
    return (
      <div
        style={{
          background: "rgba(20,20,28,.92)",
          padding: "40px",
          borderRadius: "20px",
          textAlign: "center",
          color: "white",
          marginTop: "30px",
        }}
      >
        <h2>No AI Predictions Available</h2>
      </div>
    );
  }

  const getStatusColor = (status) => {
    if (status?.includes("Critical")) return "#DC2626";
    if (status?.includes("Medium")) return "#F59E0B";
    return "#22C55E";
  };

  return (
    <div
      style={{
        background: "rgba(20,20,28,.92)",
        borderRadius: "20px",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,.08)",
        boxShadow: "0 15px 30px rgba(0,0,0,.35)",
      }}
    >
      <div
        style={{
          padding: "22px",
          borderBottom: "1px solid rgba(255,255,255,.08)",
        }}
      >
        <h2
          style={{
            color: "white",
            margin: 0,
          }}
        >
          📊 AI Inventory Forecast
        </h2>

        <p
          style={{
            color: "#BFC3D0",
            marginTop: "8px",
          }}
        >
          Smart inventory prediction generated using restaurant sales data.
        </p>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          color: "white",
        }}
      >
        <thead>
          <tr
            style={{
              background:
                "linear-gradient(90deg,#7C3AED,#2563EB)",
            }}
          >
            <th style={styles.th}>Item</th>
            <th style={styles.th}>Current Stock</th>
            <th style={styles.th}>Daily Usage</th>
            <th style={styles.th}>Days Left</th>
            <th style={styles.th}>Recommendation</th>
            <th style={styles.th}>Risk</th>
          </tr>
        </thead>

        <tbody>
          {predictions.map((item, index) => (
            <tr
              key={item.id ?? index}
              style={{
                borderBottom:
                  "1px solid rgba(255,255,255,.05)",
              }}
            >
              <td style={styles.td}>
                <strong>{item.item}</strong>
              </td>

              <td style={styles.td}>
                {item.currentStock}
              </td>

              <td style={styles.td}>
                {item.predictedUsage}
              </td>

              <td style={styles.td}>
                {item.daysRemaining}
              </td>

              <td style={styles.td}>
                <strong>
                  {item.recommendedOrder}
                </strong>
              </td>

              <td style={styles.td}>
                <span
                  style={{
                    background: getStatusColor(item.status),
                    color: "white",
                    padding: "8px 18px",
                    borderRadius: "30px",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  th: {
    padding: "18px",
    textAlign: "center",
    color: "white",
    fontWeight: "700",
  },

  td: {
    padding: "18px",
    textAlign: "center",
    color: "#E5E7EB",
  },
};

export default PredictionTable;