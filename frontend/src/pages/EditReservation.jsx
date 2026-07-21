import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getReservation,
  updateReservation,
} from "../api/reservationApi";

function EditReservation() {
  const navigate = useNavigate();
  const { reservationId } = useParams();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [reservation, setReservation] =
    useState({
      customer_name: "",
      customer_phone: "",
      reservation_date: "",
      reservation_time: "",
      number_of_guests: "",
      special_request: "",
      status: "Pending",
    });

  useEffect(() => {
    loadReservation();
  }, []);

  const loadReservation = async () => {
    try {
      const data =
        await getReservation(
          reservationId
        );

      setReservation({
        customer_name:
          data.customer_name || "",

        customer_phone:
          data.customer_phone || "",

        reservation_date:
          data.reservation_date || "",

        reservation_time:
          data.reservation_time || "",

        number_of_guests:
          data.number_of_guests || "",

        special_request:
          data.special_request || "",

        status:
          data.status || "Pending",
      });
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

  const handleChange = (e) => {
    setReservation({
      ...reservation,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await updateReservation(
        reservationId,
        {
          ...reservation,
          number_of_guests:
            Number(
              reservation.number_of_guests
            ),
        }
      );

      alert(
        "Reservation updated successfully!"
      );

      navigate("/reservations");
    } catch (error) {
      console.error(error);

      alert(
        "Failed to update reservation."
      );
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border:
      "1px solid rgba(255,255,255,.08)",
    background:
      "rgba(255,255,255,.08)",
    color: "white",
    fontSize: "15px",
    outline: "none",
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
          maxWidth: "850px",
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
          ✏️ Edit Reservation
        </h1>

        <p
          style={{
            color: "#CFCFD5",
            marginBottom: "35px",
          }}
        >
          Update reservation details.
        </p>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(300px,1fr))",
              gap: "20px",
            }}
          >
                      <input
              type="text"
              name="customer_name"
              placeholder="Customer Name"
              value={reservation.customer_name}
              onChange={handleChange}
              style={inputStyle}
              required
            />

            <input
              type="text"
              name="customer_phone"
              placeholder="Customer Phone"
              value={reservation.customer_phone}
              onChange={handleChange}
              style={inputStyle}
              required
            />

            <input
              type="date"
              name="reservation_date"
              value={reservation.reservation_date}
              onChange={handleChange}
              style={inputStyle}
              required
            />

            <input
              type="time"
              name="reservation_time"
              value={reservation.reservation_time}
              onChange={handleChange}
              style={inputStyle}
              required
            />

            <input
              type="number"
              name="number_of_guests"
              placeholder="Number of Guests"
              value={reservation.number_of_guests}
              onChange={handleChange}
              style={inputStyle}
              min="1"
              required
            />

            <select
              name="status"
              value={reservation.status}
              onChange={handleChange}
              style={inputStyle}
            >
              <option
                value="Pending"
                style={{ color: "black" }}
              >
                Pending
              </option>

              <option
                value="Confirmed"
                style={{ color: "black" }}
              >
                Confirmed
              </option>

              <option
                value="Cancelled"
                style={{ color: "black" }}
              >
                Cancelled
              </option>
            </select>

            <textarea
              name="special_request"
              placeholder="Special Request (Optional)"
              value={reservation.special_request}
              onChange={handleChange}
              rows={5}
              style={{
                ...inputStyle,
                gridColumn: "1 / -1",
                resize: "none",
              }}
            />
                      </div>

          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "35px",
            }}
          >
            <button
              type="submit"
              disabled={saving}
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
                cursor: saving
                  ? "not-allowed"
                  : "pointer",
                opacity: saving ? 0.7 : 1,
              }}
            >
              {saving
                ? "Saving..."
                : "💾 Save Changes"}
            </button>

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
              ❌ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditReservation;