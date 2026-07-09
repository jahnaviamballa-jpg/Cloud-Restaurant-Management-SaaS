import { Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaUserTag,
} from "react-icons/fa";

function Register() {
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
        <h2 style={{ textAlign: "center", color: "#ff6b00" }}>
          Create Account
        </h2>

        <p style={{ textAlign: "center", color: "#666" }}>
          Register to continue
        </p>

        {/* Full Name */}
        <label>Full Name</label>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #ccc",
            borderRadius: "6px",
            padding: "10px",
            margin: "5px 0 15px",
          }}
        >
          <FaUser color="#666" />
          <input
            type="text"
            placeholder="Enter Full Name"
            style={{
              border: "none",
              outline: "none",
              marginLeft: "10px",
              width: "100%",
            }}
          />
        </div>

        {/* Email */}
        <label>Email</label>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #ccc",
            borderRadius: "6px",
            padding: "10px",
            margin: "5px 0 15px",
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

        {/* Phone */}
        <label>Phone Number</label>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #ccc",
            borderRadius: "6px",
            padding: "10px",
            margin: "5px 0 15px",
          }}
        >
          <FaPhone color="#666" />
          <input
            type="tel"
            placeholder="Enter Phone Number"
            style={{
              border: "none",
              outline: "none",
              marginLeft: "10px",
              width: "100%",
            }}
          />
        </div>

        {/* Password */}
        <label>Password</label>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #ccc",
            borderRadius: "6px",
            padding: "10px",
            margin: "5px 0 15px",
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

        {/* Confirm Password */}
        <label>Confirm Password</label>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #ccc",
            borderRadius: "6px",
            padding: "10px",
            margin: "5px 0 15px",
          }}
        >
          <FaLock color="#666" />
          <input
            type="password"
            placeholder="Confirm Password"
            style={{
              border: "none",
              outline: "none",
              marginLeft: "10px",
              width: "100%",
            }}
          />
        </div>

        {/* Role */}
        <label>Select Role</label>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #ccc",
            borderRadius: "6px",
            padding: "10px",
            margin: "5px 0 20px",
          }}
        >
          <FaUserTag color="#666" />
          <select
            style={{
              border: "none",
              outline: "none",
              marginLeft: "10px",
              width: "100%",
              background: "transparent",
            }}
          >
            <option>Customer</option>
            <option>Manager</option>
            <option>Chef</option>
            <option>Owner</option>
          </select>
        </div>

        {/* Register Button */}
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
          Register
        </button>

        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;