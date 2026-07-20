import api from "./api";
import { getRestaurantId } from "../utils/restaurant";

// ========================================
// Get Menu By Restaurant
// ========================================
export const getMenuByRestaurant = async () => {
  const restaurantId = getRestaurantId();

  const response = await api.get(
    `/restaurants/${restaurantId}/menu`
  );

  return response.data;
};

// ========================================
// Get All Menu Items (Alias)
// ========================================
export const getMenu = async () => {
  return getMenuByRestaurant();
};

// ========================================
// Get Single Menu Item
// ========================================
export const getMenuItem = async (id) => {
  const response = await api.get(`/menu/${id}`);
  return response.data;
};

// ========================================
// Create Menu Item
// ========================================
export const createMenuItem = async (data) => {
  const restaurantId = getRestaurantId();

  const response = await api.post(
    `/restaurants/${restaurantId}/menu`,
    data
  );

  return response.data;
};

// ========================================
// Update Menu Item
// ========================================
export const updateMenuItem = async (id, data) => {
  const response = await api.put(
    `/menu/${id}`,
    data
  );

  return response.data;
};

// ========================================
// Delete Menu Item
// ========================================
export const deleteMenuItem = async (id) => {
  const response = await api.delete(
    `/menu/${id}`
  );

  return response.data;
};

// ========================================
// Menu Statistics
// ========================================
export const getMenuStats = async () => {
  const restaurantId = getRestaurantId();

  const response = await api.get(
    `/menu/restaurants/${restaurantId}/stats`
  );

  return response.data;
};