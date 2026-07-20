import api from "./api";

// =====================================================
// Get All Restaurants
// =====================================================
export const getRestaurants = async () => {
  const response = await api.get("/restaurants");
  return response.data;
};

// =====================================================
// Get Restaurant By ID
// =====================================================
export const getRestaurant = async (restaurantId) => {
  const response = await api.get(
    `/restaurants/${restaurantId}`
  );

  return response.data;
};

// =====================================================
// Create Restaurant
// =====================================================
export const createRestaurant = async (
  restaurantData
) => {
  const response = await api.post(
    "/restaurants",
    restaurantData
  );

  return response.data;
};

// =====================================================
// Update Restaurant
// =====================================================
export const updateRestaurant = async (
  restaurantId,
  restaurantData
) => {
  const response = await api.put(
    `/restaurants/${restaurantId}`,
    restaurantData
  );

  return response.data;
};

// =====================================================
// Delete Restaurant
// =====================================================
export const deleteRestaurant = async (
  restaurantId
) => {
  const response = await api.delete(
    `/restaurants/${restaurantId}`
  );

  return response.data;
};

// =====================================================
// Search Restaurants
// =====================================================
export const searchRestaurants = async (
  keyword
) => {
  const response = await api.get(
    `/restaurants?search=${keyword}`
  );

  return response.data;
};

// =====================================================
// Restaurant Statistics
// =====================================================
export const getRestaurantStats = async () => {
  const response = await api.get(
    "/restaurants/stats"
  );

  return response.data;
};