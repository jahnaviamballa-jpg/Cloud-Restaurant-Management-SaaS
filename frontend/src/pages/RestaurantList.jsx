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

      console.log("Restaurants API Response:", response.data);

      setRestaurants(
        Array.isArray(response.data) ? response.data : []
      );

      setError("");
    } catch (err) {
      console.error("Restaurant API Error:", err);
      setError("Failed to load restaurants");
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading restaurants...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>Restaurants</h1>

      {restaurants.length === 0 ? (
        <p>No restaurants available</p>
      ) : (
        restaurants.map((restaurant) => (
          <div key={restaurant.restaurant_id}>
            <h2>{restaurant.restaurant_name}</h2>

            <p>
              <strong>Owner:</strong> {restaurant.owner_name}
            </p>

            <p>
              <strong>Email:</strong> {restaurant.email}
            </p>

            <p>
              <strong>Phone:</strong> {restaurant.phone}
            </p>

            <p>
              <strong>Address:</strong> {restaurant.address}
            </p>

            <p>
              <strong>City:</strong> {restaurant.city}
            </p>

            <p>
              <strong>State:</strong> {restaurant.state}
            </p>

            <p>
              <strong>Pincode:</strong> {restaurant.pincode}
            </p>

            <p>{restaurant.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default RestaurantList;