import { useState } from "react";

function Profile() {
  const [user, setUser] = useState({
    name: "Jahnavi",
    email: "jahnavi@example.com",
    phone: "+91 9876543210",
    role: "Restaurant Manager",
    restaurant: "Cloud Restaurant",
  });

  const handleEditProfile = () => {
    alert("Edit Profile feature coming soon!");
  };

  const handleChangePassword = () => {
    alert("Change Password feature coming soon!");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f6fa",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "auto",
          background: "white",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div style={{ fontSize: "70px" }}>👤</div>
          <h1>User Profile</h1>
          <p>Manage your account information</p>
        </div>

        <ProfileField label="User Name" value={user.name} />
        <ProfileField label="Email" value={user.email} />
        <ProfileField label="Phone" value={user.phone} />
        <ProfileField label="Role" value={user.role} />
        <ProfileField
          label="Restaurant Name"
          value={user.restaurant}
        />

        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            marginTop: "30px",
          }}
        >
          <button
            onClick={handleEditProfile}
            style={buttonStyle}
          >
            ✏️ Edit Profile
          </button>

          <button
            onClick={handleChangePassword}
            style={buttonStyle}
          >
            🔐 Change Password
          </button>
        </div>
      </div>
    </div>
  );
}

function ProfileField({ label, value }) {
  return (
    <div
      style={{
        padding: "15px",
        marginBottom: "12px",
        background: "#f8f9fa",
        borderRadius: "8px",
      }}
    >
      <strong>{label}</strong>
      <p style={{ margin: "5px 0 0" }}>{value}</p>
    </div>
  );
}

const buttonStyle = {
  flex: 1,
  minWidth: "180px",
  background: "#ff6b00",
  color: "white",
  border: "none",
  padding: "12px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default Profile;