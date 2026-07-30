function InventoryTable({ items, onDelete }) {
  if (!items || items.length === 0) {
    return (
      <h3
        style={{
          textAlign: "center",
          marginTop: "30px",
          color: "#666",
        }}
      >
        No inventory items found.
      </h3>
    );
  }

  return (
    <div
      style={{
        overflowX: "auto",
        marginTop: "30px",
        background: "rgba(20,20,28,.92)",
        borderRadius: "20px",
        border: "1px solid rgba(255,255,255,.08)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 12px 30px rgba(0,0,0,.35)",
      }}
    >
      <table
        style={{
          width: "100%",
          minWidth: "1200px",
          borderCollapse: "collapse",
          color: "white",
        }}
      >
        <thead>
          <tr
            style={{
              background:
                "linear-gradient(90deg,#7C3AED,#F97316)",
              color: "white",
            }}
          >
            <th style={styles.th}>Image</th>
            <th style={styles.th}>Item Name</th>
            <th style={styles.th}>Category</th>
            <th style={styles.th}>Quantity</th>
            <th style={styles.th}>Unit</th>
            <th style={styles.th}>Minimum Stock</th>
            <th style={styles.th}>Supplier</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              style={{
                transition: ".3s",
              }}
            >
              <td style={styles.td}>
                <img
                  src={
                    item.image_url ||
                    "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
                  }
                  alt={item.item_name}
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "12px",
                    objectFit: "cover",
                  }}
                />
              </td>

              <td style={styles.td}>
                {item.item_name}
              </td>

              <td style={styles.td}>
                {item.category}
              </td>

              <td style={styles.td}>
                {item.quantity}
              </td>

              <td style={styles.td}>
                {item.unit}
              </td>

              <td style={styles.td}>
                {item.minimum_stock}
              </td>

              <td style={styles.td}>
                {item.supplier_name}
              </td>

              {/* STATUS */}
              <td
                style={{
                  ...styles.td,
                  whiteSpace: "nowrap",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "8px 16px",
                    borderRadius: "30px",
                    color: "white",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    background:
                      Number(item.quantity) <=
                      Number(item.minimum_stock)
                        ? "#DC2626"
                        : "#22C55E",
                  }}
                >
                  {Number(item.quantity) <=
                  Number(item.minimum_stock)
                    ? "🔴 Low Stock"
                    : "🟢 In Stock"}
                </span>
              </td>

              <td
                style={{
                  ...styles.td,
                  whiteSpace: "nowrap",
                }}
              >
                <button
                  onClick={() =>
                    alert(
                      `Edit ${item.item_name} (Coming Soon)`
                    )
                  }
                  style={{
                    padding: "8px 14px",
                    border: "none",
                    borderRadius: "8px",
                    background: "#2563EB",
                    color: "white",
                    marginRight: "10px",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  ✏️ Edit
                </button>

                <button
                  onClick={() => onDelete(item.id)}
                  style={{
                    padding: "8px 14px",
                    border: "none",
                    borderRadius: "8px",
                    background: "#DC2626",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  🗑 Delete
                </button>
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
    fontWeight: "700",
    fontSize: "15px",
    whiteSpace: "nowrap",
  },

  td: {
    padding: "18px",
    textAlign: "center",
    borderBottom:
      "1px solid rgba(255,255,255,.08)",
    color: "#E5E7EB",
    whiteSpace: "nowrap",
  },
};

export default InventoryTable;