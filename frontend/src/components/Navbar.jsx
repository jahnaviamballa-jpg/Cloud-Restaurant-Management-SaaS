import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role?.toLowerCase();

  const restaurant = JSON.parse(
    localStorage.getItem("restaurant")
  );

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("restaurant");

    navigate("/login");
  };

  const linkStyle = {
    color: "#E5E7EB",
    textDecoration: "none",
    fontWeight: "600",
    padding: "10px 18px",
    borderRadius: "12px",
    transition: ".3s",
    background: "rgba(255,255,255,.04)",
  };

  const handleLinkHover = (e) => {
    e.currentTarget.style.background =
      "linear-gradient(90deg,#7C3AED,#F97316)";
    e.currentTarget.style.color = "white";
    e.currentTarget.style.transform =
      "translateY(-2px)";
  };

  const handleLinkLeave = (e) => {
    e.currentTarget.style.background =
      "rgba(255,255,255,.04)";
    e.currentTarget.style.color =
      "#E5E7EB";
    e.currentTarget.style.transform =
      "translateY(0)";
  };

  const handleMenuHover = (e) => {
    e.currentTarget.style.background =
      "#7C3AED";
    e.currentTarget.style.transform =
      "scale(1.08)";
  };

  const handleMenuLeave = (e) => {
    e.currentTarget.style.background =
      "rgba(255,255,255,.08)";
    e.currentTarget.style.transform =
      "scale(1)";
  };

  const handleLogoutHover = (e) => {
    e.currentTarget.style.background =
      "#EF4444";
  };

  const handleLogoutLeave = (e) => {
    e.currentTarget.style.background =
      "#DC2626";
  };

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        padding: "18px 40px",
        background:
          "rgba(15,15,25,.92)",
        backdropFilter: "blur(16px)",
        borderBottom:
          "1px solid rgba(255,255,255,.08)",
        boxShadow:
          "0 10px 25px rgba(0,0,0,.35)",
      }}
    >
      <div>
        <Link
          to="/"
          style={{
            textDecoration: "none",
          }}
        >
          <h2
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              margin: 0,
              fontSize: "30px",
              fontWeight: "800",
              transition: ".3s",
              background:
                "linear-gradient(90deg,#7C3AED,#A855F7,#F97316)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor:
                "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "scale(1)";
            }}
          >
            🍽 Cloud Restaurant
          </h2>
        </Link>

        {restaurant && (
          <p
            style={{
              color: "#CFCFD5",
              marginTop: "6px",
              fontSize: "13px",
              letterSpacing: ".5px",
            }}
          >
            📍{" "}
            {restaurant.restaurant_name ||
              restaurant.name}
          </p>
        )}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        {user && (
          <div
            style={{
              textAlign: "right",
              color: "white",
              background:
                "rgba(255,255,255,.06)",
              padding: "10px 16px",
              borderRadius: "14px",
              border:
                "1px solid rgba(255,255,255,.08)",
            }}
          >
            <div
              style={{
                fontWeight: "700",
                fontSize: "15px",
                marginBottom: "3px",
              }}
            >
              👋 {user.name}
            </div>

            <small
              style={{
                color: "#CFCFD5",
                textTransform:
                  "capitalize",
              }}
            >
              {user.role}
            </small>
          </div>
        )}

        <button
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          onMouseEnter={
            handleMenuHover
          }
          onMouseLeave={
            handleMenuLeave
          }
          style={{
            width: "48px",
            height: "48px",
            background:
              "rgba(255,255,255,.08)",
            color: "white",
            border:
              "1px solid rgba(255,255,255,.08)",
            borderRadius: "12px",
            cursor: "pointer",
            fontSize: "24px",
            transition: ".3s",
          }}
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div
          style={{
            width: "100%",
            marginTop: "22px",
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            padding: "20px",
            borderRadius: "18px",
            background:
              "rgba(20,20,28,.92)",
            border:
              "1px solid rgba(255,255,255,.08)",
            backdropFilter:
              "blur(12px)",
          }}
        >
          {role === "customer" && (
            <>
              <Link to="/dashboard" style={linkStyle} onClick={closeMenu} onMouseEnter={handleLinkHover} onMouseLeave={handleLinkLeave}>Dashboard</Link>

              <Link to="/restaurants" style={linkStyle} onClick={closeMenu} onMouseEnter={handleLinkHover} onMouseLeave={handleLinkLeave}>Restaurants</Link>

              <Link to="/menu" style={linkStyle} onClick={closeMenu} onMouseEnter={handleLinkHover} onMouseLeave={handleLinkLeave}>Menu</Link>

              <Link to="/cart" style={linkStyle} onClick={closeMenu} onMouseEnter={handleLinkHover} onMouseLeave={handleLinkLeave}>Cart</Link>

              <Link to="/orders" style={linkStyle} onClick={closeMenu} onMouseEnter={handleLinkHover} onMouseLeave={handleLinkLeave}>Orders</Link>

              <Link to="/reservations" style={linkStyle} onClick={closeMenu} onMouseEnter={handleLinkHover} onMouseLeave={handleLinkLeave}>Reservations</Link>

              <Link to="/profile" style={linkStyle} onClick={closeMenu} onMouseEnter={handleLinkHover} onMouseLeave={handleLinkLeave}>Profile</Link>
            </>
          )}

          {role === "manager" && (
            <>
              <Link to="/manager-dashboard" style={linkStyle} onClick={closeMenu} onMouseEnter={handleLinkHover} onMouseLeave={handleLinkLeave}>Dashboard</Link>

              <Link to="/inventory" style={linkStyle} onClick={closeMenu} onMouseEnter={handleLinkHover} onMouseLeave={handleLinkLeave}>Inventory</Link>

              <Link to="/add-inventory" style={linkStyle} onClick={closeMenu} onMouseEnter={handleLinkHover} onMouseLeave={handleLinkLeave}>Add Inventory</Link>

              <Link to="/orders" style={linkStyle} onClick={closeMenu} onMouseEnter={handleLinkHover} onMouseLeave={handleLinkLeave}>Orders</Link>

              <Link to="/predictions" style={linkStyle} onClick={closeMenu} onMouseEnter={handleLinkHover} onMouseLeave={handleLinkLeave}>Predictions</Link>

              <Link to="/profile" style={linkStyle} onClick={closeMenu} onMouseEnter={handleLinkHover} onMouseLeave={handleLinkLeave}>Profile</Link>
            </>
          )}
                    {role === "owner" && (
            <>
              <Link
                to="/owner-dashboard"
                style={linkStyle}
                onClick={closeMenu}
                onMouseEnter={handleLinkHover}
                onMouseLeave={handleLinkLeave}
              >
                Dashboard
              </Link>

              <Link
                to="/restaurants"
                style={linkStyle}
                onClick={closeMenu}
                onMouseEnter={handleLinkHover}
                onMouseLeave={handleLinkLeave}
              >
                Restaurants
              </Link>

              <Link
                to="/inventory"
                style={linkStyle}
                onClick={closeMenu}
                onMouseEnter={handleLinkHover}
                onMouseLeave={handleLinkLeave}
              >
                Inventory
              </Link>

              <Link
                to="/analytics-dashboard"
                style={linkStyle}
                onClick={closeMenu}
                onMouseEnter={handleLinkHover}
                onMouseLeave={handleLinkLeave}
              >
                Analytics
              </Link>

              <Link
                to="/sales-report"
                style={linkStyle}
                onClick={closeMenu}
                onMouseEnter={handleLinkHover}
                onMouseLeave={handleLinkLeave}
              >
                Sales
              </Link>

              <Link
                to="/revenue-report"
                style={linkStyle}
                onClick={closeMenu}
                onMouseEnter={handleLinkHover}
                onMouseLeave={handleLinkLeave}
              >
                Revenue
              </Link>

              <Link
                to="/profile"
                style={linkStyle}
                onClick={closeMenu}
                onMouseEnter={handleLinkHover}
                onMouseLeave={handleLinkLeave}
              >
                Profile
              </Link>
            </>
          )}

          {role === "chef" && (
            <>
              <Link
                to="/chef-dashboard"
                style={linkStyle}
                onClick={closeMenu}
                onMouseEnter={handleLinkHover}
                onMouseLeave={handleLinkLeave}
              >
                Dashboard
              </Link>

              <Link
                to="/orders"
                style={linkStyle}
                onClick={closeMenu}
                onMouseEnter={handleLinkHover}
                onMouseLeave={handleLinkLeave}
              >
                Orders
              </Link>

              <Link
                to="/menu"
                style={linkStyle}
                onClick={closeMenu}
                onMouseEnter={handleLinkHover}
                onMouseLeave={handleLinkLeave}
              >
                Menu
              </Link>

              <Link
                to="/profile"
                style={linkStyle}
                onClick={closeMenu}
                onMouseEnter={handleLinkHover}
                onMouseLeave={handleLinkLeave}
              >
                Profile
              </Link>
            </>
          )}

          <button
            onClick={handleLogout}
            onMouseEnter={handleLogoutHover}
            onMouseLeave={handleLogoutLeave}
            style={{
              background: "#DC2626",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "700",
              transition: ".3s",
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