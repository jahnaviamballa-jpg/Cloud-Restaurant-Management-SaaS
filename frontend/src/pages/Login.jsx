import { Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaUtensils } from "react-icons/fa";

function Login() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >
      <div
        style={{
          width: "380px",
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#ff6b00" }}>
          Restaurant Login
        </h2>

        <p style={{ textAlign: "center", color: "#666" }}>
          Login to continue
        </p>

        <div style={{ marginTop: "20px" }}>
          <label>Select Restaurant</label>

          <select
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              marginBottom: "15px",
            }}
          >
            <option>Paradise Restaurant</option>
            <option>Meghana Foods</option>
            <option>Bawarchi</option>
          </select>

          <label>Email</label>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #ccc",
              padding: "10px",
              marginTop: "5px",
              marginBottom: "15px",
              borderRadius: "6px",
            }}
          >
            <FaEnvelope color="#666" />
            <input
              type="email"
              placeholder="Enter Email"
              style={{
                border: "none",
                outline: "none",
                marginLeft: "10px",
                width: "100%",
              }}
            />
          </div>

          <label>Password</label>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #ccc",
              padding: "10px",
              marginTop: "5px",
              marginBottom: "20px",
              borderRadius: "6px",
            }}
          >
            <FaLock color="#666" />
            <input
              type="password"
              placeholder="Enter Password"
              style={{
                border: "none",
                outline: "none",
                marginLeft: "10px",
                width: "100%",
              }}
            />
          </div>

          <button
            style={{
              width: "100%",
              padding: "12px",
              background: "#ff6b00",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            <FaUtensils style={{ marginRight: "8px" }} />
            Login
          </button>

          <p style={{ textAlign: "center", marginTop: "20px" }}>
            Don't have an account?{" "}
            <Link to="/register">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;