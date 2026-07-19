import api from "./api";
import { getRestaurantId } from "../utils/restaurant";

// Get menu for selected restaurant
export const getMenuByRestaurant = async () => {
  const restaurantId = getRestaurantId();

  if (!restaurantId) {
    throw new Error("No restaurant selected");
  }

  const response = await api.get(
    `/restaurants/${restaurantId}/menu`
  );

  return response.data;
};

// Get a single menu item
export const getMenuItem = async (menuId) => {
  const response = await api.get(`/menu/${menuId}`);
  return response.data;
};