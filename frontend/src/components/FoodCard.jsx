import { FaStar } from "react-icons/fa";

function FoodCard({ food }) {
  return (
    <div
      style={{
        width: "280px",
        background: "#fff",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
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

        <p style={{ color: "#666" }}>{food.description}</p>

        <p>
          <strong>₹{food.price}</strong>
        </p>

        <p>
          <FaStar color="gold" /> {food.rating}
        </p>

        <span
          style={{
            display: "inline-block",
            padding: "5px 10px",
            borderRadius: "20px",
            background: food.isVeg ? "green" : "red",
            color: "#fff",
            fontSize: "12px",
            marginBottom: "10px",
          }}
        >
          {food.isVeg ? "Veg" : "Non-Veg"}
        </span>

        <br />

        <button
          style={{
            width: "100%",
            padding: "10px",
            background: "#ff6b00",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default FoodCard;