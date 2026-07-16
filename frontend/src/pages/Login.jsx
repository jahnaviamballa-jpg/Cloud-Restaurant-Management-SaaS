import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEnvelope, FaLock, FaUtensils } from "react-icons/fa";
import { login } from "../api/authApi";

function Login() {
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState("Paradise Restaurant");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      toast.warning("⚠ Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const response = await login({
        email,
        password,
      });

      localStorage.setItem("token", response.access_token);

      localStorage.setItem(
        "user",
        JSON.stringify(response.user)
      );

      toast.success("✅ Login Successful");

      const role = response.user.role.toLowerCase();

      switch (role) {
        case "owner":
          navigate("/owner-dashboard");
          break;

        case "manager":
          navigate("/manager-dashboard");
          break;

        case "chef":
          navigate("/chef-dashboard");
          break;

        case "customer":
          navigate("/dashboard");
          break;

        default:
          navigate("/dashboard");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.detail || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "380px",
          background: "#fff",
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

        <form
          onSubmit={handleLogin}
          style={{ marginTop: "20px" }}
        >
          <label>Select Restaurant</label>

          <select
            value={restaurant}
            onChange={(e) => setRestaurant(e.target.value)}
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
              borderRadius: "6px",
              marginTop: "5px",
              marginBottom: "15px",
            }}
          >
            <FaEnvelope color="#666" />

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              borderRadius: "6px",
              marginTop: "5px",
              marginBottom: "20px",
            }}
          >
            <FaLock color="#666" />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                border: "none",
                outline: "none",
                marginLeft: "10px",
                width: "100%",
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
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            <FaUtensils style={{ marginRight: "8px" }} />
            {loading ? "Logging in..." : "Login"}
          </button>

          <p
            style={{
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            Don't have an account?{" "}
            <Link to="/register">
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;