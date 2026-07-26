function AnalyticsOverview({
  analytics,
  health,
}) {
  const cards = [
    {
      title: "Inventory Items",
      value: analytics?.total_items || 0,
      color: "#3B82F6",
    },
    {
      title: "Low Stock",
      value: analytics?.low_stock || 0,
      color: "#F59E0B",
    },
    {
      title: "Critical",
      value: analytics?.critical_stock || 0,
      color: "#EF4444",
    },
    {
      title: "Health Score",
      value: `${health?.health_score || 0}%`,
      color: "#22C55E",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(250px,1fr))",
        gap: "20px",
      }}
    >
      {cards.map((card, index) => (
        <div
          key={index}
          style={{
            background: "rgba(20,20,28,.92)",
            borderRadius: "18px",
            padding: "22px",
            border: `2px solid ${card.color}`,
          }}
        >
          <h3
            style={{
              color: "#D1D5DB",
              marginBottom: "10px",
            }}
          >
            {card.title}
          </h3>

          <h1
            style={{
              color: card.color,
              margin: 0,
            }}
          >
            {card.value}
          </h1>
        </div>
      ))}
    </div>
  );
}

export default AnalyticsOverview;