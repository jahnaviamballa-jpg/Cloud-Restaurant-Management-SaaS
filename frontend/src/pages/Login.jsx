import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaEnvelope,
  FaLock,
  FaUtensils,
} from "react-icons/fa";

import { login } from "../api/authApi";
import "../styles/auth.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warning("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await login({
        email,
        password,
      });
console.log(response);
      localStorage.setItem(
        "token",
        response.access_token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.user)
      );

      toast.success("Login Successful");

      const role =
        response.user.role.toLowerCase();

      const restaurant =
  localStorage.getItem("restaurant");

if (role === "customer") {
  if (restaurant) {
    navigate("/dashboard");
  } else {
    navigate("/select-restaurant");
  }
}

else if (role === "manager") {
  if (restaurant) {
    navigate("/manager-dashboard");
  } else {
    navigate("/select-restaurant");
  }
}

else if (role === "chef") {
  if (restaurant) {
    navigate("/chef-dashboard");
  } else {
    navigate("/select-restaurant");
  }
}

else if (role === "owner") {
  if (restaurant) {
    navigate("/owner-dashboard");
  } else {
    navigate("/select-restaurant");
  }
}

else {
  navigate("/");
}
    } catch (error) {
      toast.error(
        error.response?.data?.detail ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="auth-page">

    <div className="auth-left">
      <h1>RestroVerse AI</h1>

      <h2>Restaurant Management SaaS</h2>

      <p>
        Manage Restaurants, Orders, Inventory,
        Reservations, Analytics and Customer Experience
        from one powerful cloud platform.
      </p>
    </div>

    <div className="auth-right">

      <div className="auth-card">

        <div className="logo">
          🍽
        </div>

        <h2 className="auth-title">
          Welcome Back
        </h2>

        <p className="auth-subtitle">
          Login to continue
        </p>

        <form onSubmit={handleLogin}>

          <label>Email</label>

          <div className="input-box">
            <FaEnvelope />
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <label>Password</label>

          <div className="input-box">
            <FaLock />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="auth-btn"
            disabled={loading}
          >
            <FaUtensils style={{marginRight:10}}/>

            {loading ? "Logging in..." : "Login"}

          </button>

        </form>

        <div className="auth-footer">

          Don't have an account?

          <Link to="/register">
            Register
          </Link>

        </div>

      </div>

    </div>

  </div>
);
}

export default Login;