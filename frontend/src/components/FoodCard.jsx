import { useState } from "react";

function FoodCard({ food }) {
  const [hover, setHover] = useState(false);

  const addToCart = () => {
    let cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(
      (item) => item.id === food.id
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: food.id,
        restaurant_id: food.restaurant_id,
        name: food.name,
        price: food.price,
        image_url: food.image_url,
        quantity: 1,
      });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    alert(`${food.name} added to cart`);
  };

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: "300px",
        maxWidth: "100%",
        background: "rgba(20,20,28,.92)",
        border:
          "1px solid rgba(255,255,255,.08)",
        backdropFilter: "blur(12px)",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: hover
          ? "0 25px 60px rgba(0,0,0,.45)"
          : "0 12px 30px rgba(0,0,0,.25)",
        transform: hover
          ? "translateY(-12px) scale(1.02)"
          : "translateY(0)",
        transition: "all .35s ease",
        cursor: "pointer",
      }}
    >
      <img
        src={
          food.image_url ||
          "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80"
        }
        alt={food.name}
        style={{
          width: "100%",
          height: "220px",
          objectFit: "cover",
          transform: hover
            ? "scale(1.08)"
            : "scale(1)",
          transition: ".5s",
        }}
      />

      <div
        style={{
          padding: "22px",
        }}
      >
        <h2
          style={{
            color: "white",
            fontSize: "24px",
            marginBottom: "10px",
            fontWeight: "700",
          }}
        >
          {food.name}
        </h2>

        <p
          style={{
            color: "#CFCFD5",
            lineHeight: "26px",
            minHeight: "55px",
            marginBottom: "18px",
          }}
        >
          {food.description ||
            "Freshly prepared delicious dish."}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            marginBottom: "18px",
          }}
        >
          <h3
            style={{
              color: "#F97316",
              fontSize: "24px",
              margin: 0,
            }}
          >
            ₹{food.price}
          </h3>

          <span
            style={{
              background: "#22C55E",
              color: "white",
              padding: "6px 12px",
              borderRadius: "30px",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            ⭐ 4.8
          </span>
        </div>

        <div
          style={{
            marginBottom: "18px",
          }}
        >
          <span
            style={{
              background: food.is_veg
                ? "#16A34A"
                : "#DC2626",
              color: "white",
              padding: "7px 16px",
              borderRadius: "30px",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            {food.is_veg
              ? "🟢 Veg"
              : "🔴 Non-Veg"}
          </span>
        </div>

        <button
          onClick={addToCart}
          style={{
            width: "100%",
            padding: "15px",
            border: "none",
            borderRadius: "14px",
            background: hover
              ? "linear-gradient(90deg,#F97316,#7C3AED)"
              : "linear-gradient(90deg,#7C3AED,#F97316)",
            color: "white",
            fontWeight: "700",
            fontSize: "16px",
            cursor: "pointer",
            transition: ".35s",
          }}
        >
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
}

export default FoodCard;