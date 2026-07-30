import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  FaBell,
  FaUserCircle,
} from "react-icons/fa";

function Topbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [time, setTime] = useState(new Date());
  

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const role = (user?.role || "").toLowerCase();

  const username = user?.name || "Restaurant User";

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("restaurant");

  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("cart_")) {
      localStorage.removeItem(key);
    }
  });

  navigate("/login", { replace: true });

  setTimeout(() => {
    window.location.reload();
  }, 100);
};

  let menu = [];

  // ==========================
  // CUSTOMER
  // ==========================

  if (role === "customer") {
  menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Menu", path: "/menu" },
    { name: "My Orders", path: "/orders" },
    { name: "Reservations", path: "/reservations" },
    { name: "Profile", path: "/profile" },
  ];
}

  // ==========================
  // MANAGER
  // ==========================

  else if (role === "manager") {
    menu = [
      { name: "Dashboard", path: "/manager-dashboard" },
      { name: "Menu", path: "/menu" },
      { name: "Add Menu", path: "/add-menu" },
      {
  name: "Inventory",
  path: "/inventory",
  activePaths: ["/inventory"],
},
{
  name: "Add Inventory",
  path: "/add-inventory",
  activePaths: ["/add-inventory"],
},
      { name: "Orders", path: "/orders" },
      { name: "Reservations", path: "/reservations" },
      { name: "Employees", path: "/employees" },
      { name: "Predictions", path: "/predictions" },
      { name: "Reports", path: "/analytics-dashboard" },
      { name: "Profile", path: "/profile" },
    ];
  }

  // ==========================
  // OWNER
  // ==========================

  else if (role === "owner") {
    menu = [
      { name: "Dashboard", path: "/owner-dashboard" },
      { name: "Restaurants", path: "/restaurants" },
      { name: "Menu", path: "/menu" },
      { name: "Add Menu", path: "/add-menu" },
      {
  name: "Inventory",
  path: "/inventory",
  activePaths: ["/inventory"],
},
{
  name: "Add Inventory",
  path: "/add-inventory",
  activePaths: ["/add-inventory"],
},
      { name: "Orders", path: "/orders" },
      { name: "Reservations", path: "/reservations" },
      { name: "Employees", path: "/employees" },
      { name: "Predictions", path: "/predictions" },
      { name: "Reports", path: "/analytics-dashboard" },
      { name: "Profile", path: "/profile" },
    ];
  }

  // ==========================
  // CHEF
  // ==========================

  else if (role === "chef") {
    menu = [
      { name: "Dashboard", path: "/chef-dashboard" },
      { name: "Orders", path: "/orders" },
      { name: "Menu", path: "/menu" },
      { name: "Inventory", path: "/inventory" },
      { name: "Profile", path: "/profile" },
    ];
  }

  return (
    <header
      style={{
        height: "70px",
        background: "#16161f",
        borderBottom: "1px solid rgba(255,255,255,.08)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 24px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* LEFT */}
      <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "18px",
    minWidth: 0,
    flex: 1,
  }}
>
        <h2
          style={{
            margin: 0,
            color: "#8B5CF6",
            fontWeight: "800",
            fontSize: "22px",
            whiteSpace: "nowrap",
          }}
        >
          🍽 Cloud Restaurant
        </h2>

        <div
  style={{
    display: "flex",
    gap: "6px",
    flexWrap: "nowrap",
    overflowX: "auto",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  }}
>
          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                textDecoration: "none",
                color:
                  location.pathname === item.path
                    ? "#fff"
                    : "#B5B5C3",

                background:
                  location.pathname === item.path
                    ? "#7C3AED"
                    : "transparent",

                padding: "9px 12px",
                fontSize: "13px",
                whiteSpace: "nowrap",
                flexShrink: 0,
                borderRadius: "8px",
                fontWeight: "600",
                transition: ".25s",
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        

        <FaBell
          size={18}
          color="#BDBDBD"
          style={{ cursor: "pointer" }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <FaUserCircle
            size={38}
            color="#8B5CF6"
          />

          <div>
            <div
              style={{
                color: "white",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              {username}
            </div>

            <div
              style={{
                color: "#8A8A99",
                fontSize: "12px",
                textTransform: "capitalize",
              }}
            >
              {role}
            </div>

            <div
              style={{
                color: "#6B7280",
                fontSize: "11px",
              }}
            >
              {time.toLocaleTimeString()}
            </div>
          </div>
        </div>

        <button
          onClick={logout}
          style={{
            background: "#7C3AED",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "10px 18px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Topbar;