import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  getReservations,
  deleteReservation,
} from "../api/reservationApi";
function Reservations() {
  const navigate = useNavigate();

  const [reservations, setReservations] =
    useState([]);

  const [filteredReservations,
    setFilteredReservations] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("All");

  const loadReservations =
    async () => {
      try {
        setLoading(true);

        const data =
          await getReservations();

        setReservations(data || []);
        setFilteredReservations(
          data || []
        );
      } catch (error) {
        console.error(error);

        alert(
          "Failed to load reservations."
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadReservations();
  }, []);

  const handleDelete =
    async (id) => {
      if (
        !window.confirm(
          "Delete this reservation?"
        )
      )
        return;

      try {
        await deleteReservation(id);

        alert(
          "Reservation deleted."
        );

        loadReservations();
      } catch (error) {
        console.error(error);

        alert(
          "Delete failed."
        );
      }
    };

  const statuses = useMemo(() => {
    const unique = [
      ...new Set(
        reservations.map(
          (r) => r.status
        )
      ),
    ];

    return ["All", ...unique];
  }, [reservations]);

  useEffect(() => {
    let data = [...reservations];

    if (status !== "All") {
      data = data.filter(
        (r) =>
          r.status === status
      );
    }

    if (search.trim()) {
      data = data.filter(
        (r) =>
          r.customer_name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }

    setFilteredReservations(data);
  }, [
    reservations,
    search,
    status,
  ]);
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
          Loading Reservations...
        </h2>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background:
          "linear-gradient(rgba(0,0,0,.25),rgba(0,0,0,.35)),url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div
        style={{
          background:
            "rgba(18,18,24,.78)",
          borderRadius: "25px",
          padding: "35px",
          border:
            "1px solid rgba(255,255,255,.08)",
          backdropFilter:
            "blur(12px)",
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
              📅 Reservations
            </h1>

            <p
              style={{
                color: "#CFCFD5",
              }}
            >
              Manage all reservations.
            </p>
          </div>

          <button
            onClick={() =>
              navigate(
                "/add-reservation"
              )
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
            }}
          >
            ➕ Add Reservation
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "2fr 1fr 180px",
            gap: "20px",
            marginBottom: "35px",
          }}
        >
          <input
            type="text"
            placeholder="🔍 Search customer..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            style={{
              padding: "14px",
              borderRadius: "12px",
              border:
                "1px solid rgba(255,255,255,.08)",
              background:
                "rgba(255,255,255,.08)",
              color: "white",
              outline: "none",
            }}
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value
              )
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
            {statuses.map((s) => (
              <option
                key={s}
                value={s}
                style={{
                  color: "black",
                }}
              >
                {s}
              </option>
            ))}
          </select>

          <div
            style={{
              display: "flex",
              justifyContent:
                "center",
              alignItems: "center",
              background:
                "linear-gradient(90deg,#7C3AED,#F97316)",
              borderRadius: "12px",
              color: "white",
              fontWeight: "700",
            }}
          >
            {
              filteredReservations.length
            }{" "}
            Records
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
                  {filteredReservations.map((reservation) => (
            <div
              key={reservation.id}
              style={{
                background: "rgba(20,20,28,.92)",
                borderRadius: "20px",
                padding: "24px",
                border:
                  "1px solid rgba(255,255,255,.08)",
                boxShadow:
                  "0 10px 25px rgba(0,0,0,.25)",
              }}
            >
              <h2
                style={{
                  color: "white",
                  marginBottom: "15px",
                }}
              >
                👤 {reservation.customer_name}
              </h2>

              <p style={{ color: "#D1D5DB" }}>
                📞 {reservation.customer_phone}
              </p>

              <p style={{ color: "#D1D5DB" }}>
                📅 {reservation.reservation_date}
              </p>

              <p style={{ color: "#D1D5DB" }}>
                🕒 {reservation.reservation_time}
              </p>

              <p style={{ color: "#D1D5DB" }}>
                👥 Guests:{" "}
                {reservation.number_of_guests}
              </p>

              <p
                style={{
                  marginTop: "15px",
                  color:
                    reservation.status ===
                    "Confirmed"
                      ? "#22C55E"
                      : reservation.status ===
                        "Cancelled"
                      ? "#EF4444"
                      : "#FACC15",
                  fontWeight: "700",
                }}
              >
                {reservation.status}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "20px",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={() =>
                    navigate(
                      `/reservation-details/${reservation.id}`
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
                  👁 View
                </button>

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
                    background: "#7C3AED",
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
                      reservation.id
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
              </div>
            </div>
          ))}

          {filteredReservations.length ===
            0 && (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "60px 20px",
                background:
                  "rgba(20,20,28,.92)",
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
                Try changing the search/filter
                or create a new reservation.
              </p>

              <button
                onClick={() =>
                  navigate(
                    "/add-reservation"
                  )
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
                ➕ Add Reservation
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reservations;