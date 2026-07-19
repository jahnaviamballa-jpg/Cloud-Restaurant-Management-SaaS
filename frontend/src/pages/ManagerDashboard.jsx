import DashboardCard from "../components/DashboardCard";

function ManagerDashboard() {
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
          👨‍💼 Restaurant Manager Dashboard
        </h1>

        <p
          style={{
            color: "#CFCFD5",
            fontSize: "18px",
            marginBottom: "35px",
          }}
        >
          Monitor your restaurant performance in real time.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "25px",
          }}
        >
          <DashboardCard title="Inventory Items" value="14" icon="📦" />
          <DashboardCard title="Low Stock" value="3" icon="⚠️" />
          <DashboardCard title="Critical Stock" value="6" icon="🚨" />
          <DashboardCard title="Pending Orders" value="4" icon="🛒" />
          <DashboardCard title="Preparing Orders" value="8" icon="👨‍🍳" />
          <DashboardCard title="Ready Orders" value="12" icon="✅" />
          <DashboardCard title="Served Orders" value="96" icon="🍽️" />
          <DashboardCard title="Today's Revenue" value="₹18,450" icon="💰" />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(420px,1fr))",
            gap: "25px",
            marginTop: "40px",
          }}
        >
          <div
            style={{
              background: "rgba(20,20,28,.92)",
              borderRadius: "20px",
              padding: "25px",
              border: "1px solid rgba(255,255,255,.08)",
            }}
          >
            <h2 style={{ color: "white" }}>
              📦 Inventory Alerts
            </h2>

            <ul
              style={{
                color: "#CFCFD5",
                lineHeight: "35px",
                marginTop: "20px",
              }}
            >
              <li>⚠️ Tomatoes - Low Stock</li>
              <li>⚠️ Cheese - Low Stock</li>
              <li>🚨 Chicken - Critical Stock</li>
              <li>🚨 Soft Drinks - Critical Stock</li>
            </ul>
          </div>

          <div
            style={{
              background: "rgba(20,20,28,.92)",
              borderRadius: "20px",
              padding: "25px",
              border: "1px solid rgba(255,255,255,.08)",
            }}
          >
            <h2 style={{ color: "white" }}>
              📋 Recent Orders
            </h2>

            <ul
              style={{
                color: "#CFCFD5",
                lineHeight: "35px",
                marginTop: "20px",
              }}
            >
              <li>#ORD1001 - Chicken Biryani - Delivered</li>
              <li>#ORD1002 - Veg Pizza - Preparing</li>
              <li>#ORD1003 - Burger Combo - Ready</li>
              <li>#ORD1004 - Pasta - Pending</li>
            </ul>
          </div>
        </div>

        <div
          style={{
            marginTop: "40px",
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <button
            style={{
              padding: "16px 30px",
              border: "none",
              borderRadius: "15px",
              background:
                "linear-gradient(90deg,#7C3AED,#F97316)",
              color: "white",
              cursor: "pointer",
              fontWeight: "700",
            }}
          >
            📦 Manage Inventory
          </button>

          <button
            style={{
              padding: "16px 30px",
              border: "none",
              borderRadius: "15px",
              background: "#22C55E",
              color: "white",
              cursor: "pointer",
              fontWeight: "700",
            }}
          >
            📊 View Reports
          </button>

          <button
            style={{
              padding: "16px 30px",
              border: "none",
              borderRadius: "15px",
              background: "#3B82F6",
              color: "white",
              cursor: "pointer",
              fontWeight: "700",
            }}
          >
            👨‍🍳 Staff Management
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManagerDashboard;