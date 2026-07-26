function SectionTitle({ icon, title }) {
  return (
    <h2
      style={{
        color: "white",
        marginBottom: "25px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <span>{icon}</span>
      <span>{title}</span>
    </h2>
  );
}

export default SectionTitle;