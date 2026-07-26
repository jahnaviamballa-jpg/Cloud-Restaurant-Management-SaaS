function GlassCard({ children, style = {} }) {
  return (
    <div
      style={{
        background: "rgba(20,20,28,.92)",
        border: "1px solid rgba(255,255,255,.08)",
        borderRadius: "20px",
        padding: "24px",
        boxShadow: "0 12px 25px rgba(0,0,0,.35)",
        backdropFilter: "blur(12px)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default GlassCard;