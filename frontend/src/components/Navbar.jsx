import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role?.toLowerCase();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: "600",
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
      }}
    >
      <Link
        to="/"
        style={{
          color: "white",
          textDecoration: "none",
        }}
      >
        <h2>🍽️ Cloud Restaurant</h2>
      </Link>

      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <ThemeToggle />

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "transparent",
            color: "white",
            border: "1px solid white",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "22px",
          }}
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div
          style={{
            width: "100%",
            marginTop: "20px",
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {/* Customer */}

          {role === "customer" && (
            <>
              <Link to="/dashboard" style={linkStyle} onClick={closeMenu}>
                Dashboard
              </Link>

              <Link to="/restaurants" style={linkStyle} onClick={closeMenu}>
                Restaurants
              </Link>

              <Link to="/menu" style={linkStyle} onClick={closeMenu}>
                Menu
              </Link>

              <Link to="/cart" style={linkStyle} onClick={closeMenu}>
                Cart
              </Link>

              <Link to="/orders" style={linkStyle} onClick={closeMenu}>
                My Orders
              </Link>

              <Link to="/reservations" style={linkStyle} onClick={closeMenu}>
                Reservations
              </Link>

              <Link to="/profile" style={linkStyle} onClick={closeMenu}>
                Profile
              </Link>
            </>
          )}

          {/* Manager */}

          {role === "manager" && (
            <>
              <Link to="/manager-dashboard" style={linkStyle} onClick={closeMenu}>
                Dashboard
              </Link>

              <Link to="/inventory" style={linkStyle} onClick={closeMenu}>
                Inventory
              </Link>

              <Link to="/add-inventory" style={linkStyle} onClick={closeMenu}>
                Add Inventory
              </Link>

              <Link to="/orders" style={linkStyle} onClick={closeMenu}>
                Orders
              </Link>

              <Link to="/predictions" style={linkStyle} onClick={closeMenu}>
                Predictions
              </Link>

              <Link to="/profile" style={linkStyle} onClick={closeMenu}>
                Profile
              </Link>
            </>
          )}

          {/* Owner */}

          {role === "owner" && (
            <>
              <Link to="/owner-dashboard" style={linkStyle} onClick={closeMenu}>
                Dashboard
              </Link>

              <Link to="/restaurants" style={linkStyle} onClick={closeMenu}>
                Restaurants
              </Link>

              <Link to="/inventory" style={linkStyle} onClick={closeMenu}>
                Inventory
              </Link>

              <Link
                to="/analytics-dashboard"
                style={linkStyle}
                onClick={closeMenu}
              >
                Analytics
              </Link>

              <Link
                to="/sales-report"
                style={linkStyle}
                onClick={closeMenu}
              >
                Sales
              </Link>

              <Link
                to="/revenue-report"
                style={linkStyle}
                onClick={closeMenu}
              >
                Revenue
              </Link>

              <Link to="/profile" style={linkStyle} onClick={closeMenu}>
                Profile
              </Link>
            </>
          )}

          {/* Chef */}

          {role === "chef" && (
            <>
              <Link to="/chef-dashboard" style={linkStyle} onClick={closeMenu}>
                Dashboard
              </Link>

              <Link to="/orders" style={linkStyle} onClick={closeMenu}>
                Orders
              </Link>

              <Link to="/menu" style={linkStyle} onClick={closeMenu}>
                Menu
              </Link>

              <Link to="/profile" style={linkStyle} onClick={closeMenu}>
                Profile
              </Link>
            </>
          )}

          <button
            onClick={handleLogout}
            style={{
              background: "white",
              color: "#ff6b00",
              border: "none",
              padding: "8px 15px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;