import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import "../styles/dashboard.css";
import {
  getReservations,
  deleteReservation,
} from "../api/reservationApi";

function Reservations() {
  const navigate = useNavigate();

  // ===========================
  // States
  // ===========================

  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("All");

  const [dateFilter, setDateFilter] = useState("");

  // ===========================
  // Load Reservations
  // ===========================

  const loadReservations = async () => {
    try {
      setLoading(true);

      const data = await getReservations();

      setReservations(data || []);
      setFilteredReservations(data || []);
    } catch (error) {
      console.error(error);
      alert("Failed to load reservations.");
    } finally {
      setLoading(false);
    }
  };
    // ===========================
  // Initial Load
  // ===========================

  useEffect(() => {
    loadReservations();
  }, []);

  // ===========================
  // Delete Reservation
  // ===========================

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this reservation?"))
      return;

    try {
      await deleteReservation(id);

      alert("Reservation deleted.");

      loadReservations();
    } catch (error) {
      console.error(error);
      alert("Delete failed.");
    }
  };

  // ===========================
  // Status List
  // ===========================

  const statuses = useMemo(() => {
    const unique = [
      ...new Set(
        reservations.map((r) => r.status)
      ),
    ];

    return ["All", ...unique];
  }, [reservations]);

  // ===========================
  // Search + Filter
  // ===========================

  useEffect(() => {
    let data = [...reservations];

    // Status Filter
    if (status !== "All") {
      data = data.filter(
        (reservation) =>
          reservation.status === status
      );
    }

    // Search Filter
    if (search.trim() !== "") {
      data = data.filter((reservation) =>
        reservation.customer_name
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    // Date Filter
    if (dateFilter) {
      data = data.filter(
        (reservation) =>
          reservation.reservation_date
            ?.split("T")[0] === dateFilter
      );
    }

    setFilteredReservations(data);
  }, [
    reservations,
    search,
    status,
    dateFilter,
  ]);
    // ===========================
  // Loading Screen
  // ===========================

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
          Loading Reservations...
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
            background: "rgba(18,18,24,.80)",
            borderRadius: "25px",
            padding: "35px",
            backdropFilter: "blur(12px)",
            border:
              "1px solid rgba(255,255,255,.08)",
          }}
        >
          {/* ========================= */}
          {/* Header */}
          {/* ========================= */}

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
                  fontSize: "42px",
                  marginBottom: "10px",
                }}
              >
                🍽 Reservation Management
              </h1>

              <p
                style={{
                  color: "#D1D5DB",
                  fontSize: "17px",
                }}
              >
                Manage restaurant reservations with
                real-time updates.
              </p>
            </div>

            <button
              onClick={() =>
                navigate("/add-reservation")
              }
              style={{
                padding: "15px 28px",
                border: "none",
                borderRadius: "14px",
                background:
                  "linear-gradient(90deg,#7C3AED,#F97316)",
                color: "white",
                cursor: "pointer",
                fontWeight: "700",
                fontSize: "15px",
              }}
            >
              ➕ New Reservation
            </button>
          </div>

          {/* ========================= */}
          {/* Dashboard Cards */}
          {/* ========================= */}

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
              <h3>Total Reservations</h3>
              <h1>{reservations.length}</h1>
            </div>

            <div style={cardStyle}>
              <h3>Today's Reservations</h3>

              <h1>
                {
                  reservations.filter(
                    (reservation) => {
                      const today =
                        new Date().toDateString();

                      return (
                        new Date(
                          reservation.reservation_date
                        ).toDateString() ===
                        today
                      );
                    }
                  ).length
                }
              </h1>
            </div>

            <div style={cardStyle}>
              <h3>Total Guests</h3>

              <h1>
                {reservations.reduce(
                  (
                    total,
                    reservation
                  ) =>
                    total +
                    Number(
                      reservation.number_of_people ||
                        0
                    ),
                  0
                )}
              </h1>
            </div>

            <div style={cardStyle}>
              <h3>Upcoming</h3>

              <h1>
                {
                  reservations.filter(
                    (reservation) =>
                      new Date(
                        reservation.reservation_date
                      ) >= new Date()
                  ).length
                }
              </h1>
            </div>
          </div>

          {/* ========================= */}
          {/* Search & Filters */}
          {/* ========================= */}
                    <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "2fr 1fr 1fr 200px",
              gap: "18px",
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
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              style={{
                padding: "14px",
                borderRadius: "12px",
                border:
                  "1px solid rgba(255,255,255,.08)",
                background:
                  "rgba(255,255,255,.08)",
                color: "white",
              }}
            >
              {statuses.map((item) => (
                <option
                  key={item}
                  value={item}
                  style={{ color: "black" }}
                >
                  {item}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={dateFilter}
              onChange={(e) =>
                setDateFilter(e.target.value)
              }
              style={{
                padding: "14px",
                borderRadius: "12px",
                border:
                  "1px solid rgba(255,255,255,.08)",
                background:
                  "rgba(255,255,255,.08)",
                color: "white",
              }}
            />

            <button
              onClick={() =>
                navigate("/add-reservation")
              }
              style={{
                border: "none",
                borderRadius: "12px",
                background:
                  "linear-gradient(90deg,#7C3AED,#F97316)",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              ➕ Add Reservation
            </button>
          </div>

          {/* ========================= */}
          {/* Reservation Cards */}
          {/* ========================= */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(350px,1fr))",
              gap: "25px",
            }}
          >
            {filteredReservations.map(
              (reservation) => (
                <div
                  key={reservation.id}
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
                      marginBottom: "12px",
                    }}
                  >
                    👤{" "}
                    {reservation.customer_name}
                  </h2>

                  <p
                    style={{
                      color: "#D1D5DB",
                    }}
                  >
                    📞 {reservation.phone}
                  </p>

                  <p
                    style={{
                      color: "#D1D5DB",
                    }}
                  >
                    📅{" "}
                    {new Date(
                      reservation.reservation_date
                    ).toLocaleDateString()}
                  </p>

                  <p
                    style={{
                      color: "#D1D5DB",
                    }}
                  >
                    ⏰ {reservation.time}
                  </p>

                  <p
                    style={{
                      color: "#D1D5DB",
                    }}
                  >
                    👥{" "}
                    {
                      reservation.number_of_people
                    }{" "}
                    Guests
                  </p>

                  <p
                    style={{
                      color: "#FBBF24",
                      fontWeight: "bold",
                      marginTop: "12px",
                    }}
                  >
                    {reservation.status}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      marginTop: "20px",
                    }}
                  >
                    <button
                      onClick={() =>
                        navigate(
                          `/edit-reservation/${reservation.id}`
                        )
                      }
                      style={{
                        flex: 1,
                        padding: "12px",
                        border: "none",
                        borderRadius: "10px",
                        background:
                          "#2563EB",
                        color: "white",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      ✏️ Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          reservation.id
                        )
                      }
                      style={{
                        flex: 1,
                        padding: "12px",
                        border: "none",
                        borderRadius: "10px",
                        background:
                          "#DC2626",
                        color: "white",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
              )
            )}
                      {/* ========================= */}
          {/* Empty State */}
          {/* ========================= */}

          {filteredReservations.length === 0 && (
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
                📅 No Reservations Found
              </h2>

              <p
                style={{
                  color: "#BDBDBD",
                  marginBottom: "25px",
                }}
              >
                Try changing the search filters or create a
                new reservation.
              </p>

              <button
                onClick={() =>
                  navigate("/add-reservation")
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
                ➕ Create First Reservation
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
  padding: "22px",
  textAlign: "center",
  color: "white",
  border: "1px solid rgba(255,255,255,.08)",
};

export default Reservations;