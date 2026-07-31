import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../components/Layout";
import "../styles/dashboard.css";

import {
  getOrdersByRestaurant,
  deleteOrder,
  updateOrderStatus,
} from "../api/orderApi";

function Orders() {
  const navigate = useNavigate();

  // =====================================
  // Current User
  // =====================================

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const role = (user.role || "").toLowerCase();

  const isCustomer = role === "customer";

  const canManageOrders =
    role === "owner" || role === "manager";

  // =====================================
  // States
  // =====================================

  const [orders, setOrders] = useState([]);

  const [filteredOrders, setFilteredOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  // =====================================
  // Status List
  // =====================================

  const statuses = useMemo(
    () => [
      "All",
      "Pending",
      "Preparing",
      "Ready",
      "Served",
      "Cancelled",
    ],
    []
  );

  // =====================================
  // Statistics
  // =====================================

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (o) => o.status === "Pending"
  ).length;

  const preparingOrders = orders.filter(
    (o) => o.status === "Preparing"
  ).length;

  const servedOrders = orders.filter(
    (o) => o.status === "Served"
  ).length;

  const totalRevenue = orders.reduce(
    (sum, order) =>
      sum + Number(order.total_amount || 0),
    0
  );

  // =====================================
  // Load Orders
  // =====================================

  const loadOrders = async () => {
    try {
      setLoading(true);

      let data =
        await getOrdersByRestaurant();

      data = Array.isArray(data)
        ? data
        : [];

      // Customer should only see
      // his/her own orders

      if (isCustomer) {
        data = data.filter(
          (order) =>
            Number(order.customer_id) ===
            Number(user.id)
        );
      }

      setOrders(data);
      setFilteredOrders(data);
    } catch (error) {
      console.error(error);

      alert("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // Initial Load
  // =====================================

  useEffect(() => {
    loadOrders();
  }, []);

  // =====================================
  // Delete Order
  // =====================================

  const handleDelete = async (id) => {
    const ok = window.confirm(
      "Delete this order?"
    );

    if (!ok) return;

    try {
      await deleteOrder(id);

      await loadOrders();

      alert(
        "Order deleted successfully."
      );
    } catch (error) {
      console.error(error);

      alert("Delete failed.");
    }
  };

  // =====================================
  // Update Status
  // =====================================

  const handleStatusChange = async (
    id,
    status
  ) => {
    try {
      await updateOrderStatus(
        id,
        status
      );

      loadOrders();
    } catch (error) {
      console.error(error);

      alert(
        "Status update failed."
      );
    }
  };

  // =====================================
  // Search + Filter
  // =====================================

  useEffect(() => {
    let data = [...orders];

    if (statusFilter !== "All") {
      data = data.filter(
        (order) =>
          order.status === statusFilter
      );
    }

    if (search.trim() !== "") {
      const keyword =
        search.toLowerCase();

      data = data.filter(
        (order) =>
          (order.customer_name || "")
            .toLowerCase()
            .includes(keyword) ||
          String(order.id).includes(
            keyword
          )
      );
    }

    setFilteredOrders(data);
  }, [
    orders,
    search,
    statusFilter,
  ]);

  // =====================================
  // Loading Screen
  // =====================================

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
        <h2
          style={{
            color: "white",
          }}
        >
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
            background:
              "rgba(18,18,24,.80)",
            borderRadius: "24px",
            padding: "35px",
            border:
              "1px solid rgba(255,255,255,.08)",
            backdropFilter:
              "blur(12px)",
          }}
        >
                    {/* ===================================== */}
          {/* Header */}
          {/* ===================================== */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
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
                  color: "#D1D5DB",
                }}
              >
                {isCustomer
                  ? "Track all your restaurant orders."
                  : "Manage restaurant orders from one place."}
              </p>
            </div>

            {canManageOrders && (
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
            )}
          </div>

          {/* ===================================== */}
          {/* Dashboard Cards */}
          {/* ===================================== */}

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

              <h1>{totalOrders}</h1>

              <p>All Orders</p>
            </div>

            <div style={cardStyle}>
              <h3>⏳ Pending</h3>

              <h1>{pendingOrders}</h1>

              <p>Awaiting Preparation</p>
            </div>

            <div style={cardStyle}>
              <h3>👨‍🍳 Preparing</h3>

              <h1>{preparingOrders}</h1>

              <p>Kitchen Working</p>
            </div>

            <div style={cardStyle}>
              <h3>✅ Served</h3>

              <h1>{servedOrders}</h1>

              <p>Completed Orders</p>
            </div>

            <div style={cardStyle}>
              <h3>💰 Revenue</h3>

              <h1>
                ₹{totalRevenue.toFixed(2)}
              </h1>

              <p>Total Sales</p>
            </div>
          </div>

          {/* ===================================== */}
          {/* Search & Filter */}
          {/* ===================================== */}

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
              placeholder="🔍 Search customer or order ID..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="dashboard-input"
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="dashboard-select"
            >
              {statuses.map((status) => (
                <option
                  key={status}
                  value={status}
                  style={{
                    color: "black",
                  }}
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

          {/* ===================================== */}
          {/* Orders Grid */}
          {/* ===================================== */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(350px,1fr))",
              gap: "25px",
            }}
          >
                        {filteredOrders.map((order) => {
              const statusColor =
                order.status === "Pending"
                  ? "#F59E0B"
                  : order.status === "Preparing"
                  ? "#3B82F6"
                  : order.status === "Ready"
                  ? "#8B5CF6"
                  : order.status === "Served"
                  ? "#16A34A"
                  : "#DC2626";

              return (
                <div
                  key={order.id}
                  style={{
                    background: "rgba(20,20,28,.92)",
                    borderRadius: "20px",
                    padding: "22px",
                    border:
                      "1px solid rgba(255,255,255,.08)",
                    boxShadow:
                      "0 10px 25px rgba(0,0,0,.25)",
                  }}
                >
                  {/* ========================== */}
                  {/* Customer */}
                  {/* ========================== */}

                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      alignItems: "center",
                      marginBottom: "18px",
                    }}
                  >
                    <h2
                      style={{
                        color: "white",
                        margin: 0,
                      }}
                    >
                      👤 {order.customer_name}
                    </h2>

                    <span
                      style={{
                        background: statusColor,
                        color: "white",
                        padding: "7px 14px",
                        borderRadius: "20px",
                        fontSize: "13px",
                        fontWeight: "700",
                      }}
                    >
                      {order.status}
                    </span>
                  </div>

                  <p style={{ color: "#D1D5DB" }}>
                    📞 {order.customer_phone}
                  </p>

                  <p style={{ color: "#D1D5DB" }}>
                    📧 {order.customer_email}
                  </p>

                  <p style={{ color: "#D1D5DB" }}>
                    🆔 Order #{order.id}
                  </p>
                  <p style={{ color: "#D1D5DB" }}>
                     🍽 <strong>Item:</strong> {order.item_name || "Unknown Item"}
                  </p>
                  <p style={{ color: "#D1D5DB" }}>
                    💰 ₹
                    {Number(
                      order.total_amount || 0
                    ).toFixed(2)}
                  </p>

                  <p style={{ color: "#D1D5DB" }}>
                    📅{" "}
                    {order.created_at
                      ? new Date(
                          order.created_at
                        ).toLocaleString()
                      : "N/A"}
                  </p>

                  {/* ========================== */}
                  {/* Status Update */}
                  {/* ========================== */}

                  {!isCustomer && (
                    <div
                      style={{
                        marginTop: "20px",
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
                          border: "none",
                          borderRadius: "10px",
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
                  )}

                  {/* ========================== */}
                  {/* Buttons */}
                  {/* ========================== */}

                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      marginTop: "22px",
                    }}
                  >
                    <button
                      onClick={() =>
                        navigate(
                          `/order/${order.id}`
                        )
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

                    {!isCustomer && (
                      <>
                        <button
                          onClick={() =>
                            navigate(
                              `/edit-order/${order.id}`
                            )
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
                            handleDelete(
                              order.id
                            )
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
                      </>
                    )}
                  </div>
                </div>
              );
            })}
                      {/* ===================================== */}
          {/* Empty State */}
          {/* ===================================== */}

          {filteredOrders.length === 0 && (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "70px 20px",
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
                  marginBottom: "30px",
                }}
              >
                {isCustomer
                  ? "You haven't placed any orders yet."
                  : "No orders match the current search or filter."}
              </p>

              {canManageOrders && (
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
                    fontSize: "15px",
                  }}
                >
                  ➕ Create First Order
                </button>
              )}
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
  textAlign: "center",
  color: "white",
  border: "1px solid rgba(255,255,255,.08)",
  boxShadow: "0 10px 25px rgba(0,0,0,.25)",
};

export default Orders;