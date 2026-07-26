import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

import {
  getRestaurants,
  deleteRestaurant,
} from "../api/restaurantApi";

function RestaurantList() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const role = user?.role || "";

  const [restaurants, setRestaurants] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadRestaurants();
  }, []);

  const loadRestaurants = async () => {
    try {
      setLoading(true);

      const data =
        await getRestaurants();

      setRestaurants(
        Array.isArray(data) ? data : []
      );

      setError("");
    } catch (err) {
      console.error(err);

      setError(
        "Failed to load restaurants."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRestaurant = (
    restaurant
  ) => {
    localStorage.setItem(
      "restaurant",
      JSON.stringify(restaurant)
    );

    navigate("/menu");
  };

  const handleDelete = async (
    restaurantId
  ) => {
    const confirmDelete =
      window.confirm(
        "Delete this restaurant?"
      );

    if (!confirmDelete) return;

    try {
      await deleteRestaurant(
        restaurantId
      );

      alert(
        "Restaurant deleted successfully."
      );

      loadRestaurants();
    } catch (error) {
      console.error(error);

      alert(
        "Failed to delete restaurant."
      );
    }
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#111827",
        }}
      >
        <h2
          style={{
            color: "white",
          }}
        >
          Loading Restaurants...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#111827",
        }}
      >
        <h2
          style={{
            color: "red",
          }}
        >
          {error}
        </h2>
      </div>
    );
  }

  return (
    <Layout>
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
          background:
            "rgba(18,18,24,.80)",
          borderRadius: "25px",
          padding: "35px",
          border:
            "1px solid rgba(255,255,255,.08)",
          backdropFilter: "blur(12px)",
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "42px",
            marginBottom: "10px",
          }}
        >
          🍽 Restaurants
        </h1>

        <p
          style={{
            color: "#D1D5DB",
            marginBottom: "35px",
          }}
        >
          Select a restaurant to continue.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(320px,1fr))",
            gap: "25px",
          }}
        >
                    {restaurants.map((restaurant) => (
            <div
              key={restaurant.restaurant_id}
              style={{
                background: "rgba(20,20,28,.95)",
                borderRadius: "20px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,.08)",
                transition: "0.3s",
                boxShadow:
                  "0 10px 25px rgba(0,0,0,.25)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-8px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "translateY(0)";
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
                    marginBottom: "12px",
                  }}
                >
                  {restaurant.restaurant_name}
                </h2>

                <p style={{ color: "#CFCFD5" }}>
                  👨 Owner : {restaurant.owner_name}
                </p>

                <p style={{ color: "#CFCFD5" }}>
                  📍 {restaurant.city},{" "}
                  {restaurant.state}
                </p>

                <p style={{ color: "#CFCFD5" }}>
                  📞 {restaurant.phone}
                </p>

                <p style={{ color: "#CFCFD5" }}>
                  📧 {restaurant.email}
                </p>

                <p
                  style={{
                    color: "#CFCFD5",
                    marginTop: "15px",
                    minHeight: "60px",
                  }}
                >
                  {restaurant.description ||
                    "Enjoy delicious food with premium service."}
                </p>

                <button
                  onClick={() =>
                    handleSelectRestaurant(
                      restaurant
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
                    cursor: "pointer",
                    fontSize: "15px",
                  }}
                >
                  🍽 View Restaurant
                </button>
                                {(role === "Owner" || role === "owner") && (
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
                )}
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
                marginBottom: "15px",
              }}
            >
              🍽 No Restaurants Available
            </h2>

            <p
              style={{
                color: "#D1D5DB",
                marginBottom: "25px",
              }}
            >
              There are currently no restaurants
              available.
            </p>
                        {(role === "Owner" ||
              role === "owner") && (
              <button
                onClick={() =>
                  navigate(
                    "/add-restaurant"
                  )
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
            )}
          </div>
        )}
      </div>
    </div>
    </Layout>
  );
}

export default RestaurantList;