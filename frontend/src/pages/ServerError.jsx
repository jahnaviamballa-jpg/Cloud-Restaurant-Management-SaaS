import { Link } from "react-router-dom";

function ServerError() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,.60)),url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          background: "rgba(18,18,24,.78)",
          backdropFilter: "blur(12px)",
          borderRadius: "30px",
          padding: "60px",
          textAlign: "center",
          border: "1px solid rgba(255,255,255,.08)",
          maxWidth: "700px",
          width: "100%",
        }}
      >
        <div
          style={{
            fontSize: "120px",
            marginBottom: "10px",
          }}
        >
          ⚠️
        </div>

        <h1
          style={{
            color: "#EF4444",
            fontSize: "90px",
            margin: 0,
          }}
        >
          500
        </h1>

        <h2
          style={{
            color: "white",
            marginTop: "15px",
          }}
        >
          Server Error
        </h2>

        <p
          style={{
            color: "#CFCFD5",
            lineHeight: "1.8",
            marginTop: "20px",
          }}
        >
          Something went wrong while connecting to the server.
          Please try again after a few moments.
        </p>

        <Link to="/">
          <button
            style={{
              marginTop: "35px",
              padding: "15px 35px",
              border: "none",
              borderRadius: "12px",
              background:
                "linear-gradient(90deg,#7C3AED,#F97316)",
              color: "white",
              fontSize: "17px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            🔄 Return Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ServerError;