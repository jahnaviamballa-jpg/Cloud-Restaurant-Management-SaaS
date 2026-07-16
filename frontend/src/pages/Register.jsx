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

      console.log("Register Data:", registerData);

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
          width: "420px",
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#ff6b00",
          }}
        >
          Create Account
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#666",
          }}
        >
          Register to continue
        </p>

        {error && (
          <p
            style={{
              color: "red",
              textAlign: "center",
            }}
          >
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>

          <div style={inputContainer}>
            <FaUser color="#666" />

            <input
              name="name"
              type="text"
              placeholder="Enter Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <label>Email</label>

          <div style={inputContainer}>
            <FaEnvelope color="#666" />

            <input
              name="email"
              type="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <label>Phone Number</label>

          <div style={inputContainer}>
            <FaPhone color="#666" />

            <input
              name="phone"
              type="tel"
              placeholder="Enter Phone Number"
              value={formData.phone}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <label>Password</label>

          <div style={inputContainer}>
            <FaLock color="#666" />

            <input
              name="password"
              type="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <label>Confirm Password</label>

          <div style={inputContainer}>
            <FaLock color="#666" />

            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <label>Select Role</label>

          <div style={inputContainer}>
            <FaUserTag color="#666" />

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={{
                ...inputStyle,
                background: "transparent",
              }}
            >
              <option value="Customer">Customer</option>
              <option value="Manager">Manager</option>
              <option value="Chef">Chef</option>
              <option value="Owner">Owner</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              background: "#ff6b00",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;