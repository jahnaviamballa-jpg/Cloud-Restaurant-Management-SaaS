import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRestaurants } from "../api/restaurantApi";
import "../styles/restaurantSelection.css";
import "../styles/auth.css";

function RestaurantSelection() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRestaurants();
  }, []);

  const loadRestaurants = async () => {
    try {
      const data = await getRestaurants();
      setRestaurants(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.restaurant_name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // =====================================
  // Save Selected Restaurant
  // =====================================
  const selectRestaurant = (restaurant) => {
    const selectedRestaurant = {
      restaurant_id: restaurant.restaurant_id,
      restaurant_name: restaurant.restaurant_name,
      city: restaurant.city,
      state: restaurant.state,
      latitude: restaurant.latitude,
      longitude: restaurant.longitude,
      logo_url: restaurant.logo_url,
    };

    localStorage.setItem(
      "restaurant",
      JSON.stringify(selectedRestaurant)
    );

    console.log(
      "Restaurant Saved:",
      selectedRestaurant
    );

    navigate("/dashboard");
  };

  // =====================================
  // Distance Calculation
  // =====================================
  const calculateDistance = (
    lat1,
    lon1,
    lat2,
    lon2
  ) => {
    const R = 6371;

    const dLat =
      ((lat2 - lat1) * Math.PI) / 180;

    const dLon =
      ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) *
        Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
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
    let shortestDistance = Infinity;

    restaurants.forEach((restaurant) => {
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

        if (distance < shortestDistance) {
          shortestDistance = distance;
          nearest = restaurant;
        }
      }
    });

    return nearest;
  };

  // =====================================
  // Detect Location
  // =====================================
  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nearest =
          findNearestRestaurant(
            position.coords.latitude,
            position.coords.longitude
          );

        if (nearest) {
          const selectedRestaurant = {
            restaurant_id:
              nearest.restaurant_id,
            restaurant_name:
              nearest.restaurant_name,
            city: nearest.city,
            state: nearest.state,
            latitude: nearest.latitude,
            longitude: nearest.longitude,
            logo_url: nearest.logo_url,
          };

          localStorage.setItem(
            "restaurant",
            JSON.stringify(selectedRestaurant)
          );

          alert(
            `Nearest Restaurant: ${nearest.restaurant_name}`
          );

          navigate("/dashboard");
        } else {
          alert(
            "No nearby restaurant found."
          );
        }
      },
      () => {
        alert("Unable to fetch location.");
      }
    );
  };

  return (
    <div className="auth-page">
      <div
        style={{
          width: "1200px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "50px",
          alignItems: "center",
        }}
      >
        {/* Left */}
        <div style={{ color: "white" }}>
          <div className="logo">🍽</div>

          <h1
            style={{
              fontSize: "56px",
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
              color: "#ddd",
              fontSize: "18px",
              lineHeight: "32px",
              maxWidth: "500px",
            }}
          >
            Select your preferred restaurant to continue.
            Discover menus, place orders,
            reserve tables and enjoy a seamless
            cloud restaurant experience.
          </p>

          <button
            className="auth-btn"
            onClick={detectLocation}
            style={{
              marginTop: "35px",
              width: "280px",
            }}
          >
            📍 Detect Nearby Restaurant
          </button>
        </div>

        {/* Right */}
        <div
          className="auth-card"
          style={{
            width: "100%",
            maxHeight: "700px",
          }}
        >
          <h2 className="auth-title">
            Select Restaurant
          </h2>

          <p className="auth-subtitle">
            Search and choose your restaurant
          </p>

          <div className="input-box">
            <input
              type="text"
              placeholder="Search Restaurant..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          {loading ? (
            <h3
              style={{
                color: "white",
                textAlign: "center",
                marginTop: "50px",
              }}
            >
              Loading Restaurants...
            </h3>
          ) : (
            <div
              style={{
                maxHeight: "450px",
                overflowY: "auto",
                paddingRight: "8px",
              }}
            >
              {filteredRestaurants.map(
                (restaurant) => (
                  <div
                    key={
                      restaurant.restaurant_id
                    }
                    style={{
                      background: "#20202A",
                      padding: "18px",
                      borderRadius: "14px",
                      marginBottom: "18px",
                      border:
                        "1px solid rgba(255,255,255,.08)",
                    }}
                  >
                    <img
                      src={
                        restaurant.logo_url ||
                        "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80"
                      }
                      alt={
                        restaurant.restaurant_name
                      }
                      style={{
                        width: "100%",
                        height: "170px",
                        objectFit: "cover",
                        borderRadius: "12px",
                        marginBottom: "15px",
                      }}
                    />

                    <h3
                      style={{
                        color: "white",
                        marginBottom: "8px",
                      }}
                    >
                      🍽{" "}
                      {
                        restaurant.restaurant_name
                      }
                    </h3>

                    <p
                      style={{
                        color: "#bbb",
                        marginBottom: "15px",
                      }}
                    >
                      📍 {restaurant.city},{" "}
                      {restaurant.state}
                    </p>

                    <button
                      className="auth-btn"
                      onClick={() =>
                        selectRestaurant(
                          restaurant
                        )
                      }
                    >
                      Select Restaurant
                    </button>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RestaurantSelection;