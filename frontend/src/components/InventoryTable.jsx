function InventoryTable({ items }) {
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
        marginTop: "20px",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "#fff",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#0d6efd", color: "#fff" }}>
            <th style={styles.th}>Item Name</th>
            <th style={styles.th}>Category</th>
            <th style={styles.th}>Quantity</th>
            <th style={styles.th}>Unit</th>
            <th style={styles.th}>Minimum Stock</th>
            <th style={styles.th}>Supplier</th>
            <th style={styles.th}>Status</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.inventory_id}>
              <td style={styles.td}>{item.item_name}</td>
              <td style={styles.td}>{item.category}</td>
              <td style={styles.td}>{item.quantity}</td>
              <td style={styles.td}>{item.unit}</td>
              <td style={styles.td}>{item.minimum_stock}</td>
              <td style={styles.td}>{item.supplier_name}</td>

              <td style={styles.td}>
                {item.quantity <= item.minimum_stock ? (
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    ⚠️ Low Stock
                  </span>
                ) : (
                  <span style={{ color: "green", fontWeight: "bold" }}>
                    ✅ In Stock
                  </span>
                )}
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
    padding: "12px",
    border: "1px solid #ddd",
    textAlign: "center",
  },

  td: {
    padding: "12px",
    border: "1px solid #ddd",
    textAlign: "center",
  },
};

export default InventoryTable;