function ConfidenceBar({ value }) {
  let color = "#22C55E";

  if (value < 90) color = "#F59E0B";
  if (value < 80) color = "#EF4444";

  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "10px",
          background: "#333",
          borderRadius: "20px",
        }}
      >
        <div
          style={{
            width: `${value}%`,
            height: "10px",
            background: color,
            borderRadius: "20px",
          }}
        />
      </div>

      <p
        style={{
          marginTop: "6px",
          color: "white",
        }}
      >
        {value}%
      </p>
    </div>
  );
}

export default ConfidenceBar;