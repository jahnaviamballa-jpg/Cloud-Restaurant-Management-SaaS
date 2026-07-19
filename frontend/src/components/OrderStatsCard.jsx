import { useState } from "react";

function OrderStatsCard({ title, value, color }) {
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
        padding: "25px",
        textAlign: "center",
        transition: ".3s",
        transform: hover ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hover
          ? "0 18px 35px rgba(0,0,0,.45)"
          : "0 10px 25px rgba(0,0,0,.30)",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          width: "65px",
          height: "65px",
          margin: "0 auto 18px",
          borderRadius: "18px",
          background: color,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "28px",
        }}
      >
        📦
      </div>

      <h3
        style={{
          color: "#CFCFD5",
          fontSize: "16px",
          marginBottom: "12px",
          fontWeight: "600",
        }}
      >
        {title}
      </h3>

      <h2
        style={{
          color: "white",
          fontSize: "36px",
          margin: 0,
          fontWeight: "700",
        }}
      >
        {value}
      </h2>
    </div>
  );
}

export default OrderStatsCard;