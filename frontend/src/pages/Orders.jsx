import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import ExecutiveKPICard from "../components/ExecutiveKPICard";
import "../styles/dashboard.css";
import {
  getOrdersByRestaurant,
  deleteOrder,
  updateOrderStatus,
} from "../api/orderApi";

function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] =
    useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);

      const data =
        await getOrdersByRestaurant();

      setOrders(data || []);
      setFilteredOrders(data || []);
    } catch (error) {
      console.error(error);
      alert("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this order?"
    );

    if (!confirmDelete) return;

    try {
      await deleteOrder(id);

      alert("Order deleted successfully.");

      loadOrders();
    } catch (error) {
      console.error(error);
      alert("Delete failed.");
    }
  };

  const handleStatusChange = async (
    id,
    status
  ) => {
    try {
      await updateOrderStatus(id, status);

      loadOrders();
    } catch (error) {
      console.error(error);
      alert("Status update failed.");
    }
  };

  const statuses = useMemo(() => {
    return [
      "All",
      "Pending",
      "Preparing",
      "Ready",
      "Served",
      "Cancelled",
    ];
  }, []);
  const totalRevenue = filteredOrders.reduce(
  (sum, order) => sum + Number(order.total_amount || 0),
  0
);

const pendingOrders = filteredOrders.filter(
  (order) => order.status === "Pending"
).length;

const preparingOrders = filteredOrders.filter(
  (order) => order.status === "Preparing"
).length;

const servedOrders = filteredOrders.filter(
  (order) => order.status === "Served"
).length;

  useEffect(() => {
    let data = [...orders];

    if (statusFilter !== "All") {
      data = data.filter(
        (order) =>
          order.status === statusFilter
      );
    }

    if (search.trim() !== "") {
      data = data.filter((order) =>
        order.customer_name
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    setFilteredOrders(data);
  }, [orders, search, statusFilter]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#111827",
        }}
      >
        <h2 style={{ color: "white" }}>
          Loading Orders...
        </h2>
      </div>
    );
  }

  return (
    <Layout>
    <div
  style={{
    padding: "20px",
  }}
>
      <div
        style={{
          background: "rgba(18,18,24,.78)",
          borderRadius: "25px",
          padding: "35px",
          border:
            "1px solid rgba(255,255,255,.08)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <div>
            <h1
              style={{
                color: "white",
                fontSize: "40px",
                marginBottom: "8px",
              }}
            >
              🛒 Orders
            </h1>

            <p
              style={{
                color: "#CFCFD5",
              }}
            >
              Manage all restaurant orders.
            </p>
          </div>

          <button
            onClick={() =>
              navigate("/add-order")
            }
            style={{
              padding: "15px 28px",
              border: "none",
              borderRadius: "14px",
              background:
                "linear-gradient(90deg,#7C3AED,#F97316)",
              color: "white",
              fontWeight: "700",
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            ➕ Create Order
          </button>
        </div>
        {/* ============================== */}
{/* Order Statistics */}
{/* ============================== */}

<div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginBottom: "35px",
  }}
>
  <div style={cardStyle}>
    <h3>🛒 Total Orders</h3>

    <h1>{orders.length}</h1>

    <p>All Orders</p>
  </div>

  <div style={cardStyle}>
    <h3>⏳ Pending</h3>

    <h1>
      {
        orders.filter(
          (o) => o.status === "Pending"
        ).length
      }
    </h1>

    <p>Awaiting Preparation</p>
  </div>

  <div style={cardStyle}>
    <h3>👨‍🍳 Preparing</h3>

    <h1>
      {
        orders.filter(
          (o) => o.status === "Preparing"
        ).length
      }
    </h1>

    <p>Kitchen Working</p>
  </div>

  <div style={cardStyle}>
    <h3>💰 Revenue</h3>

    <h1>
      ₹
      {orders.reduce(
        (sum, item) =>
          sum +
          Number(item.total_amount || 0),
        0
      )}
    </h1>

    <p>Total Sales</p>
  </div>
</div>
                <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "2fr 1fr 220px",
            gap: "20px",
            marginBottom: "35px",
          }}
        >
          <input
  type="text"
  placeholder="🔍 Search customer..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="dashboard-input"
/>

          <select
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value)}
  className="dashboard-select"
>
            {statuses.map((status) => (
              <option
                key={status}
                value={status}
                style={{ color: "black" }}
              >
                {status}
              </option>
            ))}
          </select>

          <div
            style={{
              background:
                "linear-gradient(90deg,#7C3AED,#F97316)",
              borderRadius: "14px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              fontWeight: "700",
              fontSize: "18px",
            }}
          >
            {filteredOrders.length} Orders
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(350px,1fr))",
            gap: "25px",
          }}
        >
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              style={{
                background:
                  "rgba(20,20,28,.92)",
                borderRadius: "20px",
                padding: "22px",
                border:
                  "1px solid rgba(255,255,255,.08)",
                boxShadow:
                  "0 10px 25px rgba(0,0,0,.25)",
              }}
            >
              <h2
                style={{
                  color: "white",
                  marginBottom: "10px",
                }}
              >
                👤 {order.customer_name}
              </h2>

              <p style={{ color: "#D1D5DB" }}>
                📞 {order.customer_phone}
              </p>

              <p style={{ color: "#D1D5DB" }}>
                💰 ₹{order.total_amount}
              </p>

              <p style={{ color: "#D1D5DB" }}>
                🆔 Order #{order.id}
              </p>

              <p style={{ color: "#D1D5DB" }}>
                📅{" "}
                {new Date(
                  order.created_at
                ).toLocaleString()}
              </p>

              <div
                style={{
                  marginTop: "18px",
                }}
              >
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(
                      order.id,
                      e.target.value
                    )
                  }
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "10px",
                    border: "none",
                    background: "#374151",
                    color: "white",
                    fontWeight: "600",
                  }}
                >
                  {statuses
                    .filter(
                      (status) =>
                        status !== "All"
                    )
                    .map((status) => (
                      <option
                        key={status}
                        value={status}
                      >
                        {status}
                      </option>
                    ))}
                </select>
              </div>
                            <div
                style={{
                  display: "flex",
                  gap: "12px",
                  marginTop: "20px",
                }}
              >
                <button
                  onClick={() =>
                    navigate(`/order/${order.id}`)
                  }
                  style={{
                    flex: 1,
                    padding: "12px",
                    border: "none",
                    borderRadius: "10px",
                    background: "#059669",
                    color: "white",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                >
                  👁 View
                </button>

                <button
                  onClick={() =>
                    navigate(`/edit-order/${order.id}`)
                  }
                  style={{
                    flex: 1,
                    padding: "12px",
                    border: "none",
                    borderRadius: "10px",
                    background: "#2563EB",
                    color: "white",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                >
                  ✏️ Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(order.id)
                  }
                  style={{
                    flex: 1,
                    padding: "12px",
                    border: "none",
                    borderRadius: "10px",
                    background: "#DC2626",
                    color: "white",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}

          {filteredOrders.length === 0 && (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "60px 20px",
                background: "rgba(20,20,28,.92)",
                borderRadius: "20px",
                border:
                  "1px solid rgba(255,255,255,.08)",
              }}
            >
              <h2
                style={{
                  color: "white",
                  marginBottom: "15px",
                }}
              >
                🛒 No Orders Found
              </h2>

              <p
                style={{
                  color: "#BDBDBD",
                  marginBottom: "25px",
                }}
              >
                Create your first order or change
                the search/filter options.
              </p>

              <button
                onClick={() =>
                  navigate("/add-order")
                }
                style={{
                  padding: "14px 28px",
                  border: "none",
                  borderRadius: "12px",
                  background:
                    "linear-gradient(90deg,#7C3AED,#F97316)",
                  color: "white",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                ➕ Create First Order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    </Layout>
  );
}
const cardStyle = {
  background: "rgba(20,20,28,.92)",
  borderRadius: "18px",
  padding: "24px",
  color: "white",
  textAlign: "center",
  border: "1px solid rgba(255,255,255,.08)",
  boxShadow: "0 10px 25px rgba(0,0,0,.25)",
};

cardStyle.h3 = {
  marginBottom: "10px",
};

export default Orders;