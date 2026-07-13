function PredictionTable({ predictions = [] }) {
  const getStatusColor = (status) => {
    if (status.includes("Critical")) return "#ffdddd";
    if (status.includes("Medium")) return "#fff3cd";
    return "#d4edda";
  };

  const getProgress = (daysRemaining) => {
    const days = parseInt(daysRemaining);

    if (days <= 2) return 20;
    if (days <= 5) return 50;
    return 80;
  };

  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        overflowX: "auto",
      }}
    >
      <h2>🤖 AI Stock Predictions</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          minWidth: "750px",
        }}
      >
        <thead>
          <tr>
            <th>Item</th>
            <th>Current Stock</th>
            <th>Predicted Usage</th>
            <th>Days Remaining</th>
            <th>Stock Level</th>
            <th>Recommended Order</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {predictions.map((item) => {
            const progress = getProgress(item.daysRemaining);

            return (
              <tr key={item.id}>
                <td>{item.item}</td>
                <td>{item.currentStock}</td>
                <td>{item.predictedUsage}</td>
                <td>{item.daysRemaining}</td>

                <td style={{ padding: "12px" }}>
                  <div
                    style={{
                      width: "100%",
                      height: "10px",
                      background: "#ddd",
                      borderRadius: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: `${progress}%`,
                        height: "100%",
                        background:
                          progress <= 20
                            ? "red"
                            : progress <= 50
                            ? "orange"
                            : "green",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                </td>

                <td>{item.recommendedOrder}</td>

                <td
                  style={{
                    background: getStatusColor(item.status),
                    padding: "10px",
                    fontWeight: "bold",
                  }}
                >
                  {item.status}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default PredictionTable;