import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
function Profile() {
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [user] = useState({
    name: storedUser?.name || "User",
    email: storedUser?.email || "",
    phone: storedUser?.phone || "",
    role: storedUser?.role || "",
    restaurant: storedUser?.restaurant_name || "",
  });

  const handleEdit = () => {
    alert("Edit Profile feature coming soon...");
  };

  const handleChangePassword = () => {
    navigate("/change-password");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
  <Layout>
    <div
      style={{
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "auto",
          background: "rgba(18,18,24,.75)",
          borderRadius: "25px",
          padding: "40px",
          border: "1px solid rgba(255,255,255,.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "40px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              textAlign: "center",
              minWidth: "220px",
            }}
          >
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                user.name
              )}&background=7C3AED&color=fff&size=200`}
              alt="Profile"
              style={{
                width: "180px",
                height: "180px",
                borderRadius: "50%",
                border: "5px solid #F97316",
              }}
            />

            <h2
              style={{
                color: "white",
                marginTop: "20px",
              }}
            >
              {user.name}
            </h2>

            <p style={{ color: "#BDBDBD" }}>
              {user.role}
            </p>

            <span
              style={{
                background: "#22C55E",
                color: "white",
                padding: "8px 18px",
                borderRadius: "30px",
                fontWeight: "600",
              }}
            >
              ⭐ Premium Member
            </span>
          </div>

          <div style={{ flex: 1 }}>
            <ProfileCard title="Restaurant" value={user.restaurant} />
            <ProfileCard title="Email" value={user.email} />
            <ProfileCard title="Phone" value={user.phone} />
            <ProfileCard title="Role" value={user.role} />
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
            marginTop: "40px",
          }}
        >
          <StatCard title="Orders" value="24" color="#7C3AED" />
          <StatCard title="Reservations" value="8" color="#06B6D4" />
          <StatCard title="Reward Points" value="240" color="#F97316" />
          <StatCard title="Favorite Items" value="12" color="#22C55E" />
        </div>

        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            marginTop: "40px",
          }}
        >
          <ActionButton
            text="✏️ Edit Profile"
            color="#7C3AED"
            onClick={handleEdit}
          />

          <ActionButton
            text="🔐 Change Password"
            color="#F97316"
            onClick={handleChangePassword}
          />

          <ActionButton
            text="🚪 Logout"
            color="#DC2626"
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
    </Layout>
  );
}

function ProfileCard({ title, value }) {
  return (
    <div
      style={{
        background: "rgba(20,20,28,.92)",
        padding: "18px",
        borderRadius: "15px",
        border: "1px solid rgba(255,255,255,.08)",
        marginBottom: "18px",
      }}
    >
      <p
        style={{
          color: "#999",
          marginBottom: "8px",
        }}
      >
        {title}
      </p>

      <h3
        style={{
          color: "white",
          margin: 0,
        }}
      >
        {value}
      </h3>
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div
      style={{
        background: "rgba(20,20,28,.92)",
        borderRadius: "18px",
        padding: "25px",
        textAlign: "center",
        border: "1px solid rgba(255,255,255,.08)",
      }}
    >
      <h3
        style={{
          color: "#CFCFD5",
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          color,
          fontSize: "38px",
          margin: "10px 0",
        }}
      >
        {value}
      </h1>
    </div>
  );
}

function ActionButton({ text, color, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        minWidth: "220px",
        padding: "16px",
        borderRadius: "15px",
        border: "none",
        background: color,
        color: "white",
        fontWeight: "700",
        cursor: "pointer",
        fontSize: "16px",
      }}
    >
      {text}
    </button>
  );
}

export default Profile;