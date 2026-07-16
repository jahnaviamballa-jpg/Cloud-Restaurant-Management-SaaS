import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        background: "#f5f5f5",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "50px",
          borderRadius: "15px",
          boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <h1 style={{ fontSize: "40px", marginBottom: "20px" }}>
          🍽️ Cloud Restaurant Management
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: "#555",
            marginBottom: "35px",
          }}
        >
          Manage restaurants, orders, inventory and analytics from one
          powerful cloud platform.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "12px 30px",
              fontSize: "18px",
              cursor: "pointer",
              borderRadius: "8px",
            }}
          >
            Login
          </button>

          <button
            onClick={() => {
  console.log("Register button clicked");
  navigate("/register");
}}
            style={{
              padding: "12px 30px",
              fontSize: "18px",
              cursor: "pointer",
              borderRadius: "8px",
            }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;