function SuggestionCard({
  message,
  recommendation,
}) {
  return (
    <div
      style={{
        background: "rgba(20,20,28,.92)",
        borderRadius: "20px",
        padding: "22px",
        color: "white",
        border: "1px solid rgba(255,255,255,.08)",
        boxShadow: "0 10px 20px rgba(0,0,0,.3)",
      }}
    >
      <h3
        style={{
          color: "#FBBF24",
          marginBottom: "15px",
        }}
      >
        🤖 AI Suggestion
      </h3>

      <p
        style={{
          lineHeight: "1.8",
          color: "#E5E7EB",
        }}
      >
        {message}
      </p>

      <div
        style={{
          marginTop: "20px",
          padding: "12px",
          borderRadius: "12px",
          background: "rgba(124,58,237,.18)",
          color: "#C4B5FD",
        }}
      >
        {recommendation}
      </div>
    </div>
  );
}

export default SuggestionCard;