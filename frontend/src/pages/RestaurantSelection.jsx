import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getRestaurants } from "../api/restaurantApi";
import { setRestaurant } from "../utils/restaurant";

import "../styles/restaurantSelection.css";
import "../styles/auth.css";

function RestaurantSelection() {
  const navigate = useNavigate();

  // =====================================
  // Logged In User
  // =====================================

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const role = (
    user.role || ""
  ).toLowerCase();

  // =====================================
  // States
  // =====================================

  const [search, setSearch] = useState("");

  const [restaurants, setRestaurants] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // =====================================
  // Load Restaurants
  // =====================================

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
    } catch (error) {
      console.error(
        "Restaurant Load Error:",
        error
      );

      alert(
        "Failed to load restaurants."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // Search Restaurants
  // =====================================

  const filteredRestaurants =
    restaurants.filter((restaurant) =>
      (restaurant.restaurant_name || "")
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  // =====================================
  // Navigate Based On Role
  // =====================================

  const goToDashboard = () => {
    switch (role) {
      case "customer":
        navigate("/dashboard", {
          replace: true,
        });
        break;

      case "manager":
        navigate("/manager-dashboard", {
          replace: true,
        });
        break;

      case "chef":
        navigate("/chef-dashboard", {
          replace: true,
        });
        break;

      case "owner":
        navigate("/owner-dashboard", {
          replace: true,
        });
        break;

      default:
        navigate("/", {
          replace: true,
        });
    }
  };

  // =====================================
  // Save Selected Restaurant
  // =====================================

  const selectRestaurant = (
    restaurant
  ) => {
    const selectedRestaurant = {
      restaurant_id:
        restaurant.restaurant_id,

      restaurant_name:
        restaurant.restaurant_name,

      city: restaurant.city,

      state: restaurant.state,

      latitude:
        restaurant.latitude,

      longitude:
        restaurant.longitude,

      logo_url:
        restaurant.logo_url,
    };

    setRestaurant(
      selectedRestaurant
    );

    localStorage.removeItem("cart");

    console.log(
      "Selected Restaurant:",
      selectedRestaurant
    );

    goToDashboard();
  };

  // =====================================
  // Distance Formula
  // =====================================

  const calculateDistance = (
    lat1,
    lon1,
    lat2,
    lon2
  ) => {
    const R = 6371;

    const dLat =
      ((lat2 - lat1) * Math.PI) /
      180;

    const dLon =
      ((lon2 - lon1) * Math.PI) /
      180;

    const a =
      Math.sin(dLat / 2) *
        Math.sin(dLat / 2) +
      Math.cos(
        (lat1 * Math.PI) / 180
      ) *
        Math.cos(
          (lat2 * Math.PI) / 180
        ) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c =
      2 *
      Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
      );

    return R * c;
  };
    // =====================================
  // Find Nearest Restaurant
  // =====================================

  const findNearestRestaurant = (
    userLat,
    userLon
  ) => {
    let nearest = null;

    let shortestDistance =
      Number.MAX_VALUE;

    restaurants.forEach(
      (restaurant) => {
        if (
          restaurant.latitude &&
          restaurant.longitude
        ) {
          const distance =
            calculateDistance(
              userLat,
              userLon,
              restaurant.latitude,
              restaurant.longitude
            );

          if (
            distance <
            shortestDistance
          ) {
            shortestDistance =
              distance;

            nearest = restaurant;
          }
        }
      }
    );

    return nearest;
  };

  // =====================================
  // Detect Current Location
  // =====================================

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert(
        "Geolocation is not supported."
      );

      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nearest =
          findNearestRestaurant(
            position.coords.latitude,
            position.coords.longitude
          );

        if (!nearest) {
          alert(
            "No nearby restaurant found."
          );

          return;
        }

        const selectedRestaurant = {
          restaurant_id:
            nearest.restaurant_id,

          restaurant_name:
            nearest.restaurant_name,

          city: nearest.city,

          state: nearest.state,

          latitude:
            nearest.latitude,

          longitude:
            nearest.longitude,

          logo_url:
            nearest.logo_url,
        };

        setRestaurant(
          selectedRestaurant
        );

        localStorage.removeItem("cart");

        alert(
          `Nearest Restaurant: ${nearest.restaurant_name}`
        );

        goToDashboard();
      },
      () => {
        alert(
          "Unable to detect your location."
        );
      }
    );
  };

  // =====================================
  // UI
  // =====================================

  return (
    <div className="auth-page">
      <div
        style={{
          width: "95%",
          maxWidth: "1500px",
          display: "grid",
          gridTemplateColumns:
            "1fr 1.4fr",
          gap: "50px",
          alignItems: "center",
        }}
      >
        {/* LEFT PANEL */}

        <div
          style={{
            color: "white",
          }}
        >
          <div className="logo">
            🍽
          </div>

          <h1
            style={{
              fontSize: "58px",
              fontWeight: "700",
              lineHeight: "70px",
              marginBottom: "20px",
            }}
          >
            Choose Your
            <br />
            Restaurant
          </h1>

          <p
            style={{
              color: "#D1D5DB",
              fontSize: "18px",
              lineHeight: "32px",
              maxWidth: "500px",
            }}
          >
            Select your preferred
            restaurant to continue.
            Browse menus, place
            orders, reserve tables
            and enjoy a seamless
            cloud restaurant
            experience.
          </p>

          <button
            className="auth-btn"
            onClick={detectLocation}
            style={{
              marginTop: "35px",
              width: "300px",
            }}
          >
            📍 Detect Nearby Restaurant
          </button>
        </div>

        {/* RIGHT PANEL */}

        <div
          className="auth-card"
          style={{
            width: "100%",
            maxHeight: "760px",
          }}
        >
          <h2 className="auth-title">
            Select Restaurant
          </h2>

          <p className="auth-subtitle">
            Search and choose your
            restaurant
          </p>

          <div className="input-box">
            <input
              type="text"
              placeholder="Search Restaurant..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />
          </div>

          {loading ? (
            <h3
              style={{
                color: "white",
                textAlign: "center",
                marginTop: "80px",
              }}
            >
              Loading Restaurants...
            </h3>
          ) : (
            <div
              style={{
                maxHeight: "560px",
                overflowY: "auto",
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(280px,1fr))",
                gap: "22px",
                paddingRight: "8px",
              }}
            >
                            {filteredRestaurants.map(
                (restaurant) => {
                  const selected =
                    JSON.parse(
                      localStorage.getItem(
                        "restaurant"
                      )
                    )?.restaurant_id ===
                    restaurant.restaurant_id;

                  return (
                    <div
                      key={
                        restaurant.restaurant_id
                      }
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform =
                          "translateY(-8px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform =
                          "translateY(0)";
                      }}
                      style={{
                        background:
                          "rgba(32,32,42,.95)",
                        borderRadius: "18px",
                        padding: "18px",
                        border: selected
                          ? "2px solid #22C55E"
                          : "1px solid rgba(255,255,255,.08)",
                        transition: ".3s",
                        cursor: "pointer",
                      }}
                    >
                      {selected && (
                        <div
                          style={{
                            display:
                              "inline-block",
                            background:
                              "#16A34A",
                            color: "white",
                            padding:
                              "6px 12px",
                            borderRadius:
                              "20px",
                            fontSize: "13px",
                            fontWeight:
                              "600",
                            marginBottom:
                              "12px",
                          }}
                        >
                          ✓ Selected
                        </div>
                      )}

                      <img
                        src={
                          restaurant.logo_url ||
                          "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=80"
                        }
                        alt={
                          restaurant.restaurant_name
                        }
                        style={{
                          width: "100%",
                          height: "180px",
                          objectFit: "cover",
                          borderRadius:
                            "12px",
                          marginBottom:
                            "15px",
                        }}
                      />

                      <h3
                        style={{
                          color: "white",
                          marginBottom:
                            "10px",
                        }}
                      >
                        🍽{" "}
                        {
                          restaurant.restaurant_name
                        }
                      </h3>

                      <p
                        style={{
                          color: "#CFCFD5",
                          marginBottom:
                            "8px",
                        }}
                      >
                        📍 {restaurant.city},{" "}
                        {restaurant.state}
                      </p>

                      {restaurant.description && (
                        <p
                          style={{
                            color: "#AFAFAF",
                            fontSize: "14px",
                            minHeight:
                              "45px",
                            marginBottom:
                              "15px",
                          }}
                        >
                          {
                            restaurant.description
                          }
                        </p>
                      )}

                      <button
                        className="auth-btn"
                        onClick={() =>
                          selectRestaurant(
                            restaurant
                          )
                        }
                      >
                        🍽 Select Restaurant
                      </button>
                    </div>
                  );
                }
              )}

              {!loading &&
                filteredRestaurants.length ===
                  0 && (
                  <div
                    style={{
                      gridColumn:
                        "1 / -1",
                      textAlign:
                        "center",
                      color: "white",
                      padding: "50px",
                    }}
                  >
                    <h2>
                      No Restaurants Found
                    </h2>

                    <p
                      style={{
                        color: "#BDBDBD",
                        marginTop:
                          "10px",
                      }}
                    >
                      Try another search.
                    </p>
                  </div>
                )}
            </div>
          )}
        </div>
      </div>
          </div>
  );
}

export default RestaurantSelection;