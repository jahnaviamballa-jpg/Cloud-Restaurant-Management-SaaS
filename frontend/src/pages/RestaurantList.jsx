import { useEffect, useState } from "react";
import axios from "axios";

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://127.0.0.1:8000/restaurants"
      );

      setRestaurants(
        Array.isArray(response.data) ? response.data : []
      );

      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load restaurants");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        Loading Restaurants...
      </h2>
    );
  }

  if (error) {
    return (
      <h2
        style={{
          color: "red",
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        {error}
      </h2>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background:
          "linear-gradient(rgba(0,0,0,.20),rgba(0,0,0,.25)),url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div
        style={{
          background: "rgba(18,18,24,.75)",
          borderRadius: "25px",
          padding: "35px",
          border: "1px solid rgba(255,255,255,.08)",
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "42px",
            marginBottom: "10px",
          }}
        >
          🍽️ Restaurants
        </h1>

        <p
          style={{
            color: "#CFCFD5",
            marginBottom: "35px",
          }}
        >
          Discover the best restaurants near you.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(320px,1fr))",
            gap: "30px",
          }}
        >
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.restaurant_id}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-8px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "translateY(0)";
              }}
              style={{
                background: "rgba(20,20,28,.92)",
                borderRadius: "20px",
                overflow: "hidden",
                border:
                  "1px solid rgba(255,255,255,.08)",
                transition: ".3s",
                cursor: "pointer",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=80"
                alt="Restaurant"
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
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
                    marginBottom: "10px",
                  }}
                >
                  {restaurant.restaurant_name}
                </h2>

                <p style={{ color: "#BDBDBD" }}>
                  👨 Owner: {restaurant.owner_name}
                </p>

                <p style={{ color: "#BDBDBD" }}>
                  📍 {restaurant.city}, {restaurant.state}
                </p>

                <p style={{ color: "#BDBDBD" }}>
                  ⭐ 4.8 • 25-30 mins
                </p>

                <p
                  style={{
                    color: "#BDBDBD",
                    marginTop: "15px",
                    minHeight: "50px",
                  }}
                >
                  {restaurant.description ||
                    "Enjoy delicious food with premium service."}
                </p>

                <button
                  style={{
                    width: "100%",
                    marginTop: "20px",
                    padding: "14px",
                    border: "none",
                    borderRadius: "12px",
                    background:
                      "linear-gradient(90deg,#7C3AED,#F97316)",
                    color: "white",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                >
                  View Restaurant
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RestaurantList;