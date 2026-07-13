function SuggestionCard({ message, recommendation }) {
  return (
    <div
      style={{
        padding: "20px",
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h3>🤖 AI Suggestion</h3>
      <p>{message}</p>
      <strong>{recommendation}</strong>
    </div>
  );
}

export default SuggestionCard;