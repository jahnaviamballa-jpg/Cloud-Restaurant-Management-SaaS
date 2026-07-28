import api from "./api";
import { getRestaurantId } from "../utils/restaurant";

// =======================================
// Get Inventory
// =======================================
export const getInventory = async () => {
  const restaurantId = getRestaurantId();

  const response = await api.get(
    `/inventory/restaurants/${restaurantId}`
  );

  return response.data;
};

// =======================================
// Create Inventory
// =======================================
export const createInventory = async (data) => {
  const restaurantId = getRestaurantId();

  const response = await api.post(
    "/inventory/",
    {
      ...data,
      restaurant_id: restaurantId,
    }
  );

  return response.data;
};

// =======================================
// Update Inventory
// =======================================
export const updateInventory = async (
  id,
  data
) => {
  const response = await api.put(
    `/inventory/${id}`,
    data
  );

  return response.data;
};

// =======================================
// Delete Inventory
// =======================================
export const deleteInventory = async (
  id
) => {
  const response = await api.delete(
    `/inventory/${id}`
  );

  return response.data;
};

// =======================================
// Inventory Statistics
// =======================================
export const getInventoryStats =
  async () => {
    const restaurantId =
      getRestaurantId();

    const response = await api.get(
      `/inventory/restaurants/${restaurantId}/stats`
    );

    return response.data;
  };

// =======================================
// Low Stock
// =======================================
export const getLowStock =
  async () => {
    const restaurantId =
      getRestaurantId();

    const response = await api.get(
      `/inventory/restaurants/${restaurantId}/low-stock`
    );

    return response.data;
  };