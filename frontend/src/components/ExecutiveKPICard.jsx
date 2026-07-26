function ExecutiveKPICard({
  title,
  value,
  icon,
  color,
  subtitle,
}) {
  return (
    <div
      style={{
        background: "rgba(20,20,28,.92)",
        borderRadius: "20px",
        padding: "25px",
        border: "1px solid rgba(255,255,255,.08)",
        boxShadow: "0 12px 25px rgba(0,0,0,.35)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <p
            style={{
              color: "#A1A1AA",
              marginBottom: "10px",
            }}
          >
            {title}
          </p>

          <h2
            style={{
              color,
              fontSize: "34px",
              margin: 0,
            }}
          >
            {value}
          </h2>

          <p
            style={{
              color: "#D1D5DB",
              marginTop: "10px",
            }}
          >
            {subtitle}
          </p>
        </div>

        <div
          style={{
            fontSize: "48px",
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default ExecutiveKPICard;