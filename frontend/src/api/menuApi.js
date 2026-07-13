import api from "./api";

// Get menu for a restaurant
export const getMenuByRestaurant = async (restaurantId) => {
  const response = await api.get(`/restaurants/${restaurantId}/menu`);
  return response.data;
};

// Get a single menu item
export const getMenuItem = async (menuId) => {
  const response = await api.get(`/menu/${menuId}`);
  return response.data;
};