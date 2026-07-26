import { useState } from "react";

function EditProfileModal({ user, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: user.name,
    phone: user.phone,
    restaurant_name: user.restaurant_name,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          width: "420px",
          background: "#18181b",
          borderRadius: "20px",
          padding: "30px",
        }}
      >
        <h2 style={{ color: "white", marginBottom: "20px" }}>
          Edit Profile
        </h2>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          style={inputStyle}
        />

        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          style={inputStyle}
        />

        <input
          name="restaurant_name"
          value={formData.restaurant_name}
          onChange={handleChange}
          placeholder="Restaurant"
          style={inputStyle}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "25px",
          }}
        >
          <button
            onClick={onClose}
            style={{
              ...buttonStyle,
              background: "#444",
            }}
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            style={{
              ...buttonStyle,
              background: "#7C3AED",
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  marginBottom: "15px",
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  outline: "none",
  fontSize: "16px",
};

const buttonStyle = {
  color: "white",
  border: "none",
  padding: "12px 25px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default EditProfileModal;