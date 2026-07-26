import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaBoxes,
  FaClipboardList,
  FaUsers,
  FaUserTie,
  FaCalendarAlt,
  FaChartBar,
  FaRobot,
  FaStore,
  FaCog,
} from "react-icons/fa";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      icon: <FaHome />,
      path: "/manager-dashboard",
    },
    {
      title: "Restaurants",
      icon: <FaStore />,
      path: "/restaurants",
    },
    {
      title: "Inventory",
      icon: <FaBoxes />,
      path: "/inventory",
    },
   
    {
      title: "Orders",
      icon: <FaClipboardList />,
      path: "/orders",
    },
    {
      title: "Customers",
      icon: <FaUsers />,
      path: "/customers",
    },
    {
      title: "Employees",
      icon: <FaUserTie />,
      path: "/employees",
    },
    {
      title: "Reservations",
      icon: <FaCalendarAlt />,
      path: "/reservations",
    },
    {
      title: "Reports",
      icon: <FaChartBar />,
      path: "/reports",
    },
    {
      title: "AI Predictions",
      icon: <FaRobot />,
      path: "/predictions",
    },
    {
      title: "Settings",
      icon: <FaCog />,
      path: "/settings",
    },
  ];

  return (
    <aside
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "260px",
        height: "100vh",
        background: "#111827",
        color: "white",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid rgba(255,255,255,.08)",
        boxShadow: "5px 0 20px rgba(0,0,0,.25)",
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "28px 20px",
          borderBottom: "1px solid rgba(255,255,255,.08)",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "#22C55E",
            fontWeight: "700",
          }}
        >
          🍽 Cloud Restaurant
        </h2>

        <p
          style={{
            marginTop: "8px",
            color: "#9CA3AF",
            fontSize: "13px",
          }}
        >
          Management Suite
        </p>
      </div>

      {/* Navigation */}
      <div
        style={{
          flex: 1,
          padding: "18px 12px",
          overflowY: "auto",
        }}
      >
        {menuItems.map((item) => {
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "14px 18px",
                marginBottom: "8px",
                borderRadius: "12px",
                textDecoration: "none",
                color: active ? "#FFFFFF" : "#D1D5DB",
                background: active
                  ? "linear-gradient(90deg,#2563EB,#7C3AED)"
                  : "transparent",
                transition: "all .3s ease",
                fontWeight: active ? "600" : "500",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.background =
                    "rgba(255,255,255,.06)";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.background =
                    "transparent";
                }
              }}
            >
              <span
                style={{
                  fontSize: "18px",
                }}
              >
                {item.icon}
              </span>

              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "18px",
          borderTop: "1px solid rgba(255,255,255,.08)",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,.05)",
            borderRadius: "12px",
            padding: "14px",
          }}
        >
          <div
            style={{
              fontWeight: "600",
              color: "#FFFFFF",
            }}
          >
            Restaurant Admin
          </div>

          <div
            style={{
              color: "#9CA3AF",
              fontSize: "13px",
              marginTop: "4px",
            }}
          >
            Enterprise Dashboard
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;