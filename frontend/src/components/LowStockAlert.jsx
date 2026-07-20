function LowStockAlert({ item }) {
  if (!item) return null;

  return (
    <div
      style={{
        background: "rgba(220,38,38,.15)",
        border: "1px solid rgba(220,38,38,.4)",
        color: "#FCA5A5",
        padding: "18px 22px",
        borderRadius: "16px",
        marginBottom: "25px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 10px 25px rgba(0,0,0,.25)",
      }}
    >
      <div>
        <h3
          style={{
            margin: 0,
            color: "#F87171",
            fontSize: "20px",
          }}
        >
          ⚠️ Low Stock Alert
        </h3>

        <p
          style={{
            marginTop: "8px",
            marginBottom: 0,
            color: "#FECACA",
            fontSize: "16px",
          }}
        >
          <strong>{item}</strong> stock is below the minimum level.
          Please restock it as soon as possible.
        </p>
      </div>

      <div
        style={{
          fontSize: "40px",
        }}
      >
        📦
      </div>
    </div>
  );
}

export default LowStockAlert;