import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getReservation,
} from "../api/reservationApi";

function ReservationDetails() {
  const navigate = useNavigate();

  const { reservationId } =
    useParams();

  const [loading, setLoading] =
    useState(true);

  const [reservation, setReservation] =
    useState(null);

  useEffect(() => {
    loadReservation();
  }, []);

  const loadReservation = async () => {
    try {
      const data =
        await getReservation(
          reservationId
        );

      setReservation(data);
    } catch (error) {
      console.error(error);

      alert(
        "Unable to load reservation."
      );

      navigate("/reservations");
    } finally {
      setLoading(false);
    }
  };

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
          Loading Reservation...
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
          maxWidth: "900px",
          margin: "auto",
          background:
            "rgba(18,18,24,.78)",
          padding: "35px",
          borderRadius: "25px",
          border:
            "1px solid rgba(255,255,255,.08)",
          backdropFilter:
            "blur(12px)",
        }}
      >
        <h1
          style={{
            color: "white",
            marginBottom: "10px",
          }}
        >
          📅 Reservation Details
        </h1>

        <p
          style={{
            color: "#CFCFD5",
            marginBottom: "35px",
          }}
        >
          View complete reservation information.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(300px,1fr))",
            gap: "20px",
          }}
        >
        
                  <div
            style={{
              background: "rgba(255,255,255,.08)",
              padding: "20px",
              borderRadius: "15px",
            }}
          >
            <h3 style={{ color: "#9CA3AF" }}>
              Customer Name
            </h3>

            <p
              style={{
                color: "white",
                fontSize: "20px",
                fontWeight: "600",
              }}
            >
              {reservation.customer_name}
            </p>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,.08)",
              padding: "20px",
              borderRadius: "15px",
            }}
          >
            <h3 style={{ color: "#9CA3AF" }}>
              Customer Phone
            </h3>

            <p
              style={{
                color: "white",
                fontSize: "20px",
                fontWeight: "600",
              }}
            >
              {reservation.customer_phone}
            </p>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,.08)",
              padding: "20px",
              borderRadius: "15px",
            }}
          >
            <h3 style={{ color: "#9CA3AF" }}>
              Reservation Date
            </h3>

            <p
              style={{
                color: "white",
                fontSize: "20px",
                fontWeight: "600",
              }}
            >
              {reservation.reservation_date}
            </p>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,.08)",
              padding: "20px",
              borderRadius: "15px",
            }}
          >
            <h3 style={{ color: "#9CA3AF" }}>
              Reservation Time
            </h3>

            <p
              style={{
                color: "white",
                fontSize: "20px",
                fontWeight: "600",
              }}
            >
              {reservation.reservation_time}
            </p>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,.08)",
              padding: "20px",
              borderRadius: "15px",
            }}
          >
            <h3 style={{ color: "#9CA3AF" }}>
              Number of Guests
            </h3>

            <p
              style={{
                color: "#FACC15",
                fontSize: "22px",
                fontWeight: "700",
              }}
            >
              {reservation.number_of_guests}
            </p>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,.08)",
              padding: "20px",
              borderRadius: "15px",
            }}
          >
            <h3 style={{ color: "#9CA3AF" }}>
              Status
            </h3>

            <p
              style={{
                color:
                  reservation.status ===
                  "Confirmed"
                    ? "#22C55E"
                    : reservation.status ===
                      "Cancelled"
                    ? "#EF4444"
                    : "#FACC15",
                fontSize: "20px",
                fontWeight: "700",
              }}
            >
              {reservation.status}
            </p>
          </div>

          <div
            style={{
              gridColumn: "1 / -1",
              background: "rgba(255,255,255,.08)",
              padding: "20px",
              borderRadius: "15px",
            }}
          >
            <h3 style={{ color: "#9CA3AF" }}>
              Special Request
            </h3>

            <p
              style={{
                color: "white",
                lineHeight: "1.7",
              }}
            >
              {reservation.special_request ||
                "No special requests."}
            </p>
          </div>
                    

          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "35px",
            }}
          >
            <button
              type="button"
              onClick={() =>
                navigate("/reservations")
              }
              style={{
                flex: 1,
                padding: "16px",
                border: "none",
                borderRadius: "14px",
                background: "#374151",
                color: "white",
                fontWeight: "700",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              ⬅ Back
            </button>

            <button
              type="button"
              onClick={() =>
                navigate(
                  `/edit-reservation/${reservation.id}`
                )
              }
              style={{
                flex: 1,
                padding: "16px",
                border: "none",
                borderRadius: "14px",
                background:
                  "linear-gradient(90deg,#7C3AED,#F97316)",
                color: "white",
                fontWeight: "700",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              ✏️ Edit Reservation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationDetails;