function LowStockAlert({ item }) {
  if (!item) return null;

  return (
    <div
      style={{
        background: "#ffe5e5",
        color: "red",
        padding: "15px",
        borderRadius: "10px",
        marginBottom: "20px",
        fontWeight: "bold",
      }}
    >
      ⚠️ {item} stock is below the minimum level.
    </div>
  );
}

export default LowStockAlert;