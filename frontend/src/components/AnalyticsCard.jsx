import { useState } from "react";

function AnalyticsCard({ icon, title, value }) {
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
        boxShadow: hover
          ? "0 18px 35px rgba(0,0,0,.45)"
          : "0 10px 25px rgba(0,0,0,.30)",
        transform: hover ? "translateY(-8px)" : "translateY(0)",
        transition: ".3s",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          width: "70px",
          height: "70px",
          borderRadius: "18px",
          background: "linear-gradient(90deg,#7C3AED,#F97316)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "34px",
          marginBottom: "20px",
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          color: "#CFCFD5",
          fontSize: "17px",
          marginBottom: "10px",
          fontWeight: "600",
        }}
      >
        {title}
      </h3>

      <h2
        style={{
          color: "white",
          fontSize: "34px",
          fontWeight: "700",
          margin: 0,
        }}
      >
        {value}
      </h2>
    </div>
  );
}

export default AnalyticsCard;