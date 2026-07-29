// =========================================
// Restaurant Utility Functions
// =========================================

// Save Selected Restaurant
export const setRestaurant = (restaurant) => {
  localStorage.setItem(
    "restaurant",
    JSON.stringify(restaurant)
  );
};

// Get Selected Restaurant Object
export const getRestaurant = () => {
  const restaurant = localStorage.getItem("restaurant");

  if (restaurant) {
    return JSON.parse(restaurant);
  }

  // Fallback for Manager / Owner / Chef
  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  if (!user) return null;

  return {
    restaurant_id: user.restaurant_id,
    restaurant_name: user.restaurant_name,
  };
};

// Get Restaurant ID
export const getRestaurantId = () => {
  const restaurant = getRestaurant();

  return restaurant?.restaurant_id ?? null;
};

// Get Restaurant Name
export const getRestaurantName = () => {
  const restaurant = getRestaurant();

  return restaurant?.restaurant_name ?? "";
};

// Clear Restaurant
export const clearRestaurant = () => {
  localStorage.removeItem("restaurant");
};