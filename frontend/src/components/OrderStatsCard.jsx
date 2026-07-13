function OrderStatsCard({ title, value, color }) {
  return (
    <div
      style={{
        padding: "20px",
        background: color,
        borderRadius: "12px",
        textAlign: "center",
        fontWeight: "bold",
      }}
    >
      <h3>{title}</h3>
      <h2>{value}</h2>
    </div>
  );
}

export default OrderStatsCard;