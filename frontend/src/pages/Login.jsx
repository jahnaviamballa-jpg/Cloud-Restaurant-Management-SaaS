import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEnvelope, FaLock, FaUtensils } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState("Paradise Restaurant");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();

    if (!email || !password) {
      toast.warning("⚠ Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      setTimeout(() => {
        localStorage.setItem("token", "demo-token");

        localStorage.setItem(
          "user",
          JSON.stringify({
            email,
            restaurant,
          })
        );

        toast.success("✅ Login Successful");

        setLoading(false);

        navigate("/manager-dashboard");
      }, 1000);
    } catch (error) {
      setLoading(false);
      toast.error("❌ API Error. Please try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "var(--page-background, #f5f5f5)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "380px",
          background: "var(--card-background, #ffffff)",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#ff6b00" }}>
          Restaurant Login
        </h2>

        <p style={{ textAlign: "center" }}>
          Login to continue
        </p>

        <form onSubmit={handleLogin} style={{ marginTop: "20px" }}>
          <label>Select Restaurant</label>

          <select
            value={restaurant}
            onChange={(event) => setRestaurant(event.target.value)}
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
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              style={{
                border: "none",
                outline: "none",
                marginLeft: "10px",
                width: "100%",
                background: "transparent",
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
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              style={{
                border: "none",
                outline: "none",
                marginLeft: "10px",
                width: "100%",
                background: "transparent",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              background: loading ? "#999" : "#ff6b00",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            <FaUtensils style={{ marginRight: "8px" }} />

            {loading ? "Logging in..." : "Login"}
          </button>

          <p style={{ textAlign: "center", marginTop: "20px" }}>
            Don't have an account?{" "}
            <Link to="/register">Create Account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;