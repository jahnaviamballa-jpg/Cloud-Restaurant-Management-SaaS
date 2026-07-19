import { useState } from "react";

function Reservations() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);

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
          maxWidth: "900px",
          margin: "auto",
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
          📅 Table Reservation
        </h1>

        <p
          style={{
            color: "#CFCFD5",
            marginBottom: "35px",
            fontSize: "18px",
          }}
        >
          Reserve your favorite table in advance.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <div>
            <label
              style={{
                color: "white",
                display: "block",
                marginBottom: "8px",
              }}
            >
              Reservation Date
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                width: "100%",
                padding: "15px",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,.08)",
                background: "#181822",
                color: "white",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label
              style={{
                color: "white",
                display: "block",
                marginBottom: "8px",
              }}
            >
              Time
            </label>

            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={{
                width: "100%",
                padding: "15px",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,.08)",
                background: "#181822",
                color: "white",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label
              style={{
                color: "white",
                display: "block",
                marginBottom: "8px",
              }}
            >
              Number of Guests
            </label>

            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              style={{
                width: "100%",
                padding: "15px",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,.08)",
                background: "#181822",
                color: "white",
              }}
            >
              {[1,2,3,4,5,6,7,8].map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </div>

          <div>
            <label
              style={{
                color: "white",
                display: "block",
                marginBottom: "8px",
              }}
            >
              Table Preference
            </label>

            <select
              style={{
                width: "100%",
                padding: "15px",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,.08)",
                background: "#181822",
                color: "white",
              }}
            >
              <option>Indoor</option>
              <option>Outdoor</option>
              <option>Window Seat</option>
              <option>Family Table</option>
            </select>
          </div>
        </div>

        <div style={{ marginTop: "25px" }}>
          <label
            style={{
              color: "white",
              display: "block",
              marginBottom: "8px",
            }}
          >
            Special Request
          </label>

          <textarea
            rows="4"
            placeholder="Birthday celebration, anniversary, decorations..."
            style={{
              width: "100%",
              padding: "15px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,.08)",
              background: "#181822",
              color: "white",
              resize: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        <button
          style={{
            width: "100%",
            marginTop: "35px",
            padding: "16px",
            border: "none",
            borderRadius: "15px",
            background:
              "linear-gradient(90deg,#7C3AED,#F97316)",
            color: "white",
            fontSize: "18px",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          🍽️ Book Table
        </button>

        <div
          style={{
            marginTop: "60px",
            borderTop: "1px solid rgba(255,255,255,.08)",
            paddingTop: "30px",
          }}
        >
          <h2
            style={{
              color: "white",
              marginBottom: "20px",
            }}
          >
            Recent Reservations
          </h2>

          <div
            style={{
              background: "rgba(20,20,28,.92)",
              borderRadius: "18px",
              padding: "20px",
              color: "#ddd",
            }}
          >
            <h3 style={{ color: "white" }}>
              🍽️ Family Dinner
            </h3>

            <p>Date: 25 July 2026</p>

            <p>Time: 7:30 PM</p>

            <p>Guests: 4</p>

            <span
              style={{
                background: "#22C55E",
                padding: "8px 15px",
                borderRadius: "30px",
                color: "white",
                fontWeight: "600",
              }}
            >
              Confirmed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reservations;