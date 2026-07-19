import { useState } from "react";

function TopItemsTable({ items = [] }) {
  const [hoveredRow, setHoveredRow] = useState(null);

  return (
    <div
      style={{
        background: "rgba(20,20,28,.92)",
        border: "1px solid rgba(255,255,255,.08)",
        borderRadius: "20px",
        overflow: "hidden",
        backdropFilter: "blur(12px)",
        boxShadow: "0 12px 30px rgba(0,0,0,.35)",
      }}
    >
      <div
        style={{
          padding: "25px",
          borderBottom: "1px solid rgba(255,255,255,.08)",
        }}
      >
        <h2
          style={{
            color: "white",
            margin: 0,
            fontSize: "28px",
          }}
        >
          🍽️ Top Selling Items
        </h2>

        <p
          style={{
            color: "#BDBDBD",
            marginTop: "10px",
          }}
        >
          Best performing dishes based on customer orders.
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
              background: "linear-gradient(90deg,#7C3AED,#F97316)",
            }}
          >
            <th style={styles.th}>Rank</th>
            <th style={styles.th}>Food</th>
            <th style={styles.th}>Orders</th>
            <th style={styles.th}>Revenue</th>
            <th style={styles.th}>Performance</th>
          </tr>
        </thead>

        <tbody>
          {items.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "center",
                  padding: "40px",
                  color: "#BDBDBD",
                }}
              >
                No analytics available.
              </td>
            </tr>
          ) : (
            items.map((item, index) => (
              <tr
                key={item.id}
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
                style={{
                  background:
                    hoveredRow === index
                      ? "rgba(255,255,255,.05)"
                      : "transparent",
                  transition: ".3s",
                }}
              >
                <td style={styles.td}>#{index + 1}</td>

                <td style={styles.td}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80"
                      alt={item.name}
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "12px",
                        objectFit: "cover",
                      }}
                    />

                    <span>{item.name}</span>
                  </div>
                </td>

                <td style={styles.td}>
                  <span
                    style={{
                      background: "#7C3AED",
                      padding: "7px 14px",
                      borderRadius: "30px",
                    }}
                  >
                    {item.orders}
                  </span>
                </td>

                <td
                  style={{
                    ...styles.td,
                    color: "#F97316",
                    fontWeight: "700",
                  }}
                >
                  {item.revenue}
                </td>

                <td style={styles.td}>
                  <span
                    style={{
                      background: "#22C55E",
                      color: "white",
                      padding: "7px 16px",
                      borderRadius: "30px",
                      fontWeight: "600",
                    }}
                  >
                    Excellent
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  th: {
    padding: "18px",
    textAlign: "center",
    fontSize: "15px",
    fontWeight: "700",
  },

  td: {
    padding: "18px",
    textAlign: "center",
    borderBottom: "1px solid rgba(255,255,255,.08)",
    color: "#E5E7EB",
  },
};

export default TopItemsTable;