import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRestaurant } from "../api/restaurantApi";

function AddRestaurant() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [restaurant, setRestaurant] = useState({
    restaurant_name: "",
    owner_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    latitude: "",
    longitude: "",
    description: "",
    logo_url: "",
  });

  const handleChange = (e) => {
    setRestaurant({
      ...restaurant,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await createRestaurant({
        ...restaurant,
        latitude:
          restaurant.latitude === ""
            ? null
            : Number(restaurant.latitude),
        longitude:
          restaurant.longitude === ""
            ? null
            : Number(restaurant.longitude),
      });

      alert("Restaurant Added Successfully!");

      navigate("/restaurants");
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.detail ||
          "Failed to add restaurant"
      );
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,.12)",
    background: "rgba(255,255,255,.08)",
    color: "white",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background:
          "linear-gradient(rgba(0,0,0,.25),rgba(0,0,0,.35)),url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div
        style={{
          maxWidth: "950px",
          margin: "auto",
          background: "rgba(18,18,24,.78)",
          padding: "35px",
          borderRadius: "25px",
          border:
            "1px solid rgba(255,255,255,.08)",
          backdropFilter: "blur(12px)",
        }}
      >
        <h1
          style={{
            color: "white",
            marginBottom: "10px",
            fontSize: "40px",
          }}
        >
          ➕ Add Restaurant
        </h1>

        <p
          style={{
            color: "#CFCFD5",
            marginBottom: "35px",
            fontSize: "17px",
          }}
        >
          Register a new restaurant into
          your cloud platform.
        </p>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(300px,1fr))",
              gap: "20px",
            }}
          >
            <input
              name="restaurant_name"
              placeholder="Restaurant Name"
              value={restaurant.restaurant_name}
              onChange={handleChange}
              style={inputStyle}
              required
            />

            <input
              name="owner_name"
              placeholder="Owner Name"
              value={restaurant.owner_name}
              onChange={handleChange}
              style={inputStyle}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={restaurant.email}
              onChange={handleChange}
              style={inputStyle}
              required
            />

            <input
              name="phone"
              placeholder="Phone Number"
              value={restaurant.phone}
              onChange={handleChange}
              style={inputStyle}
              required
            />

            <input
              name="address"
              placeholder="Address"
              value={restaurant.address}
              onChange={handleChange}
              style={inputStyle}
              required
            />

            <input
              name="city"
              placeholder="City"
              value={restaurant.city}
              onChange={handleChange}
              style={inputStyle}
              required
            />

            <input
              name="state"
              placeholder="State"
              value={restaurant.state}
              onChange={handleChange}
              style={inputStyle}
              required
            />

            <input
              name="pincode"
              placeholder="Pincode"
              value={restaurant.pincode}
              onChange={handleChange}
              style={inputStyle}
              required
            />
                        <input
              type="number"
              step="any"
              name="latitude"
              placeholder="Latitude (Optional)"
              value={restaurant.latitude}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              type="number"
              step="any"
              name="longitude"
              placeholder="Longitude (Optional)"
              value={restaurant.longitude}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              name="logo_url"
              placeholder="Logo Image URL"
              value={restaurant.logo_url}
              onChange={handleChange}
              style={inputStyle}
            />

            <textarea
              name="description"
              placeholder="Restaurant Description"
              value={restaurant.description}
              onChange={handleChange}
              rows={5}
              style={{
                ...inputStyle,
                gridColumn: "1 / -1",
                resize: "none",
                minHeight: "130px",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              marginTop: "35px",
              padding: "16px",
              border: "none",
              borderRadius: "14px",
              background:
                "linear-gradient(90deg,#7C3AED,#F97316)",
              color: "white",
              fontWeight: "700",
              fontSize: "17px",
              cursor: loading
                ? "not-allowed"
                : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading
              ? "Saving Restaurant..."
              : "💾 Save Restaurant"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddRestaurant;