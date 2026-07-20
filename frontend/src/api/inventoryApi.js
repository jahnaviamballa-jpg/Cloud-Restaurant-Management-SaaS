import api from "./api";
import { getRestaurantId } from "../utils/restaurant";

// =====================================================
// Get All Inventory Items
// =====================================================
export const getInventory = async () => {
  const restaurantId = getRestaurantId();

  const response = await api.get(
    `/inventory/restaurants/${restaurantId}`
  );

  return response.data;
};

// =====================================================
// Get Single Inventory Item
// =====================================================
export const getInventoryItem = async (id) => {
  const response = await api.get(`/inventory/${id}`);

  return response.data;
};

// =====================================================
// Add Inventory Item
// =====================================================
export const createInventory = async (data) => {
  const restaurantId = getRestaurantId();

  const response = await api.post("/inventory/", {
    ...data,
    restaurant_id: restaurantId,
  });

  return response.data;
};

// =====================================================
// Update Inventory Item
// =====================================================
export const updateInventory = async (id, data) => {
  const response = await api.put(
    `/inventory/${id}`,
    data
  );

  return response.data;
};

// =====================================================
// Delete Inventory Item
// =====================================================
export const deleteInventory = async (id) => {
  const response = await api.delete(
    `/inventory/${id}`
  );

  return response.data;
};

// =====================================================
// Inventory Statistics
// =====================================================
export const getInventoryStats = async () => {
  const restaurantId = getRestaurantId();

  const response = await api.get(
    `/inventory/restaurants/${restaurantId}/stats`
  );

  return response.data;
};

// =====================================================
// Low Stock Items
// =====================================================
export const getLowStockItems = async () => {
  const restaurantId = getRestaurantId();

  const response = await api.get(
    `/inventory/restaurants/${restaurantId}/low-stock`
  );

  return response.data;
};