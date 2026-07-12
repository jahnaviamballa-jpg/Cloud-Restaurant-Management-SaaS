import { useState } from "react";

function FoodCard({ food }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: "300px",
        maxWidth: "100%",
        background: "#fff",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: hover
          ? "0 8px 20px rgba(0,0,0,0.2)"
          : "0 4px 10px rgba(0,0,0,0.1)",
        transform: hover ? "translateY(-8px)" : "translateY(0)",
        transition: "0.3s",
        cursor: "pointer",
      }}
    >
      <img
        src={food.image}
        alt={food.name}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
        }}
      />

      <div style={{ padding: "15px" }}>
        <h3>{food.name}</h3>

        <p>{food.description}</p>

        <h4>₹{food.price}</h4>

        <p>⭐ {food.rating}</p>

        <span
          style={{
            color: food.isVeg ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {food.isVeg ? "🟢 Veg" : "🔴 Non-Veg"}
        </span>

        <button
          style={{
            width: "100%",
            marginTop: "15px",
            padding: "10px",
            background: "#ff5722",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default FoodCard;