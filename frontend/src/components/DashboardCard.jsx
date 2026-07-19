import { useState } from "react";

function DashboardCard({ title, value, icon }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "rgba(20,20,28,.92)",
        border: "1px solid rgba(255,255,255,.08)",
        backdropFilter: "blur(12px)",
        borderRadius: "20px",
        padding: "28px",
        textAlign: "center",
        transition: ".35s",
        cursor: "pointer",
        transform: hover ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hover
          ? "0 18px 40px rgba(0,0,0,.45)"
          : "0 10px 25px rgba(0,0,0,.25)",
      }}
    >
      <div
        style={{
          fontSize: "52px",
          marginBottom: "15px",
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          color: "#D4D4D8",
          fontSize: "18px",
          fontWeight: "600",
          marginBottom: "12px",
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          margin: 0,
          fontSize: "40px",
          fontWeight: "700",
          background: "linear-gradient(90deg,#7C3AED,#F97316)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {value}
      </h1>

      <div
        style={{
          width: "70px",
          height: "4px",
          margin: "20px auto 0",
          borderRadius: "20px",
          background: "linear-gradient(90deg,#7C3AED,#F97316)",
        }}
      />
    </div>
  );
}

export default DashboardCard;