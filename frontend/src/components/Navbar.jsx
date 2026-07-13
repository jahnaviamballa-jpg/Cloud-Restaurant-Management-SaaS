import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: "600",
    whiteSpace: "nowrap",
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    closeMenu();
    navigate("/login");
  };

  return (
    <nav
      style={{
        background: "#ff6b00",
        padding: "15px 25px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "15px",
      }}
    >
      <Link to="/" onClick={closeMenu}>
        <h2 style={{ color: "white", margin: 0 }}>
          🍽️ Cloud Restaurant
        </h2>
      </Link>

      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <ThemeToggle />

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "transparent",
            border: "1px solid white",
            color: "white",
            fontSize: "24px",
            cursor: "pointer",
            borderRadius: "6px",
            padding: "3px 10px",
          }}
        >
          ☰
        </button>
      </div>

      <div
        style={{
          display: menuOpen ? "flex" : "none",
          width: "100%",
          gap: "18px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Link to="/manager-dashboard" onClick={closeMenu} style={linkStyle}>
          🏠 Dashboard
        </Link>

        <Link to="/restaurants" onClick={closeMenu} style={linkStyle}>
          🍽 Restaurants
        </Link>

        <Link to="/menu" onClick={closeMenu} style={linkStyle}>
          📋 Menu
        </Link>

        <Link to="/orders" onClick={closeMenu} style={linkStyle}>
          🛒 Orders
        </Link>

        <Link to="/inventory" onClick={closeMenu} style={linkStyle}>
          📦 Inventory
        </Link>

        <Link to="/predictions" onClick={closeMenu} style={linkStyle}>
          🤖 AI Predictions
        </Link>

        <Link
          to="/analytics-dashboard"
          onClick={closeMenu}
          style={linkStyle}
        >
          📊 Analytics
        </Link>

        <Link to="/profile" onClick={closeMenu} style={linkStyle}>
          👤 Profile
        </Link>

        <button
          onClick={handleLogout}
          style={{
            background: "white",
            color: "#ff6b00",
            border: "none",
            padding: "8px 14px",
            borderRadius: "7px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          🚪 Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;