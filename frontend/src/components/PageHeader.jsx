function PageHeader({
  title,
  subtitle,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        marginBottom: "35px",
      }}
    >
      <div>
        <h1
          style={{
            color: "white",
            margin: 0,
            fontSize: "42px",
          }}
        >
          {title}
        </h1>

        <p
          style={{
            color: "#CBD5E1",
            marginTop: "10px",
            fontSize: "18px",
          }}
        >
          {subtitle}
        </p>
      </div>

      <div
        style={{
          background: "#22C55E",
          color: "white",
          padding: "12px 22px",
          borderRadius: "12px",
          fontWeight: "bold",
        }}
      >
        🟢 AI Online
      </div>
    </div>
  );
}

export default PageHeader;