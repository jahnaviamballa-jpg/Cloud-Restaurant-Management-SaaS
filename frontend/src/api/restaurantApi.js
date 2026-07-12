import api from "./api";

// Get all restaurants
export const getRestaurants = async () => {
  const response = await api.get("/restaurants/");
  return response.data;
};

// Get restaurant by ID
export const getRestaurantById = async (id) => {
  const response = await api.get(`/restaurants/${id}`);
  return response.data;
};