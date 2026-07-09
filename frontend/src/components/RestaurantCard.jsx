import { FaStar, FaMapMarkerAlt } from "react-icons/fa";

function RestaurantCard({ restaurant }) {
  return (
    <div
      style={{
        width: "300px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        background: "#fff",
      }}
    >
      <img
        src={restaurant.image}
        alt={restaurant.name}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
        }}
      />

      <div style={{ padding: "15px" }}>
        <h2>{restaurant.name}</h2>

        <p>
          <FaMapMarkerAlt color="red" /> {restaurant.location}
        </p>

        <p>
          <FaStar color="gold" /> {restaurant.rating}
        </p>

        <button
          style={{
            width: "100%",
            padding: "10px",
            background: "#ff6b00",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          View Menu
        </button>
      </div>
    </div>
  );
}

export default RestaurantCard;