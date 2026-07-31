import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaUserTag,
} from "react-icons/fa";
import { register } from "../api/authApi";
import "../styles/auth.css";
function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "Customer",
    restaurant_id: 1,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const registerData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role.toLowerCase(),
        restaurant_id: Number(formData.restaurant_id),
        phone: formData.phone || null,
      };

      const response = await register(registerData);

      console.log("Register Response:", response);

      alert("Account created successfully");
      navigate("/login");
    } catch (err) {
      console.error("Register Error:", err);

      setError(
        err.response?.data?.detail || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const inputContainer = {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: "6px",
    padding: "10px",
    margin: "5px 0 15px",
  };

  const inputStyle = {
    border: "none",
    outline: "none",
    marginLeft: "10px",
    width: "100%",
  };

  return (
  <div className="auth-page">

    <div className="auth-left">

      <h1>RestroVerse AI</h1>

      <h2>Restaurant Management SaaS</h2>

      <p>
        Join the next-generation cloud platform for
        restaurants. Manage orders, menus, inventory,
        reservations and analytics from one place.
      </p>

    </div>

    <div className="auth-right">

      <div className="auth-card">

        <div className="logo">
          🍽
        </div>

        <h2 className="auth-title">
          Create Account
        </h2>

        <p className="auth-subtitle">
          Register to continue
        </p>

        {error && (
          <p
            style={{
              color: "#ff4d4f",
              textAlign: "center",
              marginBottom: "15px",
              fontWeight: "600",
            }}
          >
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          <label>Full Name</label>

          <div className="input-box">
            <FaUser />
            <input
              name="name"
              type="text"
              placeholder="Enter Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <label>Email</label>

          <div className="input-box">
            <FaEnvelope />
            <input
              name="email"
              type="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <label>Phone Number</label>

          <div className="input-box">
            <FaPhone />
            <input
              name="phone"
              type="tel"
              placeholder="Enter Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <label>Password</label>

          <div className="input-box">
            <FaLock />
            <input
              name="password"
              type="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <label>Confirm Password</label>

          <div className="input-box">
            <FaLock />
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <label>Select Role</label>

          <div className="input-box">

            <FaUserTag />

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option>Customer</option>
              <option>Manager</option>
              <option>Chef</option>
              <option>Owner</option>
            </select>

          </div>

          <button
            type="submit"
            className="auth-btn"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        <div className="auth-footer">

          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </div>

      </div>

    </div>

  </div>
);
}

export default Register;