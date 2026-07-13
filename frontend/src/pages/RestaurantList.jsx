import { useEffect, useState } from "react";
import { getRestaurants } from "../api/restaurantApi";
import RestaurantCard from "../components/RestaurantCard";

function RestaurantList() {
  console.log("RestaurantList Loaded");
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await getRestaurants();
        setRestaurants(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load restaurants. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) {
    return <h2>Loading Restaurants...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Restaurants</h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.restaurant_id}
            restaurant={restaurant}
          />
        ))}
      </div>
    </div>
  );
}

export default RestaurantList;