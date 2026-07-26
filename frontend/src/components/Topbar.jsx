import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  FaBell,
  FaSearch,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

function Topbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // ==========================
  // STATES
  // ==========================

  const [time, setTime] = useState(new Date());

  const [search, setSearch] = useState("");

  // ==========================
  // USER
  // ==========================

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const role =
    (user?.role || "").toLowerCase();

  const username =
    user?.name || "Restaurant User";

  // ==========================
  // CLOCK
  // ==========================

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // ==========================
  // LOGOUT
  // ==========================

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("restaurant");

    navigate("/login");
  };

  // ==========================
  // ROLE BASED MENU
  // ==========================

  let menu = [];

  if (role === "customer") {
    menu = [
      {
        name: "Dashboard",
        path: "/dashboard",
      },
      {
        name: "Restaurants",
        path: "/restaurants",
      },
      {
        name: "Menu",
        path: "/menu",
      },
      {
        name: "Cart",
        path: "/cart",
      },
      {
        name: "Orders",
        path: "/orders",
      },
      {
        name: "Reservations",
        path: "/reservations",
      },
      {
        name: "Profile",
        path: "/profile",
      },
    ];
  }

  else if (role === "manager") {
    menu = [
      {
        name: "Dashboard",
        path: "/manager-dashboard",
      },
      {
        name: "Inventory",
        path: "/inventory",
      },
      {
        name: "Add Inventory",
        path: "/add-inventory",
      },
      {
        name: "Orders",
        path: "/orders",
      },
      {
        name: "Predictions",
        path: "/predictions",
      },
      {
        name: "Reports",
        path: "/analytics-dashboard",
      },
      {
        name: "Profile",
        path: "/profile",
      },
    ];
  }

  else if (role === "owner") {
    menu = [
      {
        name: "Dashboard",
        path: "/owner-dashboard",
      },
      {
        name: "Restaurants",
        path: "/restaurants",
      },
      {
        name: "Inventory",
        path: "/inventory",
      },
      {
        name: "Orders",
        path: "/orders",
      },
      {
        name: "Predictions",
        path: "/predictions",
      },
      {
        name: "Reports",
        path: "/analytics-dashboard",
      },
      {
        name: "Sales",
        path: "/sales-report",
      },
      {
        name: "Revenue",
        path: "/revenue-report",
      },
      {
        name: "Profile",
        path: "/profile",
      },
    ];
  }

  else if (role === "chef") {
    menu = [
      {
        name: "Dashboard",
        path: "/chef-dashboard",
      },
      {
        name: "Orders",
        path: "/orders",
      },
      {
        name: "Menu",
        path: "/menu",
      },
      {
        name: "Profile",
        path: "/profile",
      },
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
        gap: "35px",
      }}
    >
      <h2
        style={{
          margin: 0,
          color: "#8B5CF6",
          fontWeight: "800",
          fontSize: "26px",
          whiteSpace: "nowrap",
        }}
      >
        🍽 Cloud Restaurant
      </h2>

      <div
        style={{
          display: "flex",
          gap: "8px",
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

              padding: "10px 16px",
              borderRadius: "8px",
              fontWeight: "600",
              fontSize: "14px",
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
      {/* SEARCH */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "#232332",
          padding: "0 14px",
          borderRadius: "8px",
          height: "42px",
          width: "230px",
        }}
      >
        <FaSearch
          color="#9CA3AF"
          size={14}
        />

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);

            window.dispatchEvent(
              new CustomEvent(
                "globalSearch",
                {
                  detail: e.target.value,
                }
              )
            );
          }}
          style={{
            flex: 1,
            marginLeft: "10px",
            background: "transparent",
            border: "none",
            outline: "none",
            color: "white",
          }}
        />
      </div>

      {/* BELL */}

      <FaBell
        size={18}
        color="#BDBDBD"
        style={{ cursor: "pointer" }}
      />

      {/* USER */}

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
            }}
          >
            {role}
          </div>
        </div>
      </div>

      {/* LOGOUT */}

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