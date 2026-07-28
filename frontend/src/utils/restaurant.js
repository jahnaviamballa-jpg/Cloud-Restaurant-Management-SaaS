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

  if (!restaurant) return null;

  return JSON.parse(restaurant);
};

// Get Restaurant ID
export const getRestaurantId = () => {
  const restaurant = getRestaurant();

  return restaurant?.restaurant_id || null;
};

// Get Restaurant Name
export const getRestaurantName = () => {
  const restaurant = getRestaurant();

  return restaurant?.restaurant_name || "";
};

// Clear Restaurant
export const clearRestaurant = () => {
  localStorage.removeItem("restaurant");
};