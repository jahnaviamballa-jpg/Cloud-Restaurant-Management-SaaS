import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { deleteRestaurant } from "../api/restaurantApi";

function RestaurantList() {
  const navigate = useNavigate();

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
        Array.isArray(response.data)
          ? response.data
          : []
      );

      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load restaurants");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (restaurantId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this restaurant?"
    );

    if (!confirmDelete) return;

    try {
      await deleteRestaurant(restaurantId);

      alert("Restaurant deleted successfully!");

      fetchRestaurants();
    } catch (error) {
      console.error(error);
      alert("Failed to delete restaurant.");
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#111827",
        }}
      >
        <h2 style={{ color: "white" }}>
          Loading Restaurants...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#111827",
        }}
      >
        <h2 style={{ color: "red" }}>
          {error}
        </h2>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background:
          "linear-gradient(rgba(0,0,0,.25),rgba(0,0,0,.35)), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div
        style={{
          background: "rgba(18,18,24,.78)",
          borderRadius: "25px",
          padding: "35px",
          border: "1px solid rgba(255,255,255,.08)",
          backdropFilter: "blur(10px)",
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
          Discover and manage restaurants on your
          cloud platform.
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
                boxShadow:
                  "0 10px 25px rgba(0,0,0,.25)",
              }}
            >
              <img
                src={
                  restaurant.logo_url ||
                  "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=80"
                }
                alt={restaurant.restaurant_name}
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
                  📞 {restaurant.phone}
                </p>

                <p style={{ color: "#BDBDBD" }}>
                  📧 {restaurant.email}
                </p>

                <p style={{ color: "#BDBDBD" }}>
                  ⭐ 4.8 • 25-30 mins
                </p>

                <p
                  style={{
                    color: "#BDBDBD",
                    marginTop: "15px",
                    minHeight: "55px",
                  }}
                >
                  {restaurant.description ||
                    "Enjoy delicious food with premium service."}
                </p>

                <button
                  onClick={() =>
                    navigate(
                      `/menu/${restaurant.restaurant_id}`
                    )
                  }
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
                    fontSize: "15px",
                    cursor: "pointer",
                  }}
                >
                  🍽 View Restaurant
                </button>

                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    marginTop: "15px",
                  }}
                >
                  <button
                    onClick={() =>
                      navigate(
                        `/edit-restaurant/${restaurant.restaurant_id}`
                      )
                    }
                    style={{
                      flex: 1,
                      padding: "12px",
                      border: "none",
                      borderRadius: "10px",
                      background: "#2563EB",
                      color: "white",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        restaurant.restaurant_id
                      )
                    }
                    style={{
                      flex: 1,
                      padding: "12px",
                      border: "none",
                      borderRadius: "10px",
                      background: "#DC2626",
                      color: "white",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
                  </div>

        {restaurants.length === 0 && (
          <div
            style={{
              textAlign: "center",
              marginTop: "50px",
              color: "white",
              padding: "40px",
              background: "rgba(20,20,28,.92)",
              borderRadius: "20px",
              border:
                "1px solid rgba(255,255,255,.08)",
            }}
          >
            <h2
              style={{
                marginBottom: "10px",
              }}
            >
              🍽 No Restaurants Available
            </h2>

            <p
              style={{
                color: "#CFCFD5",
                marginBottom: "25px",
              }}
            >
              Click the button below to add your
              first restaurant.
            </p>

            <button
              onClick={() =>
                navigate("/add-restaurant")
              }
              style={{
                padding: "15px 30px",
                border: "none",
                borderRadius: "12px",
                background:
                  "linear-gradient(90deg,#7C3AED,#F97316)",
                color: "white",
                fontWeight: "700",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              ➕ Add Restaurant
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RestaurantList;