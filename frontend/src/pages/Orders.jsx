function Orders() {
  const orders = [
    {
      id: "#ORD1001",
      item: "Chicken Biryani",
      quantity: 2,
      total: 598,
      status: "Delivered",
      color: "#22C55E",
    },
    {
      id: "#ORD1002",
      item: "Veg Pizza",
      quantity: 1,
      total: 399,
      status: "Preparing",
      color: "#F97316",
    },
    {
      id: "#ORD1003",
      item: "Mango Juice",
      quantity: 3,
      total: 297,
      status: "Out for Delivery",
      color: "#3B82F6",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background:
          "linear-gradient(rgba(0,0,0,.20),rgba(0,0,0,.25)),url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div
        style={{
          background: "rgba(18,18,24,.75)",
          borderRadius: "25px",
          padding: "35px",
          border: "1px solid rgba(255,255,255,.08)",
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "42px",
            marginBottom: "10px",
          }}
        >
          📦 My Orders
        </h1>

        <p
          style={{
            color: "#CFCFD5",
            fontSize: "18px",
            marginBottom: "35px",
          }}
        >
          Track all your restaurant orders in one place.
        </p>

        <div
          style={{
            display: "grid",
            gap: "25px",
          }}
        >
          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                background: "rgba(20,20,28,.92)",
                borderRadius: "20px",
                padding: "25px",
                border: "1px solid rgba(255,255,255,.08)",
                transition: ".3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "20px",
                }}
              >
                <div>
                  <h2
                    style={{
                      color: "white",
                      marginBottom: "10px",
                    }}
                  >
                    🍽️ {order.item}
                  </h2>

                  <p style={{ color: "#BDBDBD" }}>
                    Order ID: {order.id}
                  </p>

                  <p style={{ color: "#BDBDBD" }}>
                    Quantity: {order.quantity}
                  </p>

                  <h3
                    style={{
                      color: "#F97316",
                      marginTop: "15px",
                    }}
                  >
                    ₹{order.total}
                  </h3>
                </div>

                <div
                  style={{
                    textAlign: "right",
                  }}
                >
                  <span
                    style={{
                      background: order.color,
                      color: "white",
                      padding: "10px 18px",
                      borderRadius: "30px",
                      fontWeight: "600",
                      display: "inline-block",
                    }}
                  >
                    {order.status}
                  </span>

                  <br />
                  <br />

                  <button
                    style={{
                      padding: "12px 22px",
                      border: "none",
                      borderRadius: "12px",
                      background:
                        "linear-gradient(90deg,#7C3AED,#F97316)",
                      color: "white",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "60px",
            textAlign: "center",
            color: "#888",
            borderTop: "1px solid rgba(255,255,255,.08)",
            paddingTop: "25px",
          }}
        >
          © 2026 Cloud Restaurant Management SaaS Platform. All Rights Reserved.
        </div>
      </div>
    </div>
  );
}

export default Orders;